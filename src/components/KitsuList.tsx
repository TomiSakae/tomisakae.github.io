'use client'
import useSWR from 'swr';
import Image from 'next/image';
import { KitsuResponse } from '../types/types';

const fetcher = (url: string) => fetch(url).then(res => res.json());

const AnimeList = () => {
  const { data, error } = useSWR<KitsuResponse>('https://kitsu.io/api/edge/anime?filter[season]=winter&filter[seasonYear]=2024', fetcher);

  if (error) return <div>Failed to load</div>;
  if (!data) return <div>Loading...</div>;

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
      {data.data.map(anime => (
        <div key={anime.id} className="border p-4">
          <Image 
            src={anime.attributes.posterImage.large} 
            alt={anime.attributes.titles.en || anime.attributes.titles.en_jp} 
            width={200} 
            height={300} 
            layout="responsive"
          />
          <h3 className="text-lg font-semibold mt-2">{anime.attributes.titles.en || anime.attributes.titles.en_jp}</h3>
        </div>
      ))}
    </div>
  );
};

export default AnimeList;
