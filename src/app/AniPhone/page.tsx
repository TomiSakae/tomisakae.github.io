'use client'
import { useState, useEffect } from 'react';
import { LiaBatteryFullSolid } from "react-icons/lia";
import { FaRegSquare } from "react-icons/fa6";
import { CiMenuBurger } from "react-icons/ci";
import { RiPlayReverseLargeLine } from "react-icons/ri";
import Image from 'next/image';

const AniPhone = () => {
    const [backgroundImage, setBackgroundImage] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    // Thêm state mới
    const [showHomeScreen, setShowHomeScreen] = useState(false);

    useEffect(() => {
        const fetchBackgroundImage = async () => {
            setIsLoading(true);
            try {
                const response = await fetch('https://api.waifu.im/search?is_nsfw=false');
                if (!response.ok) {
                    throw new Error('Request failed with status code: ' + response.status);
                }
                const data = await response.json();
                if (data.images && data.images.length > 0) {
                    const image = data.images[0];
                    setBackgroundImage(image.url);
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
        };

        fetchBackgroundImage();
    }, []);

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
                            <LiaBatteryFullSolid className='mr-1 mt-[2px] text-2xl' />
                            <span className=''>100%</span>
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
                    <div className='flex justify-between items-center text-black mx-4 pt-1'>
                        <div className='flex items-center'>
                            <div className='text-md'>
                                {new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })}
                            </div>
                        </div>
                        <div className='flex items-center'>
                            <LiaBatteryFullSolid className='mr-1 mt-[2px] text-2xl' />
                            <span className=''>100%</span>
                        </div>
                    </div>
                    <div className='absolute bottom-0 left-0 right-0 flex justify-between items-center text-white pb-1 mx-6'>
                        <div className='flex-1 flex justify-center p-2 rounded-full hover:bg-gray-200 hover:bg-opacity-20 transition-all duration-300'>
                            <div className='flex flex-col items-center'>
                                <CiMenuBurger className='text-md' />
                            </div>
                        </div>
                        <div className='flex-1 flex justify-center p-2 rounded-full hover:bg-gray-200 hover:bg-opacity-20 transition-all duration-300'>
                            <div className='flex flex-col items-center'>
                                <FaRegSquare className='text-md' />
                            </div>
                        </div>
                        <div className='flex-1 flex justify-center p-2 rounded-full hover:bg-gray-200 hover:bg-opacity-20 transition-all duration-300'>
                            <div className='flex flex-col items-center'>
                                <RiPlayReverseLargeLine className='text-lg' />
                            </div>
                        </div>
                    </div>
                    <div className='absolute bottom-12 left-4 right-4 flex flex-row items-end text-white text-md font-[500] justify-between'>
                        <div className='flex flex-col items-center cursor-pointer'>
                            <Image src="/AniPhone/setting.png" alt="Settings" width={64} height={64} />
                            <span>Cài đặt</span>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default AniPhone;
