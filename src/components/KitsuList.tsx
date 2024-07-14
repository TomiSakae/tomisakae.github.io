'use client'

import { useEffect, useState } from 'react';
import useSWRInfinite from 'swr/infinite';
import Image from 'next/image';
import Link from 'next/link';
import { KitsuResponse } from '../types/types';
import 'animate.css';

const fetcher = (url: string) => fetch(url).then(res => res.json());
const PAGE_SIZE = 20;

interface Props {
  subtype: string;
  year: string;
  season: string;
}

const KitsuList: React.FC<Props> = ({ subtype, year, season }) => {
  const [animeList, setAnimeList] = useState<KitsuResponse['data']>([]);
  const [seenAnimeKeys, setSeenAnimeKeys] = useState<Set<string>>(new Set());
  const [isLoadingMore, setIsLoadingMore] = useState(false); // State để kiểm soát hiển thị loading

  const getKey = (pageIndex: number, previousPageData: KitsuResponse | null) => {
    if (previousPageData && !previousPageData.data.length) return null;
    return `https://kitsu.io/api/edge/anime?filter[season]=${season}&filter[seasonYear]=${year}&filter[subtype]=${subtype}&page[limit]=${PAGE_SIZE}&page[offset]=${pageIndex * PAGE_SIZE}`;
  };

  const { data, error, size, setSize, isValidating } = useSWRInfinite<KitsuResponse>(getKey, fetcher, {
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
    shouldRetryOnError: false,
  });

  useEffect(() => {
    // Reset animeList when subtype changes
    setAnimeList([]);
    setSeenAnimeKeys(new Set());
    setIsLoadingMore(false);
    setSize(1); // Trigger re-fetching with the new subtype
  }, [subtype, setSize]);

  useEffect(() => {
    if (data) {
      let newAnimeList: KitsuResponse['data'][0][] = [];
      data.forEach(page => {
        newAnimeList = [...newAnimeList, ...page.data];
      });

      const filteredAnimeList = newAnimeList.filter(anime => {
        if (!seenAnimeKeys.has(anime.id)) {
          seenAnimeKeys.add(anime.id);
          return true;
        }
        return false;
      });

      const newData = filteredAnimeList.filter(anime => !animeList.some(a => a.id === anime.id));

      if (newData.length > 0) {
        setAnimeList(prevList => [...prevList, ...newData]);
      }

      if (data[data.length - 1].data.length < PAGE_SIZE && !isValidating) {
        setIsLoadingMore(false);
      } else {
        setIsLoadingMore(true);
        setSize(size => size + 1);
      }
    }
  }, [data, setSize, seenAnimeKeys, isValidating, animeList]); // Thêm animeList vào dependency array của useEffect

  if (error) return <div>Không thể tải dữ liệu</div>;
  if (!data) return (
    <div className="grid bg-black grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
      {/* Placeholder items with pulse animation */}
      {[...Array(PAGE_SIZE)].map((_, index) => (
        <div key={index} className="animate-pulse overflow-hidden px-4 py-3">
          <div className="relative w-full h-0 pb-[142.85%] rounded-xl bg-gray-300"></div>
          <div className="mt-2 h-4 bg-gray-300 rounded"></div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="grid bg-black grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
      {animeList.map(anime => (
        <div key={anime.id} className="px-4 py-3 hover:text-red-600 text-white animate__animated animate__zoomInLow">
          <Link href={`/anime/?id=${anime.id}`}>
            <div className="relative w-full h-0 pb-[142.85%] rounded-xl overflow-hidden">
              <Image
                src={anime.attributes.posterImage.large}
                alt={anime.attributes.titles.en_jp || anime.attributes.titles.en}
                width={550}
                height={780}
                priority={true}
                className="rounded-xl"
                placeholder="empty"
              />
            </div>
            <h3 className="text-xs font-semibold mt-2 overflow-hidden truncate">{anime.attributes.titles.en_jp || anime.attributes.titles.en}</h3>
            <div className="flex justify-center items-center">
              <h6 className={`text-[10px] inline text-white rounded-lg px-2 mt-2 font-semibold py-1 ${anime.attributes.status === "current" ? "bg-green-500" : anime.attributes.status === "finished" ? "bg-blue-500" : anime.attributes.status === "upcoming" ? "bg-gray-400" : anime.attributes.status === "tba" ? "bg-red-500" : "bg-yellow-400"}`}> {`${anime.attributes.status === "current" ? "Đang Phát Sóng" : anime.attributes.status === "finished" ? "Đã Kết Thúc" : anime.attributes.status === "upcoming" ? "Chuẩn Bị Chiếu" : anime.attributes.status === "tba" ? "Chưa Rõ" : "Sắp Ra Mắt"}`}</h6>
            </div>
          </Link>
        </div>
      ))}
      {isLoadingMore && (
        <div className="animate-pulse overflow-hidden px-4 py-3">
          <div className="relative w-full h-0 pb-[142.85%] rounded-xl bg-gray-300"></div>
          <div className="mt-2 h-4 bg-gray-300 rounded"></div>
        </div>
      )}
    </div>
  );
};

export default KitsuList;