'use client'
import { useEffect, Suspense  } from 'react';
import useSWR from 'swr';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import { MdKeyboardReturn } from "react-icons/md";

const AnimePage = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const animeId = searchParams.get('id') || '';

    // Function để fetch dữ liệu từ API
    const fetcher = async (url: string) => {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Failed to fetch data');
        }
        return await response.json();
    };

    // Sử dụng SWR để fetch dữ liệu và tự động cache
    const { data: animeData, error, mutate, isValidating } = useSWR(animeId ? `https://kitsu.io/api/edge/anime/${animeId}` : null, fetcher);

    useEffect(() => {
        // Trigger re-fetching data when animeId changes
        mutate();
    }, [animeId, mutate]);

    if (error) return <div>Đã xảy ra lỗi khi tải dữ liệu anime</div>;

    return (
        <div className="container mx-auto bg-black py-16">
            <nav className="bg-black fixed w-full top-0 z-10">
                <div className="bg-zinc-800 text-sm font-bold py-2 mb-3 container mx-auto flex items-center justify-center relative">
                    <div
                        className="absolute left-0 flex items-center ml-4 cursor-pointer"
                        onClick={() => router.back()} // Thêm onClick để quay lại trang trước
                    >
                        <MdKeyboardReturn className="ml-1 text-xl text-white"/>
                    </div>
                    <h1 className={"text-white text-lg"}>TomiSakae</h1>
                </div>
            </nav>
            {/* Nội dung của trang anime */}
            {isValidating ? (
                // Placeholder animation
                <div className="grid grid-cols-4">
                    <div className="animate-pulse overflow-hidden px-4 py-3 col-start-2 col-span-2">
                        <div className="relative mx-auto h-0 pb-[142.85%] rounded-lg bg-gray-300"></div>
                        <div className="mt-2 h-4 bg-gray-300 rounded"></div>
                    </div>
                </div>
            ) : animeData ? (
                <div>
                    <div className="grid grid-cols-4">
                        <div className="px-4 py-3 col-start-2 col-span-2">
                            <div className="relative mx-auto h-0 pb-[142.85%] rounded-lg overflow-hidden">
                                <Image 
                                    src={animeData.data.attributes.posterImage.large} 
                                    alt={animeData.data.attributes.titles.en_jp || animeData.data.attributes.titles.en} 
                                    width={550}
                                    height={780}
                                    priority={true}
                                    className="rounded-lg"
                                    placeholder="empty"
                                />
                            </div>
                        </div>
                    </div>
                    <h3 className="text-white text-center text-lg font-semibold mt-2 mx-4">
                        {animeData.data.attributes.titles.en_jp || animeData.data.attributes.titles.en}
                    </h3>
                </div>
            ) : (
                <div>Đang tải dữ liệu...</div>
            )}
        </div>
    );
}

const Anime = ()=>{
    <Suspense>
      <AnimePage />
    </Suspense>
}

export default Anime;
