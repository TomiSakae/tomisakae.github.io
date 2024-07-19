'use client'
import { CiSearch } from "react-icons/ci";
import { useState, useEffect } from 'react';
import { GoArrowLeft } from "react-icons/go";
import { AiOutlineClose } from 'react-icons/ai';
import { generateChatResponse } from '../../../components/GeminiAPIRandom';
import Image from 'next/image';
import useSWR from 'swr';
import Link from 'next/link';
import { FaExpand } from "react-icons/fa";
import { motion, AnimatePresence } from 'framer-motion';

const fetcher = (url: string) => fetch(url).then(res => res.json());
const fetcherPOST = async (url: string) => {
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            type: 'waifu',
        }),
    });

    if (!response.ok) {
        throw new Error('Network response was not ok');
    }

    return response.json();
};


const getRandomYear = () => {
    const minYear = 1999;
    const maxYear = new Date().getFullYear();
    return Math.floor(Math.random() * (maxYear - minYear + 1)) + minYear;
};

const getRandomSeason = (year: any) => {
    const seasons = ['winter', 'spring', 'summer', 'fall'];
    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth() + 1;

    if (year === currentYear) {
        if (currentMonth >= 10) {
            return seasons[Math.floor(Math.random() * 3)]; // winter, spring, summer
        } else if (currentMonth >= 7) {
            return seasons[Math.floor(Math.random() * 2)]; // winter, spring
        } else if (currentMonth >= 4) {
            return 'winter'; // only winter
        }
    }

    return seasons[Math.floor(Math.random() * seasons.length)]; // all seasons
};

const VTube = () => {
    const [year, setYear] = useState(getRandomYear);
    const [season, setSeason] = useState(getRandomSeason(year));
    const [isZoomed, setIsZoomed] = useState("");
    const { data: waifusData, error: waifusError } = useSWR('https://api.waifu.pics/many/sfw/waifu', fetcherPOST);
    const { data: jikanData, error: jikanError } = useSWR(`https://api.jikan.moe/v4/seasons/${year}/${season}?limit=20`, fetcher);
    const [isShowSearch, setIsShowSearch] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const [animeTitles, setAnimeTitles] = useState([]);
    const [animeMembers, setAnimeMembers] = useState([]);
    const [animeMalId, setAnimeMalId] = useState([]);
    const [animeAired, setAnimeAired] = useState([]);
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
                const members = jikanData.data.map((anime: any, index: number) => ({
                    id: index + 1,
                    members: anime.members,
                    // Add more fields as needed
                }));
                const aired = jikanData.data.map((anime: any, index: number) => ({
                    id: index + 1,
                    aired: anime.aired.from,
                    // Add more fields as needed
                }));
                const malId = jikanData.data.map((anime: any, index: number) => ({
                    id: index + 1,
                    malId: anime.mal_id,
                    // Add more fields as needed
                }));
                setAnimeTitles(titles);
                setAnimeMembers(members);
                setAnimeAired(aired);
                setAnimeMalId(malId);
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

    if (waifusError || jikanError) return <div>Failed to load</div>;
    if (!waifusData || !jikanData || isGeminiLoaded === false) return (
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
                        <div className="h-[52vw] bg-gray-800 rounded-xl mb-3"></div>
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

    const waifusImages = waifusData.files.slice(0, 20).map((imageUrl: string, index: number) => {
        let formattedMembers = '';
        let timeSinceAired = '';

        if (isGeminiLoaded) {
            const members = (animeMembers[index] as any).members;
            if (members >= 1000000) {
                if (members >= 10000000) {
                    formattedMembers = `${Math.floor(members / 1000000)} Tr`;
                } else {
                    formattedMembers = `${(members / 1000000).toFixed(1).replace('.', ',')} Tr`;
                }
            } else if (members >= 1000) {
                formattedMembers = `${Math.floor(members / 1000)} N`;
            } else {
                formattedMembers = members.toString();
            }

            const airedFrom = new Date((animeAired[index] as any).aired);
            const currentDate = new Date();
            const timeDifference = Math.abs(currentDate.getTime() - airedFrom.getTime());
            const daysDifference = Math.ceil(timeDifference / (1000 * 3600 * 24));

            if (daysDifference > 365) {
                timeSinceAired = `${Math.floor(daysDifference / 365)} năm`;
            } else if (daysDifference >= 30) {
                timeSinceAired = `${Math.floor(daysDifference / 30)} tháng`;
            } else if (daysDifference >= 7) {
                timeSinceAired = `${Math.floor(daysDifference / 7)} tuần`;
            } else {
                timeSinceAired = `${daysDifference} ngày`;
            }
        }

        return {
            imageUrl: imageUrl,
            title: isGeminiLoaded ? (animeTitles[index] as any).title : '', // Assign title if loaded and available
            members: formattedMembers,
            aired: timeSinceAired,
            malId: isGeminiLoaded ? (animeMalId[index] as any).malId : '',
        };
    });

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
                        waifusImages.map((image: any, index: number) => (
                            <motion.div
                                key={index}
                                layoutId={image.imageUrl}
                            >
                                <div className="mx-[6vw] mb-6">
                                    <Link href={`/random/anime/?id=${image.malId}`}>
                                        <div className="h-[58vw] bg-gray-800 rounded-xl mb-3 cursor-pointer" style={{ backgroundImage: `url(${image.imageUrl})`, backgroundSize: 'cover', backgroundPosition: 'top' }}></div>
                                        <div className="flex">
                                            <Image
                                                src="/tomisakae.jpg"
                                                alt="TomiSakae"
                                                width={35}
                                                height={35}
                                                className="rounded-full w-[35px] h-[35px] ml-2 mr-1"

                                            />

                                            <div className="flex flex-col ml-2 w-[80%]">
                                                <h6 className="text-md font-[600] mb-1 truncate-2-lines">{image.title}</h6>
                                                <p className="text-sm text-[#AAAAA0] font-[500] flex items-center">
                                                    TomiSakae
                                                </p>
                                                <p className="text-sm text-[#AAAAA0] font-[500] flex items-center">
                                                    {image.members} lượt xem <span className="mx-1">•</span> {image.aired} trước
                                                </p>
                                            </div>
                                            <FaExpand className="text-xl mt-1 ml-2 mr-3 text-[#AAAAA0] font-bold cursor-pointer" onClick={() => setIsZoomed(image.imageUrl)} />
                                        </div>
                                    </Link>
                                </div>
                            </motion.div>
                        ))}
                    <AnimatePresence>
                        {isZoomed && (
                            <motion.div
                                layoutId={isZoomed}
                                className="fixed z-20 top-0 h-screen w-screen"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                            >
                                <motion.button onClick={() => setIsZoomed("")}>
                                    <Image
                                        src={isZoomed}
                                        alt={"ảnh Anime"}
                                        width={550}
                                        height={780}
                                        priority={true}
                                        className="h-auto"
                                        placeholder="empty"
                                    />
                                </motion.button>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </main>
        </div>
    )
}

export default VTube;
