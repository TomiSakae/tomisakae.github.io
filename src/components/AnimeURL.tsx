'use client'

import Image from 'next/image';

// Định nghĩa một mảng JSON chứa thông tin của từng icon
const iconData = [
    {
        id: 1,
        name: 'Anime',
        searchUrl: (animeTitle: string) => `https://www.google.com/search?q=${encodeURIComponent(animeTitle)} vietsub`,
    },
    {
        id: 2,
        name: 'Thông Tin',
        searchUrl: (animeTitle: string) => `https://www.google.com/search?q=${encodeURIComponent(animeTitle)} info, news`,
    },
    {
        id: 3,
        name: 'Manga',
        searchUrl: (animeTitle: string) => `https://www.google.com/search?q=${encodeURIComponent(animeTitle)} đọc manga`,
    },
    {
        id: 4,
        name: 'Light Novel',
        searchUrl: (animeTitle: string) => `https://www.google.com/search?q=${encodeURIComponent(animeTitle)} đọc light novel`,
    },
    {
        id: 5,
        name: 'Ảnh',
        searchUrl: (animeTitle: string) => `https://www.google.com/search?q=${encodeURIComponent(animeTitle)} gallery`,
    },
];


const iconShowData = [
    {
        id: 1,
        name: 'AnimeVietSub',
        url: 'https://animevietsub.app/favicon.ico',
        formatUrl: (animeTitle: string) => {
            return animeTitle.replace(/\s+/g, '+')
        },
        searchUrl: (formattedAnimeTitle: string) => `https://animevietsub.app/tim-kiem/${formattedAnimeTitle}/`,
    },
    {
        id: 1,
        name: 'Animet',
        url: 'https://animet1.net/Theme_Anime/img/favicon.ico',
        formatUrl: (animeTitle: string) => {
            return animeTitle.replace(/\s+/g, '+')
        },
        searchUrl: (formattedAnimeTitle: string) => `https://animet1.net/tim-kiem/${formattedAnimeTitle}.html`,
    },
    {
        id: 1,
        name: 'AnimeTVN',
        url: 'https://animetvn4.com/images/favicon.ico',
        formatUrl: (animeTitle: string) => {
            return animeTitle.replace(/\s+/g, '%20')
        },
        searchUrl: (formattedAnimeTitle: string) => `https://animetvn4.com/tim-kiem/${formattedAnimeTitle}.html`,
    },
    {
        id: 2,
        name: 'MyAnimeList',
        url: 'https://cdn.myanimelist.net/images/favicon.ico',
        formatUrl: (animeTitle: string) => animeTitle.replace(/\s+/g, '%20'),
        searchUrl: (formattedAnimeTitle: string) => `https://myanimelist.net/search/all?q=${formattedAnimeTitle}&cat=all`,
    },
    {
        id: 2,
        name: 'Kitsu',
        url: 'https://kitsu.io/favicon-32x32-3e0ecb6fc5a6ae681e65dcbc2bdf1f17.png',
        formatUrl: (animeTitle: string) => animeTitle.replace(/[!:#%&+={}?/\\[\]'"*;,]/g, '').replace(/[^\w\s-]/g, '').replace(/\s+/g, '-'),
        searchUrl: (formattedAnimeTitle: string) => `https://kitsu.io/anime/${formattedAnimeTitle}`,
    },
    {
        id: 2,
        name: 'AniList',
        url: 'https://anilist.co/img/icons/favicon-32x32.png',
        formatUrl: (animeTitle: string) => animeTitle.replace(/\s+/g, '%20'),
        searchUrl: (formattedAnimeTitle: string) => `https://anilist.co/search/anime?search=${formattedAnimeTitle}`,
    },
    {
        id: 3,
        name: 'BlogTruyen',
        url: 'https://blogtruyen.vn/Content/themes/img/favicon.png',
        formatUrl: (animeTitle: string) => animeTitle.replace(/\s+/g, '+'),
        searchUrl: (formattedAnimeTitle: string) => `https://blogtruyen.vn/timkiem?Option=1&keyword=${formattedAnimeTitle}`,
    },
    {
        id: 3,
        name: 'NetTruyen',
        url: 'https://nettruyenaa.com/public/assets/images/favicon.png',
        formatUrl: (animeTitle: string) => animeTitle.replace(/\s+/g, '+'),
        searchUrl: (formattedAnimeTitle: string) => `https://nettruyenaa.com/tim-truyen?keyword=${formattedAnimeTitle}`,
    },
    {
        id: 3,
        name: 'TruyenQQ',
        url: 'https://st.truyenqqviet.com/template/frontend/images/favicon.ico',
        formatUrl: (animeTitle: string) => animeTitle.replace(/\s+/g, '%20'),
        searchUrl: (formattedAnimeTitle: string) => `https://truyenqqviet.com/tim-kiem.html?q=${formattedAnimeTitle}`,
    },
    {
        id: 4,
        name: 'Hako',
        url: 'https://docln.net/img/favicon.png?v=3',
        formatUrl: (animeTitle: string) => animeTitle.replace(/\s+/g, '+'),
        searchUrl: (formattedAnimeTitle: string) => `https://docln.net/tim-kiem?keywords=${formattedAnimeTitle}`,
    },
    {
        id: 4,
        name: 'LNVN',
        url: 'https://lnvn.net/favicon.ico',
        formatUrl: (animeTitle: string) => animeTitle.replace(/\s+/g, '+'),
        searchUrl: (formattedAnimeTitle: string) => `https://lnvn.net/search?q=${formattedAnimeTitle}`,
    },
    {
        id: 4,
        name: 'Sonako',
        url: '/sonako.webp',
        formatUrl: (animeTitle: string) => animeTitle.replace(/\s+/g, '+'),
        searchUrl: (formattedAnimeTitle: string) => `https://sonako.fandom.com/vi/wiki/%C4%90%E1%BA%B7c_bi%E1%BB%87t:T%C3%ACm_ki%E1%BA%BFm?query=${formattedAnimeTitle}&scope=internal&navigationSearch=true`,
    },
    {
        id: 5,
        name: 'Pixiv',
        url: 'https://www.pixiv.net/favicon.ico',
        formatUrl: (animeTitle: string) => animeTitle.replace(/\s+/g, '+'),
        searchUrl: (formattedAnimeTitle: string) => `https://www.pixiv.net/en/tags/${formattedAnimeTitle}/artworks?s_mode=s_tag;`,
    },
    {
        id: 5,
        name: 'ZeroChan',
        url: 'zerochan.webp',
        formatUrl: (animeTitle: string) => animeTitle.replace(/\s+/g, '+'),
        searchUrl: (formattedAnimeTitle: string) => `https://www.zerochan.net/${formattedAnimeTitle}?q=${formattedAnimeTitle}`,
    },
    {
        id: 5,
        name: 'SafeBooru',
        url: 'https://safebooru.org/favicon.ico',
        formatUrl: (animeTitle: string) => animeTitle.replace(/\s+/g, '+'),
        searchUrl: (formattedAnimeTitle: string) => ` https://safebooru.org/index.php?page=post&s=list&tags=${formattedAnimeTitle}`,
    },
];

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
            {iconData.map((icon, index) => (
                <div key={index}>
                    <div className="relative my-4 mx-4 mt-10">
                        <div className="absolute inset-0 flex justify-center items-center">
                            <h1 className={`pt-2 px-4 rounded-t-2xl font-bold text-md px-2 cursor-pointer ${icon.id === 1 ? 'bg-rose-400 hover:text-red-500 text-white' : icon.id === 2 ? 'bg-blue-900 hover:text-red-500 text-white' : icon.id === 3 ? 'bg-yellow-200 hover:text-red-500 text-black' : icon.id === 4 ? 'bg-purple-50 hover:text-red-500 text-black' : 'bg-gray-200 hover:text-red-500 text-black'}`} onClick={() => {
                                const animeTitle = animeData.data.attributes.titles.en_jp || animeData.data.attributes.titles.en;
                                // Định dạng tên anime cho URL
                                window.open(icon.searchUrl(animeTitle), '_blank');
                            }}>
                                {icon.name}
                            </h1>
                        </div>
                    </div>
                    <div className={`rounded-2xl mx-4 pt-8 pb-6 flex justify-center items-center mt-12 ${icon.id === 1 ? 'bg-rose-400' : icon.id === 2 ? 'bg-blue-900' : icon.id === 3 ? 'bg-yellow-200' : icon.id === 4 ? 'bg-purple-50' : 'bg-gray-200'}`}>
                        {iconShowData.map((icons, idx) => {
                            // Kiểm tra nếu icons.id === icon.id thì mới hiển thị iconShowData
                            if (icons.id === icon.id) {
                                return (
                                    <div key={idx} className="border bg-black px-1 py-1 mx-2 rounded-lg border-gray-800 shadow-2xl cursor-pointer"
                                        onClick={() => {
                                            const animeTitle = animeData.data.attributes.titles.en_jp || animeData.data.attributes.titles.en;
                                            const formattedAnimeTitle = icons.formatUrl(animeTitle); // Định dạng tên anime cho URL
                                            window.open(icons.searchUrl(formattedAnimeTitle), '_blank');
                                        }}>
                                        <Image
                                            src={icons.url}
                                            alt={`${icons.name} Icon`}
                                            width={30}
                                            height={30}
                                            priority={true}
                                            className={`rounded-lg ${icons.name === "LNVN" ? "bg-white" : ""}`}
                                            placeholder="empty"
                                        />
                                    </div>
                                );
                            }
                            return null; // Trả về null nếu không thỏa điều kiện
                        })}
                    </div>
                </div>
            ))
            }
        </div >
    );
}

export default AnimeURL;