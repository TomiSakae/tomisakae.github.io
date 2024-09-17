'use client'

import { useState, useEffect } from 'react';
import Nav from '@/components/nav';
import { FaArrowLeftLong, FaArrowRightLong } from "react-icons/fa6";
import { FaSearch } from "react-icons/fa";

const BrowserPage = () => {
    const [url, setUrl] = useState('');
    const [history, setHistory] = useState<string[]>([]);
    const [currentIndex, setCurrentIndex] = useState(-1);
    const [hasWifi, setHasWifi] = useState(false);
    const [displayUrl, setDisplayUrl] = useState('');

    useEffect(() => {
        const wifiPlanId = window.localStorage.getItem('wifiPlanId');
        setHasWifi(!!wifiPlanId);
    }, []);

    const handleSearch = (newUrl: string) => {
        if (newUrl && hasWifi) {
            let finalUrl = newUrl;
            setDisplayUrl(newUrl);
            if (newUrl === 'aniw://doctruyenkiemtien.ani') {
                finalUrl = 'http://tomisakae.github.io/AniPhone/browser/custom/doctruyen';
            }
            setHistory([...history.slice(0, currentIndex + 1), finalUrl]);
            setCurrentIndex(currentIndex + 1);
            setUrl(finalUrl);
        }
    };

    const goBack = () => {
        if (currentIndex > 0) {
            setCurrentIndex(currentIndex - 1);
            setUrl(history[currentIndex - 1]);
        }
    };

    const goForward = () => {
        if (currentIndex < history.length - 1) {
            setCurrentIndex(currentIndex + 1);
            setUrl(history[currentIndex + 1]);
        }
    };

    return (
        <div className="h-screen bg-black text-white flex flex-col">
            <Nav />
            <div className="p-4 flex-grow flex flex-col">
                <div className="flex items-center mb-4">
                    <FaArrowLeftLong className="text-xl cursor-pointer mr-4" onClick={goBack} />
                    <FaArrowRightLong className="text-xl cursor-pointer mr-4" onClick={goForward} />
                    <div className="flex-grow flex items-center bg-gray-800 rounded-lg p-2">
                        <FaSearch className="text-gray-400 mr-2" />
                        <input
                            type="text"
                            value={displayUrl}
                            onChange={(e) => {
                                setDisplayUrl(e.target.value);
                                handleSearch(e.target.value);
                            }}
                            placeholder="Nhập URL hoặc tìm kiếm..."
                            className="bg-transparent flex-grow outline-none"
                            disabled={!hasWifi}
                        />
                    </div>
                </div>
                <div className="flex-grow bg-gray-900 rounded-lg p-4 mb-6">
                    {!hasWifi ? (
                        <div className="flex items-center justify-center h-full text-gray-400">
                            Không có kết nối WiFi. Vui lòng kết nối WiFi để duyệt web
                        </div>
                    ) : url ? (
                        <iframe
                            key={url}
                            src={url}
                            className="w-full h-full border-none"
                            sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
                        />
                    ) : (
                        <div className="flex items-center justify-center h-full text-gray-400">
                            Nhập URL để bắt đầu duyệt web
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default BrowserPage;
