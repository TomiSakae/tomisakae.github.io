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
        <div className="container mx-auto bg-black py-16 h-screen">
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
                    <div className="flex justify-center items-center mt-4">
                        <button
                            className="bg-green-500 hover:bg-green-600 font-bold text-white py-2 px-4 rounded-md"
                            onClick={()=>{
                                const animeTitle = animeData.data.attributes.titles.en_jp || animeData.data.attributes.titles.en;
                                const formattedAnimeTitle = encodeURIComponent(`${animeTitle} official trailer`); // Định dạng tên anime và chuỗi "trailer" cho URL
                                const youtubeUrl = `https://www.youtube.com/results?search_query=${formattedAnimeTitle}`;
                                window.open(youtubeUrl, '_blank');
                            }}
                        >
                            Trailer
                        </button>
                        <button
                            className="bg-red-500 hover:bg-red-600 font-bold text-white py-2 px-4 mx-4 rounded-md"
                            onClick={()=>{
                                const animeTitle = animeData.data.attributes.titles.en_jp || animeData.data.attributes.titles.en;
                                const formattedAnimeTitle = encodeURIComponent(`${animeTitle} vietsub`); // Định dạng tên anime và chuỗi "trailer" cho URL
                                const youtubeUrl = `https://www.youtube.com/results?search_query=${formattedAnimeTitle}`;
                                window.open(youtubeUrl, '_blank');
                            }}
                        >
                            VietSub
                        </button>
                        <button
                            className="bg-blue-500 hover:bg-blue-600 font-bold text-white py-2 pl-4 rounded-l-md"
                            onClick={()=>{
                                const animeTitle = animeData.data.attributes.titles.en_jp || animeData.data.attributes.titles.en;
                                const formattedAnimeTitle = encodeURIComponent(`${animeTitle} OP`); // Định dạng tên anime và chuỗi "trailer" cho URL
                                const youtubeUrl = `https://www.youtube.com/results?search_query=${formattedAnimeTitle}`;
                                window.open(youtubeUrl, '_blank');
                            }}
                        >
                            OP
                        </button>
                        <h1 className="bg-blue-500 font-bold text-white py-2">/</h1>
                        <button
                            className="bg-blue-500 hover:bg-blue-600 font-bold text-white py-2 pr-4 rounded-r-md"
                            onClick={()=>{
                                const animeTitle = animeData.data.attributes.titles.en_jp || animeData.data.attributes.titles.en;
                                const formattedAnimeTitle = encodeURIComponent(`${animeTitle} ED`); // Định dạng tên anime và chuỗi "trailer" cho URL
                                const youtubeUrl = `https://www.youtube.com/results?search_query=${formattedAnimeTitle}`;
                                window.open(youtubeUrl, '_blank');
                            }}
                        >
                            ED
                        </button>
                    </div>
                    <div className="relative my-4 mx-4 mt-10">
                        <hr className="border-gray-600" />
                        <div className="absolute inset-0 flex justify-center items-center">
                            <h1 className="bg-black text-white font-bold text-md px-2">
                                Xem Ngay
                            </h1>
                        </div>
                    </div>
                <div className="flex justify-center items-center mt-10">
                    <div className="border px-1 py-1 rounded-md border-gray-800 shadow-2xl cursor-pointer" onClick={()=>{
                        const animeTitle = animeData.data.attributes.titles.en_jp || animeData.data.attributes.titles.en;
                        const formattedAnimeTitle = animeTitle.replace(/\s+/g, '+'); // Định dạng tên anime cho URL
                        const searchUrl = `https://animevietsub.dev/tim-kiem/${formattedAnimeTitle}/`;
                        window.open(searchUrl, '_blank');
                    }}>
                        <Image 
                            src={"https://animevietsub.dev/favicon.ico"} 
                            alt={"AnimeVietSubIcon"} 
                            width={30}
                            height={30}
                            priority={true}
                            className="rounded-lg"
                            placeholder="empty"
                                            />
                    </div>
                    <div className="border px-1 py-1 mx-4 rounded-md border-gray-800 shadow-2xl cursor-pointer" onClick={()=>{
                        const animeTitle = animeData.data.attributes.titles.en_jp || animeData.data.attributes.titles.en;
                        const formattedAnimeTitle = animeTitle.replace(/\s+/g, '%20'); // Định dạng tên anime cho URL
                        const searchUrl = `https://animet1.net/tim-kiem/${formattedAnimeTitle}.html`;
                        window.open(searchUrl, '_blank');
                    }}>
                        <Image 
                            src={"https://animet1.net/Theme_Anime/img/favicon.ico"} 
                            alt={"AnimetIcon"} 
                            width={30}
                            height={30}
                            priority={true}
                            className="rounded-lg"
                            placeholder="empty"
                                            />
                    </div>
                    <div className="border px-1 py-1 rounded-md border-gray-800 shadow-2xl cursor-pointer" onClick={()=>{
                        const animeTitle = animeData.data.attributes.titles.en_jp || animeData.data.attributes.titles.en;
                        const formattedAnimeTitle = animeTitle.replace(/\s+/g, '%20'); // Định dạng tên anime cho URL
                        const searchUrl = `https://animetvn4.com/tim-kiem/${formattedAnimeTitle}.html`;
                        window.open(searchUrl, '_blank');
                    }}>
                        <Image 
                            src={"https://animetvn4.com/images/favicon.ico"} 
                            alt={"AnimeTVNIcon"} 
                            width={30}
                            height={30}
                            priority={true}
                            className="rounded-lg"
                            placeholder="empty"
                                            />
                    </div>
                </div>
                <div className="relative my-4 mx-4 mt-10">
                        <hr className="border-gray-600" />
                        <div className="absolute inset-0 flex justify-center items-center">
                            <h1 className="bg-black text-white font-bold text-md px-2">
                                Thêm Thông Tin
                            </h1>
                        </div>
                    </div>
                    <div className="flex justify-center items-center mt-10">
                    <div className="border px-1 py-1 rounded-md border-gray-800 shadow-2xl cursor-pointer" onClick={()=>{
                        const animeTitle = animeData.data.attributes.titles.en_jp || animeData.data.attributes.titles.en;
                        const formattedAnimeTitle = animeTitle.replace(/\s+/g, '%20'); // Định dạng tên anime cho URL
                        const searchUrl = `https://myanimelist.net/search/all?q=${formattedAnimeTitle}&cat=all/`;
                        window.open(searchUrl, '_blank');
                    }}>
                        <Image 
                            src={"https://cdn.myanimelist.net/images/favicon.ico"} 
                            alt={"MALIcon"} 
                            width={30}
                            height={30}
                            priority={true}
                            className="rounded-lg"
                            placeholder="empty"
                                            />
                    </div>
                    <div className="border px-1 py-1 mx-4 rounded-md border-gray-800 shadow-2xl cursor-pointer" onClick={()=>{
                        const animeTitle = animeData.data.attributes.titles.en_jp || animeData.data.attributes.titles.en;
                        const formattedAnimeTitle = animeTitle.replace(/[!:#%&+={}?/\\[\]'"*;,]/g, '').replace(/[^\w\s-]/g, '').replace(/\s+/g, '-'); // Định dạng tên anime cho URL
                        const searchUrl = `https://kitsu.io/anime/${formattedAnimeTitle}`;
                        window.open(searchUrl, '_blank');
                    }}>
                        <Image 
                            src={"https://kitsu.io/favicon-32x32-3e0ecb6fc5a6ae681e65dcbc2bdf1f17.png"} 
                            alt={"KitsuIcon"} 
                            width={30}
                            height={30}
                            priority={true}
                            className="rounded-lg"
                            placeholder="empty"
                                            />
                    </div>
                    <div className="border px-1 py-1 rounded-md border-gray-800 shadow-2xl cursor-pointer" onClick={()=>{
                        const animeTitle = animeData.data.attributes.titles.en_jp || animeData.data.attributes.titles.en;
                        const formattedAnimeTitle = animeTitle.replace(/\s+/g, '%20'); // Định dạng tên anime cho URL
                        const searchUrl = `https://anilist.co/search/anime?search=${formattedAnimeTitle}`;
                        window.open(searchUrl, '_blank');
                    }}>
                        <Image 
                            src={"https://anilist.co/img/icons/favicon-32x32.png"} 
                            alt={"AniListIcon"} 
                            width={30}
                            height={30}
                            priority={true}
                            className="rounded-lg"
                            placeholder="empty"
                                            />
                    </div>
                </div>
            </div>
            ) : (
                <div>Đang tải dữ liệu...</div>
            )}
        </div>
    );
}

const Anime = ()=>{
    return (
        <Suspense>
            <AnimePage />
        </Suspense>
    );
}

export default Anime;
