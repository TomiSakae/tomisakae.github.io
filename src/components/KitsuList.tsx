'use client'

import { useEffect, useState, useRef } from 'react';
import useSWRInfinite from 'swr/infinite';
import Image from 'next/image';
import Link from 'next/link';
import { KitsuResponse } from '../types/types';

const fetcher = (url: string) => fetch(url).then(res => res.json());
const PAGE_SIZE = 20;

interface Props {
  subtype: string;
  year: string;
  season: string;
}

const jikanFetcher = async (animeTitle: string) => {
  let page = 1;
  let found = false;
  let animeDetails = null;

  while (!found) {
    const response = await fetch(`https://api.jikan.moe/v4/anime?q=${encodeURIComponent(animeTitle)}&limit=1&page=${page}`);
    if (!response.ok) {
      throw new Error('Failed to fetch data from Jikan API');
    }
    const data = await response.json();
    if (data) {
      animeDetails = data.data[0];
      found = true;
    } else {
      page++;
    }
  }

  return animeDetails;
};

const KitsuList: React.FC<Props> = ({ subtype, year, season }) => {
  const [animeStatus, setAnimeStatus] = useState<{ [key: string]: string | null }>({});
  const [animeList, setAnimeList] = useState<KitsuResponse['data']>([]);
  const [seenAnimeKeys, setSeenAnimeKeys] = useState<Set<string>>(new Set());
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const requestQueue = useRef<{ title: string, id: string }[]>([]);

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
    // Reset animeList, seenAnimeKeys, animeStatus, and requestQueue when subtype, year, or season changes
    setAnimeList([]);
    setSeenAnimeKeys(new Set());
    setAnimeStatus({});
    requestQueue.current = [];
    setIsLoadingMore(false);
    setSize(1);
  }, [subtype, year, season, setSize]);

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
  }, [data, setSize, seenAnimeKeys, isValidating, animeList]);

  useEffect(() => {
    animeList.forEach(anime => {
      requestQueue.current.push({ title: anime.attributes.titles.en_jp || anime.attributes.titles.en, id: anime.id });
    });
  }, [animeList]);

  useEffect(() => {
    const intervalId = setInterval(async () => {
      if (requestQueue.current.length > 0) {
        const { title, id } = requestQueue.current.shift()!;
        try {
          const animeDetails = await jikanFetcher(title);
          setAnimeStatus(prevStatus => ({ ...prevStatus, [id]: animeDetails.status }));
        } catch (error) {
          console.error('Failed to fetch anime status:', error);
          setAnimeStatus(prevStatus => ({ ...prevStatus, [id]: null }));
        }
      }
    }, 1);

    return () => clearInterval(intervalId);
  }, []);

  if (error) return <div>Không thể tải dữ liệu</div>;
  if (!data) return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
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
        <div key={anime.id} className="px-4 py-3 hover:text-red-600 text-white">
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
              {animeStatus[anime.id] ? (
                <h6 className={`text-[10px] inline text-white rounded-lg px-2 mt-2 font-semibold py-1 ${animeStatus[anime.id] === "Currently Airing" ? "bg-green-500" : animeStatus[anime.id] === "Finished Airing" ? "bg-blue-500" : "bg-gray-400"}`}>
                  {animeStatus[anime.id] === "Currently Airing" ? "Đang Chiếu" : animeStatus[anime.id] === "Finished Airing" ? "Đã Hoàn Thành" : "Sắp Chiếu"}
                </h6>
              ) : (
                <h6 className="animate-pulse inline rounded-lg px-10 mt-2 py-[11px] bg-gray-400">

                </h6>
              )}
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
