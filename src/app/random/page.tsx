'use client'
import { CiSearch } from "react-icons/ci";
import { useState, useEffect } from 'react';
import { GoArrowLeft } from "react-icons/go";
import { AiOutlineClose } from 'react-icons/ai';
import { generateChatResponse } from '../../components/GeminiAPIRandom';
import Image from 'next/image';
import useSWR from 'swr';

const fetcher = (url: string) => fetch(url).then(res => res.json());

const VTube = () => {
    const { data: nekosData, error: nekosError } = useSWR('https://api.nekosapi.com/v3/images/random?rating=safe&is_flagged=false&limit=10', fetcher);
    const { data: jikanData, error: jikanError } = useSWR('https://api.jikan.moe/v4/seasons/2024/winter?limit=10', fetcher); // Example Jikan API endpoint
    const [isShowSearch, setIsShowSearch] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const [animeTitles, setAnimeTitles] = useState([]);
    const [isGeminiLoaded, setIsGeminiLoaded] = useState(false); // State to track if titles are loaded

    const showSearch = () => {
        setIsShowSearch(true);
    }

    const hideSearch = () => {
        setIsShowSearch(false);
    }

    const handleInputChange = (e: any) => {
        setInputValue(e.target.value);
    };

    const clearInput = () => {
        setInputValue('');
    };

    useEffect(() => {
        const fetchData = async () => {
            if (jikanData && jikanData.data) {
                const titles = jikanData.data.map((anime: any, index: number) => ({
                    id: index + 1,
                    title: anime.title,
                    // Add more fields as needed
                }));
                setAnimeTitles(titles);
                // Generate JSON string for titles
                const titlesJson = JSON.stringify({ anime_titles: titles });
                const response = await generateChatResponse(titlesJson); // Assuming generateChatResponse accepts JSON string
                const Anime = JSON.parse(response);
                setAnimeTitles(Anime.anime_titles); // Update animeTitles state with response
                setIsGeminiLoaded(true); // Titles are loaded
            }
        };

        fetchData();
    }, [jikanData]);

    if (nekosError || jikanError) return <div>Failed to load</div>;
    if (!nekosData || !jikanData || isGeminiLoaded === false) return (
        <div className="grid bg-[#0f0f0f] grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {/* Placeholder items with pulse animation */}
            <div className="flex flex-col bg-[#0f0f0f] pb-12 pt-14 text-white">
                <header className="fixed top-0 left-0 w-full bg-[#0f0f0f] px-4 py-2 z-10">
                    {/* Search bar */}
                    {isShowSearch === false ? (
                        <div className="flex justify-between items-center">
                            <div className="text-xl font-bold">VvTube</div>
                            <CiSearch className="text-2xl font-bold cursor-pointer" onClick={showSearch} />
                        </div>
                    ) : (
                        <div className="flex justify-between items-center">
                            <GoArrowLeft className="text-2xl font-bold cursor-pointer mr-3" onClick={hideSearch} />
                            <div className="relative w-full px-2 py-2 h-[2.2em] bg-[#333333] rounded-2xl">
                                <textarea
                                    placeholder="Tìm trên VvTube"
                                    autoFocus
                                    className="resize-none overflow-x-auto text-sm border-none px-2 h-full rounded-2xl bg-[#333333] focus:outline-none text-white pr-16 leading-tight whitespace-nowrap"
                                    value={inputValue}
                                    onChange={handleInputChange}
                                />
                                {inputValue && (
                                    <AiOutlineClose
                                        className="absolute right-4 text-[1.4em] font-bold mr-8 top-[0.73em] top-1/2 transform -translate-y-1/2 text-white cursor-pointer"
                                        onClick={clearInput}
                                    />
                                )}
                                <CiSearch
                                    className="text-2xl font-bold cursor-pointer absolute right-3 top-[0.65em] top-1/2 transform -translate-y-1/2 text-white"
                                    onClick={showSearch}
                                />
                            </div>
                        </div>
                    )}
                </header>
                {[...Array(10)].map((_, index) => (
                    <div key={index} className="animate-pulse mx-[6vw] mb-6 overflow-hidden">
                        <div className="h-[44vw] bg-gray-800 rounded-xl mb-3"></div>
                        <div className="flex">
                            <div className="rounded-full w-[33px] h-[33px] bg-gray-300 mx-2"></div>
                            <div className="flex flex-col ml-2 w-[80%]">
                                <div className="h-4 bg-gray-300 rounded mb-1"></div>
                                <div className="h-4 bg-gray-300 rounded"></div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );

    const nekosImages = nekosData.items.map((item: any, index: number) => ({
        imageUrl: item.image_url,
        title: isGeminiLoaded ? (animeTitles[index] as any).title : '', // Assign title if loaded and available

    }));

    return (
        <div className="flex flex-col bg-[#0f0f0f] pb-12 text-white">
            <header className="fixed top-0 left-0 w-full bg-[#0f0f0f] px-4 py-2">
                {/* Search bar */}
                {isShowSearch === false ? (
                    <div className="flex justify-between items-center">
                        <div className="text-xl font-bold">VvTube</div>
                        <CiSearch className="text-2xl font-bold cursor-pointer" onClick={showSearch} />
                    </div>
                ) : (
                    <div className="flex justify-between items-center">
                        <GoArrowLeft className="text-2xl font-bold cursor-pointer mr-3" onClick={hideSearch} />
                        <div className="relative w-full px-2 py-2 h-[2.2em] bg-[#333333] rounded-2xl">
                            <textarea
                                placeholder="Tìm trên VvTube"
                                autoFocus
                                className="resize-none overflow-x-auto text-sm border-none px-2 h-full rounded-2xl bg-[#333333] focus:outline-none text-white pr-16 leading-tight whitespace-nowrap"
                                value={inputValue}
                                onChange={handleInputChange}
                            />
                            {inputValue && (
                                <AiOutlineClose
                                    className="absolute right-4 text-[1.4em] font-bold mr-8 top-[0.73em] top-1/2 transform -translate-y-1/2 text-white cursor-pointer"
                                    onClick={clearInput}
                                />
                            )}
                            <CiSearch
                                className="text-2xl font-bold cursor-pointer absolute right-3 top-[0.65em] top-1/2 transform -translate-y-1/2 text-white"
                                onClick={showSearch}
                            />
                        </div>
                    </div>
                )}
            </header>
            <main className="mt-16">
                {/* Display images and anime list */}
                <div className="grid grid-cols-1 gap-4">
                    {isGeminiLoaded &&
                        nekosImages.map((image: any, index: number) => (
                            <div key={index} className="mx-[6vw] mb-6">
                                <div className="h-[44vw] bg-gray-800 rounded-xl mb-3" style={{ backgroundImage: `url(${image.imageUrl})`, backgroundSize: 'cover', backgroundPosition: 'top' }}></div>
                                <div className="flex">
                                    <Image
                                        src="/tomisakae.jpg"
                                        alt="TomiSakae"
                                        width={33}
                                        height={33}
                                        className="rounded-full w-[33px] h-[33px] mx-2"
                                    />
                                    <div className="flex flex-col ml-2 w-[80%]">
                                        <h6 className="text-md font-[600] mb-1 truncate-2-lines">{image.title}</h6>
                                        <p className="text-sm text-[#AAAAA0] font-[500] flex items-center">
                                            TomiSakae
                                        </p>
                                        <p className="text-sm text-[#AAAAA0] font-[500] flex items-center">
                                            10 N lượt xem <span className="mx-1">•</span> 1 ngày trước
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                </div>
            </main>
        </div>
    )
}

export default VTube;
