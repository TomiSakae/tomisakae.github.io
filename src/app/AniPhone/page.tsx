'use client'
import { LiaBatteryFullSolid, LiaBatteryThreeQuartersSolid, LiaBatteryHalfSolid, LiaBatteryQuarterSolid, LiaBatteryEmptySolid } from "react-icons/lia";
import { useState, useEffect } from 'react';
import { BiSignal5 } from "react-icons/bi";
import { IoWifiOutline } from "react-icons/io5";
import Nav from '@/components/nav';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const AniPhone = () => {
    const [backgroundImage, setBackgroundImage] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [showHomeScreen, setShowHomeScreen] = useState(false);
    const router = useRouter();
    const [AniOS, setAniOS] = useState('1.0');
    const [batteryScreen, setBatteryScreen] = useState("100");
    const [isSignal, setIsSignal] = useState(false);
    const [hasWifi, setHasWifi] = useState(false);

    useEffect(() => {
        if (window.localStorage.getItem('AniOS') === null) {
            window.localStorage.setItem('AniOS', '1.0');
            window.localStorage.setItem('ROM', '250');
            window.localStorage.setItem('RAM', '100');
            window.localStorage.setItem('ROMused', '233');
        }
        else {
            setAniOS(window.localStorage.getItem('AniOS') || '1.0');
        }
        setBatteryScreen(window.localStorage.getItem('batteryPercentage') || "100");
        if (window.localStorage.getItem('wifiPlanId')) {
            setHasWifi(true);
        }
        if (window.localStorage.getItem('phoneNumber')) {
            setIsSignal(true);
        }
        const fetchBackgroundImage = async () => {
            setIsLoading(true);
            // Check if an image URL is already stored in sessionStorage
            const storedImageUrl = window.sessionStorage.getItem('backgroundImageUrl');

            if (storedImageUrl) {
                setBackgroundImage(storedImageUrl);
                setIsLoading(false);
                setShowHomeScreen(true);
            } else {
                try {
                    const response = await fetch('https://api.waifu.im/search?is_nsfw=false');
                    if (!response.ok) {
                        throw new Error('Request failed with status code: ' + response.status);
                    }
                    const data = await response.json();
                    if (data.images && data.images.length > 0) {
                        const image = data.images[0];
                        setBackgroundImage(image.url);
                        // Store the image URL in sessionStorage
                        window.sessionStorage.setItem('backgroundImageUrl', image.url);
                        // Tạo một Image object để đảm bảo ảnh đã tải xong
                        const img = document.createElement('img');
                        img.onload = () => setIsLoading(false);
                        img.src = image.url;
                    } else {
                        throw new Error('No suitable image found');
                    }
                } catch (error) {
                    console.error('An error occurred:', error);
                    setIsLoading(false);
                }
            }
        };

        fetchBackgroundImage();
    }, []);

    const getBatteryIcon = () => {
        const iconClass = Number(batteryScreen) <= 20 ? 'text-red-500' : '';
        if (Number(batteryScreen) > 75) return <LiaBatteryFullSolid className={`mr-1 mt-[2px] text-2xl ${iconClass}`} />;
        if (Number(batteryScreen) > 50) return <LiaBatteryThreeQuartersSolid className={`mr-1 mt-[2px] text-2xl ${iconClass}`} />;
        if (Number(batteryScreen) > 25) return <LiaBatteryHalfSolid className={`mr-1 mt-[2px] text-2xl ${iconClass}`} />;
        if (Number(batteryScreen) > 10) return <LiaBatteryQuarterSolid className={`mr-1 mt-[2px] text-2xl ${iconClass}`} />;
        return <LiaBatteryEmptySolid className={`mr-1 mt-[2px] text-2xl ${iconClass}`} />;
    };

    // Thêm hàm xử lý click
    const handleScreenClick = () => {
        if (!isLoading) {
            setShowHomeScreen(true);
        }
    };

    if (isLoading) {
        return (
            <div className="bg-black h-screen flex items-center justify-center">
                <h1 className="text-white font-[600] text-4xl">AniPhone</h1>
            </div>
        );
    }

    return (
        <div
            className="h-screen w-full bg-cover bg-center"
            style={{ backgroundImage: `url(${backgroundImage})` }}
            onClick={handleScreenClick} // Thêm sự kiện click
        >
            {!showHomeScreen ? (
                <>
                    <div className='flex justify-between items-center text-white mx-4 pt-1'>
                        <div className='flex items-center'>

                        </div>
                        <div className='flex items-center'>
                            {hasWifi && (
                                <IoWifiOutline className='mr-1 text-xl' />
                            )}
                            {isSignal && (
                                <BiSignal5 className='mr-1 text-xl' />
                            )}
                            {getBatteryIcon()}
                            <span className={Number(batteryScreen) <= 20 ? 'text-red-500' : ''}>{batteryScreen}%</span>
                        </div>
                    </div>
                    <div className='mt-14 flex flex-col items-center text-white mx-4'>
                        <div className='text-4xl font-bold'>
                            {new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })}
                        </div>
                        <div className='text-xl'>
                            {new Date().toLocaleDateString('vi-VN', { weekday: 'long', day: '2-digit', month: '2-digit', year: 'numeric' })}
                        </div>
                    </div>
                </>
            ) : (
                <>
                    <Nav />
                    <div className='absolute bottom-12 left-4 flex flex-row items-start text-white text-md font-[500] gap-8'>
                        <div className='flex flex-col items-center cursor-pointer w-14'>
                            <Image src="/setting.webp" alt="Settings" width={56} height={56}
                                className='rounded-xl'
                                onClick={() => router.push('/AniPhone/setting')}
                            />
                            <span className='text-center truncate'>Cài đặt</span>
                        </div>
                        {parseFloat(AniOS) >= 1.1 &&
                            <div className='flex flex-col items-center cursor-pointer w-14'>
                                <Image src="/mes.webp" alt="Message" width={56} height={56}
                                    className='rounded-xl'
                                    onClick={() => router.push('/AniPhone/mes')}
                                />
                                <span className='text-center truncate'>Tin nhắn</span>
                            </div>
                        }
                        {parseFloat(AniOS) >= 1.2 &&
                            <div className='flex flex-col items-center cursor-pointer w-14'>
                                <Image src="/browser.webp" alt="Browser" width={56} height={56}
                                    className='rounded-xl'
                                    onClick={() => router.push('/AniPhone/browser')}
                                />
                                <span className='text-center truncate'>Trình duyệt</span>
                            </div>
                        }
                    </div>
                </>
            )}
        </div>
    );
};

export default AniPhone;
