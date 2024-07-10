'use client'

import Link from 'next/link';
import { useEffect, useState } from 'react';
import useSWRInfinite from 'swr/infinite';
import Image from 'next/image';
import { KitsuResponse } from '../types/types';

const fetcher = (url: string) => fetch(url).then(res => res.json());
const PAGE_SIZE = 20;

const AnimeList = () => {
  const [animeList, setAnimeList] = useState<KitsuResponse['data']>([]);
  const [seenAnimeKeys, setSeenAnimeKeys] = useState<Set<string>>(new Set());
  const [isLoadingMore, setIsLoadingMore] = useState(false); // State để kiểm soát hiển thị loading

  const getKey = (pageIndex: number, previousPageData: KitsuResponse | null) => {
    if (previousPageData && !previousPageData.data.length) return null;
    return `https://kitsu.io/api/edge/anime?filter[season]=winter&filter[seasonYear]=2024&page[limit]=${PAGE_SIZE}&page[offset]=${pageIndex * PAGE_SIZE}`;
  };

  const { data, error, size, setSize, isValidating } = useSWRInfinite<KitsuResponse>(getKey, fetcher, {
    revalidateOnFocus: false,
    shouldRetryOnError: false,
  });

  useEffect(() => {
    if (data) {
      let newAnimeList: KitsuResponse['data'][0][] = [];
      data.forEach(page => {
        newAnimeList = [...newAnimeList, ...page.data];
      });

      const filteredAnimeList = newAnimeList.filter(anime => {
        if (anime.attributes.subtype === 'TV' && !seenAnimeKeys.has(anime.id)) {
          seenAnimeKeys.add(anime.id);
          return true;
        }
        return false;
      });

      setAnimeList(prevList => [...prevList, ...filteredAnimeList]);

     // Nếu trang hiện tại có số lượng anime nhỏ hơn PAGE_SIZE và không đang trong quá trình xác thực mới, có thể đã hết dữ liệu
     if (data[data.length - 1].data.length < PAGE_SIZE && !isValidating) {
      setIsLoadingMore(false); // Ngừng hiển thị loading khi hết dữ liệu
    } else {
      setIsLoadingMore(true); // Hiển thị loading ở cuối danh sách khi đang load thêm
      setSize(size => size + 1); // Tăng kích thước để fetch trang kế tiếp
    }
  }
}, [data, setSize, seenAnimeKeys, isValidating]);

  if (error) return <div>Không thể tải dữ liệu</div>;
  if (!data) return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
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
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
      {animeList.map(anime => (
        <div key={anime.id} className="px-4 py-3 hover:text-green-500 text-gray-500">
          <Link href="/anime">
            <div className="relative w-full h-0 pb-[142.85%] rounded-xl overflow-hidden">
              <Image 
                src={anime.attributes.posterImage.large} 
                alt={anime.attributes.titles.en || anime.attributes.titles.en_jp} 
                layout="fill"
                className="rounded-xl"
                loading="lazy"
              />
            </div>
            <h3 className="text-xs font-semibold mt-2 overflow-hidden truncate">{anime.attributes.titles.en || anime.attributes.titles.en_jp}</h3>
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

export default AnimeList;
