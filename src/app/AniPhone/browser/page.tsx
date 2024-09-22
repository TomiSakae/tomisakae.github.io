'use client'

import { useState, useEffect } from 'react';
import Nav from '@/components/nav';
import { FaArrowLeftLong, FaArrowRightLong } from "react-icons/fa6";
import { FaSearch } from "react-icons/fa";
import Image from 'next/image';

const BrowserPage = () => {
    const [url, setUrl] = useState('');
    const [history, setHistory] = useState<string[]>([]);
    const [currentIndex, setCurrentIndex] = useState(-1);
    const [hasWifi, setHasWifi] = useState(false);
    const [displayUrl, setDisplayUrl] = useState('');
    const [showNotification, setShowNotification] = useState(false);
    const [notificationMessage, setNotificationMessage] = useState('');

    useEffect(() => {
        const wifiPlanId = window.localStorage.getItem('wifiPlanId');
        setHasWifi(!!wifiPlanId);
    }, []);

    useEffect(() => {
        const checkNotification = () => {
            const notification = window.sessionStorage.getItem('Notification');
            if (notification) {
                setNotificationMessage(notification);
                setShowNotification(true);
                setTimeout(() => setShowNotification(false), 3000);
                window.sessionStorage.removeItem('Notification');
            }
        };

        const intervalId = setInterval(checkNotification, 1000);

        return () => clearInterval(intervalId);
    }, []);

    const handleSearch = (newUrl: string) => {
        if (newUrl && hasWifi) {
            let finalUrl = newUrl;
            setDisplayUrl(newUrl);
            if (newUrl === 'aniw://doctruyenkiemtien.ani') {
                finalUrl = 'https://tomisakae.github.io/AniPhone/browser/custom/doctruyen';
                //finalUrl = 'http://localhost:3000/AniPhone/browser/custom/doctruyen';
            }
            if (newUrl === 'aniw://khaosatkiemtien.ani') {
                finalUrl = 'https://tomisakae.github.io/AniPhone/browser/custom/khaosat';
                //finalUrl = 'http://localhost:3000/AniPhone/browser/custom/khaosat';
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
            {showNotification && (
                <div className="fixed top-10 left-0 right-0 bg-white text-black px-4 py-3 shadow-lg z-50 animate-fade-in-down flex items-center h-[10vh]">
                    <div className="w-10 h-10 mr-3 rounded-full overflow-hidden">
                        <Image
                            src="/mes.webp"
                            alt="Message icon"
                            width={40}
                            height={40}
                            className="object-cover"
                        />
                    </div>
                    <div className="flex-grow">
                        <p className="font-semibold text-sm">Thông báo</p>
                        <p className="text-xs text-gray-600">{notificationMessage}</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default BrowserPage;
