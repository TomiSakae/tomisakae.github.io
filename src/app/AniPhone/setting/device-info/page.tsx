'use client'

import { useState, useEffect } from 'react';
import Nav from '@/components/nav';
import { FaArrowLeftLong } from "react-icons/fa6";
import { useRouter } from 'next/navigation';

const DeviceInfoPage = () => {
    const router = useRouter();
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const [isUpdating, setIsUpdating] = useState(false);
    const [isUpdateComplete, setIsUpdateComplete] = useState(false);
    const [AniOS, setAniOS] = useState("1.0");
    const [textAniOS, setTextAniOS] = useState("Đang kiểm tra phiên bản...");
    const [ROM, setROM] = useState("250");
    const [textROM, setTextROM] = useState("Đang kiểm tra...");
    const [RAM, setRAM] = useState("100");
    const [textRAM, setTextRAM] = useState("Đang kiểm tra...");
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const handleDeleteData = () => {
        setShowDeleteModal(false);
        if (typeof window !== 'undefined') {
            window.localStorage.clear();
            window.sessionStorage.clear();
            router.push('/');
        }
    };

    const startUpdate = () => {
        setIsUpdating(true);
        setTimeout(() => {
            setIsUpdating(false);
            setIsUpdateComplete(true);
        }, 3000);
    };

    const handleRestart = () => {
        if (typeof window !== 'undefined') {
            window.sessionStorage.removeItem('backgroundImageUrl');
            switch (AniOS) {
                case '1.0':
                    window.localStorage.setItem('AniOS', '1.1');
                    window.localStorage.setItem('ROM', '350');
                    window.localStorage.setItem('RAM', '150');
                    break;

                default:
                    break;
            }
        }
        router.push('/AniPhone');
    };

    const handleUpdate = () => {
        if (AniOS === '1.0') {
            setShowUpdateModal(true);
        }
    };

    const closeModal = () => {
        setShowUpdateModal(false);
    };

    useEffect(() => {
        setAniOS(window.localStorage.getItem('AniOS') || '1.0');
        setROM(window.localStorage.getItem('ROM') || '250');
        setRAM(window.localStorage.getItem('RAM') || '100');
    }, []);

    useEffect(() => {
        setTextAniOS(`AniOS ${AniOS}`);
        setTextROM(`233 MB/${ROM} MB`);
        setTextRAM(`${RAM} MB`);
    }, [AniOS, ROM, RAM]);

    return (
        <div className="h-screen bg-black text-white">
            <Nav />
            <div className="p-4 mx-4">
                <div className="flex items-center">
                    <FaArrowLeftLong className='text-xl cursor-pointer'
                        onClick={() => router.back()}
                    />
                    <h1 className="text-xl font-[600] mx-4">Giới thiệu về thiết bị</h1>
                </div>
            </div>
            <div className="bg-[#1a1a1a] p-4 rounded-xl my-4 mx-4">
                <h2 className="text-lg font-[500]">Phiên Bản</h2>
                <p className="text-md text-gray-300">{textAniOS}</p>
                <button
                    className="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-xl transition duration-300"
                    onClick={handleUpdate}
                >
                    Cập Nhật
                </button>
            </div>
            <div className="flex justify-between gap-4 mx-4">
                <div className="bg-[#1a1a1a] p-4 rounded-xl my-4 flex-1">
                    <h2 className="text-lg font-[500]">Tên thiết bị</h2>
                    <p className="text-sm text-gray-300">AniPhone</p>
                </div>
                <div className="bg-[#1a1a1a] p-4 rounded-xl my-4 flex-1">
                    <h2 className="text-lg font-[500]">Bộ nhớ</h2>
                    <p className="text-sm text-gray-300">Đã sử dụng</p>
                    <p className="text-sm text-gray-300">{textROM}</p>
                </div>
            </div>
            <div className="flex justify-between gap-4 mx-4">
                <div className="bg-[#1a1a1a] p-4 rounded-xl my-4 flex-1">
                    <h2 className="text-lg font-[500]">Bộ xử lý</h2>
                    <p className="text-sm text-gray-300">AniCore 1</p>
                </div>
                <div className="bg-[#1a1a1a] p-4 rounded-xl my-4 flex-1">
                    <h2 className="text-lg font-[500]">RAM</h2>
                    <p className="text-sm text-gray-300">{textRAM}</p>
                </div>
            </div>
            <div className="bg-[#1a1a1a] p-4 rounded-xl my-4 mx-4">
                <h2 className="text-lg font-[500] mb-2">Xóa dữ liệu</h2>
                <button
                    className="bg-red-500 hover:bg-red-600 rounded-xl text-white font-bold py-2 px-4 transition duration-300"
                    onClick={() => setShowDeleteModal(true)}
                >
                    Xóa tất cả dữ liệu
                </button>
            </div>
            {showDeleteModal && (
                <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center mx-4">
                    <div className="bg-[#1a1a1a] p-8 rounded-2xl shadow-lg max-w-md w-full">
                        <h2 className="text-2xl font-bold mb-6 text-center">Xác nhận xóa dữ liệu</h2>
                        <p className="mb-6 text-lg text-center">Bạn có chắc chắn muốn xóa tất cả dữ liệu không?</p>
                        <div className="flex justify-center space-x-4">
                            <button
                                className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-3 px-6 rounded-full transition duration-300"
                                onClick={() => setShowDeleteModal(false)}
                            >
                                Hủy
                            </button>
                            <button
                                className="bg-red-600 hover:bg-red-500 text-white font-bold py-3 px-6 rounded-full transition duration-300"
                                onClick={handleDeleteData}
                            >
                                Xác nhận
                            </button>
                        </div>
                    </div>
                </div>
            )}
            {showUpdateModal && (
                <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center mx-4">
                    <div className="bg-[#1a1a1a] p-8 rounded-2xl shadow-lg max-w-md w-full">
                        <h2 className="text-2xl font-bold mb-6 text-center">Cập Nhật Phần Mềm</h2>
                        {!isUpdating && !isUpdateComplete ? (
                            <p className="mb-4 text-lg font-semibold">Phiên bản AniOS 1.1:</p>
                        ) : (
                            <p className="mb-4 text-lg font-semibold text-center">Phiên bản AniOS 1.1</p>
                        )}
                        {!isUpdating && !isUpdateComplete && (
                            <>
                                <ul className="mb-6 text-sm space-y-2">
                                    <li className="flex items-center">
                                        <span className="mr-2 text-green-500">✓</span>
                                        Thêm hệ thống số dư
                                    </li>
                                    <li className="flex items-center">
                                        <span className="mr-2 text-green-500">✓</span>
                                        Thêm ứng dụng AniChat
                                    </li>
                                    <li className="flex items-center">
                                        <span className="mr-2 text-green-500">✓</span>
                                        Thêm hệ thống AniSim
                                    </li>
                                    <li className="flex items-center">
                                        <span className="mr-2 text-green-500">✓</span>
                                        Tăng thêm 100 MB dung lượng
                                    </li>
                                    <li className="flex items-center">
                                        <span className="mr-2 text-green-500">✓</span>
                                        Tăng thêm 50 MB RAM
                                    </li>
                                </ul>
                                <p className="mb-6 text-lg font-bold text-center text-green-500">Phí cập nhật: 0đ</p>
                            </>
                        )}
                        <div className="flex justify-center space-x-4">
                            {!isUpdating && !isUpdateComplete && (
                                <>
                                    <button
                                        className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-3 px-6 rounded-full transition duration-300"
                                        onClick={closeModal}
                                    >
                                        Hủy
                                    </button>
                                    <button
                                        className="bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 px-6 rounded-full transition duration-300"
                                        onClick={startUpdate}
                                    >
                                        Xác nhận
                                    </button>
                                </>
                            )}
                            {isUpdating && (
                                <div className="text-center">
                                    <p className="mb-4">Đang cập nhật...</p>
                                    <div className="w-12 h-12 border-t-4 border-blue-500 border-solid rounded-full animate-spin mx-auto"></div>
                                </div>
                            )}
                            {isUpdateComplete && (
                                <div className="text-center">
                                    <p className="mb-4 text-green-500 font-bold">Cập nhật thành công!</p>
                                    <button
                                        className="bg-green-600 hover:bg-green-500 text-white font-bold py-3 px-6 rounded-full transition duration-300"
                                        onClick={handleRestart}
                                    >
                                        Khởi động lại
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DeviceInfoPage;
