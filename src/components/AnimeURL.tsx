'use client'

import { useEffect, useState } from 'react';
import useSWR from 'swr';
import Image from 'next/image';
import 'react-toastify/dist/ReactToastify.css';

interface Props {
    animeData: {
        data: {
            attributes: {
                titles: {
                    en_jp: string;
                    en: string;
                };
            };
        };
    };
}

const AnimeURL: React.FC<Props> = ({ animeData }) => {
    return (
        <div>
            <div className="flex justify-center items-center mt-4">
                <button
                    className="bg-green-500 hover:bg-green-600 font-bold text-white py-2 px-4 rounded-md"
                    onClick={() => {
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
                    onClick={() => {
                        const animeTitle = animeData.data.attributes.titles.en_jp || animeData.data.attributes.titles.en;
                        const formattedAnimeTitle = encodeURIComponent(`${animeTitle} vietsub`); // Định dạng tên anime và chuỗi "trailer" cho URL
                        const youtubeUrl = `https://www.youtube.com/results?search_query=${formattedAnimeTitle}`;
                        window.open(youtubeUrl, '_blank');
                    }}
                >
                    VietSub
                </button>
                <div className="bg-blue-500 hover:bg-blue-600 flex rounded-l-md rounded-r-md">
                    <button
                        className="font-bold text-white py-2 pl-4"
                        onClick={() => {
                            const animeTitle = animeData.data.attributes.titles.en_jp || animeData.data.attributes.titles.en;
                            const formattedAnimeTitle = encodeURIComponent(`${animeTitle} OP`); // Định dạng tên anime và chuỗi "trailer" cho URL
                            const youtubeUrl = `https://www.youtube.com/results?search_query=${formattedAnimeTitle}`;
                            window.open(youtubeUrl, '_blank');
                        }}
                    >
                        OP
                    </button>
                    <h1 className="font-bold text-white py-2">/</h1>
                    <button
                        className="font-bold text-white py-2 pr-4"
                        onClick={() => {
                            const animeTitle = animeData.data.attributes.titles.en_jp || animeData.data.attributes.titles.en;
                            const formattedAnimeTitle = encodeURIComponent(`${animeTitle} ED`); // Định dạng tên anime và chuỗi "trailer" cho URL
                            const youtubeUrl = `https://www.youtube.com/results?search_query=${formattedAnimeTitle}`;
                            window.open(youtubeUrl, '_blank');
                        }}
                    >
                        ED
                    </button>
                </div>
            </div>
            <div className="relative my-4 mx-4 mt-10">
                <hr className="border-gray-600" />
                <div className="absolute inset-0 flex justify-center items-center">
                    <h1 className="bg-black hover:text-red-500 text-white font-bold text-md px-2 cursor-pointer" onClick={() => {
                        const animeTitle = animeData.data.attributes.titles.en_jp || animeData.data.attributes.titles.en;
                        // Định dạng tên anime cho URL
                        const searchUrl = `https://www.google.com/search?q=${encodeURIComponent(animeTitle)} vietsub`;
                        window.open(searchUrl, '_blank');
                    }}>
                        Xem Ngay
                    </h1>
                </div>
            </div>
            <div className="flex justify-center items-center mt-10">
                <div className="border px-1 py-1 rounded-md border-gray-800 shadow-2xl cursor-pointer" onClick={() => {
                    const animeTitle = animeData.data.attributes.titles.en_jp || animeData.data.attributes.titles.en;
                    const formattedAnimeTitle = animeTitle.replace(/\s+/g, '+'); // Định dạng tên anime cho URL
                    const searchUrl = `https://animevietsub.app/tim-kiem/${formattedAnimeTitle}/`;
                    window.open(searchUrl, '_blank');
                }}>
                    <Image
                        src={"https://animevietsub.app/favicon.ico"}
                        alt={"AnimeVietSubIcon"}
                        width={30}
                        height={30}
                        priority={true}
                        className="rounded-lg"
                        placeholder="empty"
                    />
                </div>
                <div className="border px-1 py-1 mx-4 rounded-md border-gray-800 shadow-2xl cursor-pointer" onClick={() => {
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
                <div className="border px-1 py-1 rounded-md border-gray-800 shadow-2xl cursor-pointer" onClick={() => {
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
                    <h1 className="bg-black hover:text-red-500 text-white font-bold text-md px-2 cursor-pointer" onClick={() => {
                        const animeTitle = animeData.data.attributes.titles.en_jp || animeData.data.attributes.titles.en;
                        // Định dạng tên anime cho URL
                        const searchUrl = `https://www.google.com/search?q=${encodeURIComponent(animeTitle)} info, news`;
                        window.open(searchUrl, '_blank');
                    }}>
                        Thêm Thông Tin
                    </h1>
                </div>
            </div>
            <div className="flex justify-center items-center mt-10">
                <div className="border px-1 py-1 rounded-md border-gray-800 shadow-2xl cursor-pointer" onClick={() => {
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
                <div className="border px-1 py-1 mx-4 rounded-md border-gray-800 shadow-2xl cursor-pointer" onClick={() => {
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
                <div className="border px-1 py-1 rounded-md border-gray-800 shadow-2xl cursor-pointer" onClick={() => {
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
            <div className="relative my-4 mx-4 mt-10">
                <hr className="border-gray-600" />
                <div className="absolute inset-0 flex justify-center items-center">
                    <h1 className="bg-black hover:text-red-500 text-white font-bold text-md px-2 cursor-pointer" onClick={() => {
                        const animeTitle = animeData.data.attributes.titles.en_jp || animeData.data.attributes.titles.en;
                        // Định dạng tên anime cho URL
                        const searchUrl = `https://www.google.com/search?q=${encodeURIComponent(animeTitle)} đọc manga`;
                        window.open(searchUrl, '_blank');
                    }}>
                        Đọc Manga
                    </h1>
                </div>
            </div>
            <div className="flex justify-center items-center mt-10">
                <div className="border px-1 py-1 rounded-md border-gray-800 shadow-2xl cursor-pointer" onClick={() => {
                    const animeTitle = animeData.data.attributes.titles.en_jp || animeData.data.attributes.titles.en;
                    const formattedAnimeTitle = animeTitle.replace(/\s+/g, '+'); // Định dạng tên anime cho URL
                    const searchUrl = `https://blogtruyen.vn/timkiem?Option=1&keyword=${formattedAnimeTitle}`;
                    window.open(searchUrl, '_blank');
                }}>
                    <Image
                        src={"https://blogtruyen.vn/Content/themes/img/favicon.png"}
                        alt={"AnimeVietSubIcon"}
                        width={30}
                        height={30}
                        priority={true}
                        className="rounded-lg"
                        placeholder="empty"
                    />
                </div>
                <div className="border px-1 py-1 mx-4 rounded-md border-gray-800 shadow-2xl cursor-pointer" onClick={() => {
                    const animeTitle = animeData.data.attributes.titles.en_jp || animeData.data.attributes.titles.en;
                    const formattedAnimeTitle = animeTitle.replace(/\s+/g, '+'); // Định dạng tên anime cho URL
                    const searchUrl = `https://nettruyenaa.com/tim-truyen?keyword=${formattedAnimeTitle}`;
                    window.open(searchUrl, '_blank');
                }}>
                    <Image
                        src={"https://nettruyenaa.com/public/assets/images/favicon.png"}
                        alt={"AnimetIcon"}
                        width={30}
                        height={30}
                        priority={true}
                        className="rounded-lg"
                        placeholder="empty"
                    />
                </div>
                <div className="border px-1 py-1 rounded-md border-gray-800 shadow-2xl cursor-pointer" onClick={() => {
                    const animeTitle = animeData.data.attributes.titles.en_jp || animeData.data.attributes.titles.en;
                    const formattedAnimeTitle = animeTitle.replace(/\s+/g, '%20'); // Định dạng tên anime cho URL
                    const searchUrl = `https://truyenqqviet.com/tim-kiem.html?q=${formattedAnimeTitle}`;
                    window.open(searchUrl, '_blank');
                }}>
                    <Image
                        src={"https://st.truyenqqviet.com/template/frontend/images/favicon.ico"}
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
                    <h1 className="bg-black hover:text-red-500 text-white font-bold text-md px-2 cursor-pointer" onClick={() => {
                        const animeTitle = animeData.data.attributes.titles.en_jp || animeData.data.attributes.titles.en;
                        // Định dạng tên anime cho URL
                        const searchUrl = `https://www.google.com/search?q=${encodeURIComponent(animeTitle)} đọc light novel`;
                        window.open(searchUrl, '_blank');
                    }}>
                        Đọc Light Novel
                    </h1>
                </div>
            </div>
            <div className="flex justify-center items-center mt-10">
                <div className="border px-1 py-1 rounded-md border-gray-800 shadow-2xl cursor-pointer" onClick={() => {
                    const animeTitle = animeData.data.attributes.titles.en_jp || animeData.data.attributes.titles.en;
                    const formattedAnimeTitle = animeTitle.replace(/\s+/g, '+'); // Định dạng tên anime cho URL
                    const searchUrl = `https://docln.net/tim-kiem?keywords=${formattedAnimeTitle}`;
                    window.open(searchUrl, '_blank');
                }}>
                    <Image
                        src={"https://docln.net/img/favicon.png?v=3"}
                        alt={"AnimeVietSubIcon"}
                        width={30}
                        height={30}
                        priority={true}
                        className="rounded-lg"
                        placeholder="empty"
                    />
                </div>
                <div className="border px-1 py-1 mx-4 rounded-md border-gray-800 shadow-2xl cursor-pointer" onClick={() => {
                    const animeTitle = animeData.data.attributes.titles.en_jp || animeData.data.attributes.titles.en;
                    const formattedAnimeTitle = animeTitle.replace(/\s+/g, '+'); // Định dạng tên anime cho URL
                    const searchUrl = `https://lnvn.net/search?q=${formattedAnimeTitle}`;
                    window.open(searchUrl, '_blank');
                }}>
                    <Image
                        src={"https://lnvn.net/favicon.ico"}
                        alt={"AnimetIcon"}
                        width={30}
                        height={30}
                        priority={true}
                        className="rounded-lg bg-white"
                        placeholder="empty"
                    />
                </div>
                <div className="border px-1 py-1 rounded-md border-gray-800 shadow-2xl cursor-pointer" onClick={() => {
                    const animeTitle = animeData.data.attributes.titles.en_jp || animeData.data.attributes.titles.en;
                    const formattedAnimeTitle = animeTitle.replace(/\s+/g, '+'); // Định dạng tên anime cho URL
                    const searchUrl = `https://sonako.fandom.com/vi/wiki/%C4%90%E1%BA%B7c_bi%E1%BB%87t:T%C3%ACm_ki%E1%BA%BFm?query=${formattedAnimeTitle}&scope=internal&navigationSearch=true`;
                    window.open(searchUrl, '_blank');
                }}>
                    <Image
                        src={"data:image/webp;base64,UklGRjQCAABXRUJQVlA4ICgCAADQDQCdASogACAAPjEKjEYiEREMACADBLYATplCMAcIZoF2rya/l35Zt4A/uG6A/YD9K+EA/YDrAPQA/W71K/8p+zPwD/tH6I7xl8LP+1+lrnZ+b/YA/j38l/ynAMfo0wCgBrLCCPP+547xVwMLC+gAaN7R/bFdYAD+//7kY0h/6+F/vk/OCybCRN3fQHIN+uP/9+VKRZkQyyazRk3WAoueDeoL8Ywz5QvfK69YlosQdcap4/f2zTUN6Crzl0spDxH/8zJ3/g1/0efemehz9Gj3z0Vf+z8BgKndG0EVth8aUx1IUpf/yF0qYWx3EAnGMxOg+q4h3f05itACV38vO1VJe2smL7e/ovpkIvvkh/xhUE78ctgO5XoCEJ0O/KAvI89go6O4ZdjN+T//p5G49scn/JqFffW//wLD59rGqhCYyMO93Ard9Ccca07VimOjHKz6Q0VFcU5cVSzRMihLqT4JssdASF+6O4YQHOxeSudyn5HdfGDxT3Lrjm+OiBaCM57+0vB5fYm4ayGJvdoNPQgqu9iwOcNJWOSoY7FM/fqKsBHEMu4f1GK23H/LkdWBJz9f1DpTaEcZmiaRFvncrVS/eYb9+HU1AdowyZy7yVyxS3Nus/5rB/AooHMfzn4Be2nSagqfqk0PBzZJXkyX/NVuOoRLwj1ZZ+9dHvoWGDB447AwX0OL6XkNhgv3Q3XjxeE3JRCtR6WVtDkOaufndtTYv8vNVOEAAAA="}
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
                    <h1 className="bg-black hover:text-red-500 text-white font-bold text-md px-2 cursor-pointer" onClick={() => {
                        const animeTitle = animeData.data.attributes.titles.en_jp || animeData.data.attributes.titles.en;
                        // Định dạng tên anime cho URL
                        const searchUrl = `https://www.google.com/search?q=${encodeURIComponent(animeTitle)} gallery`;
                        window.open(searchUrl, '_blank');
                    }}>
                        Xem Ảnh
                    </h1>
                </div>
            </div>
            <div className="flex justify-center items-center mt-10">
                <div className="border px-1 py-1 rounded-md border-gray-800 shadow-2xl cursor-pointer" onClick={() => {
                    const animeTitle = animeData.data.attributes.titles.en_jp || animeData.data.attributes.titles.en;
                    const formattedAnimeTitle = animeTitle.replace(/\s+/g, '+'); // Định dạng tên anime cho URL
                    const searchUrl = `https://www.pixiv.net/en/tags/${formattedAnimeTitle}/artworks?s_mode=s_tag`;
                    window.open(searchUrl, '_blank');
                }}>
                    <Image
                        src={"https://www.pixiv.net/favicon.ico"}
                        alt={"AnimeVietSubIcon"}
                        width={30}
                        height={30}
                        priority={true}
                        className="rounded-lg"
                        placeholder="empty"
                    />
                </div>
                <div className="border px-1 py-1 mx-4 rounded-md border-gray-800 shadow-2xl cursor-pointer" onClick={() => {
                    const animeTitle = animeData.data.attributes.titles.en_jp || animeData.data.attributes.titles.en;
                    const formattedAnimeTitle = animeTitle.replace(/\s+/g, '+'); // Định dạng tên anime cho URL
                    const searchUrl = `https://www.zerochan.net/${formattedAnimeTitle}?q=${formattedAnimeTitle}`;
                    window.open(searchUrl, '_blank');
                }}>
                    <Image
                        src={"data:image/webp;base64,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"}
                        alt={"AnimetIcon"}
                        width={30}
                        height={30}
                        priority={true}
                        className="rounded-lg bg-white"
                        placeholder="empty"
                    />
                </div>
                <div className="border px-1 py-1 rounded-md border-gray-800 shadow-2xl cursor-pointer" onClick={() => {
                    const animeTitle = animeData.data.attributes.titles.en_jp || animeData.data.attributes.titles.en;
                    const formattedAnimeTitle = animeTitle.replace(/\s+/g, '+'); // Định dạng tên anime cho URL
                    const searchUrl = `https://safebooru.org/index.php?page=post&s=list&tags=${formattedAnimeTitle}`;
                    window.open(searchUrl, '_blank');
                }}>
                    <Image
                        src={"https://safebooru.org/favicon.ico"}
                        alt={"AnimeTVNIcon"}
                        width={30}
                        height={30}
                        priority={true}
                        className="rounded-lg"
                        placeholder="empty"
                    />
                </div>
            </div>
        </div>
    );
}

export default AnimeURL;