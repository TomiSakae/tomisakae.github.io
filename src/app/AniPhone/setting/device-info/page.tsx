'use client'

import { useState } from 'react';
import Nav from '@/components/nav';
import { FaArrowLeftLong } from "react-icons/fa6";
import { useRouter } from 'next/navigation';

const DeviceInfoPage = () => {
    const router = useRouter();
    const [showUpdateModal, setShowUpdateModal] = useState(false);

    const handleUpdate = () => {
        setShowUpdateModal(true);
    };

    const closeModal = () => {
        setShowUpdateModal(false);
    };

    return (
        <div className="h-screen bg-black text-white px-4">
            <Nav />
            <div className="p-4">
                <div className="flex items-center">
                    <FaArrowLeftLong className='text-xl cursor-pointer'
                        onClick={() => router.back()}
                    />
                    <h1 className="text-xl font-[600] mx-4">Giới thiệu về thiết bị</h1>
                </div>
            </div>
            <div className="bg-[#1a1a1a] p-4 rounded-xl my-4">
                <h2 className="text-lg font-[500]">Phiên Bản</h2>
                <p className="text-md text-gray-300">AniOS 1.0</p>
                <button
                    className="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition duration-300"
                    onClick={handleUpdate}
                >
                    Cập Nhật
                </button>
            </div>
            <div className="flex justify-between gap-4">
                <div className="bg-[#1a1a1a] p-4 rounded-xl my-4 flex-1">
                    <h2 className="text-lg font-[500]">Tên thiết bị</h2>
                    <p className="text-sm text-gray-300">AniPhone</p>
                </div>
                <div className="bg-[#1a1a1a] p-4 rounded-xl my-4 flex-1">
                    <h2 className="text-lg font-[500]">Bộ nhớ</h2>
                    <p className="text-sm text-gray-300">Đã sử dụng</p>
                    <p className="text-sm text-gray-300">233 MB/250 MB</p>
                </div>
            </div>
            <div className="flex justify-between gap-4">
                <div className="bg-[#1a1a1a] p-4 rounded-xl my-4 flex-1">
                    <h2 className="text-lg font-[500]">Bộ xử lý</h2>
                    <p className="text-sm text-gray-300">AniCore 1</p>
                </div>
                <div className="bg-[#1a1a1a] p-4 rounded-xl my-4 flex-1">
                    <h2 className="text-lg font-[500]">RAM</h2>
                    <p className="text-sm text-gray-300">100 MB</p>
                </div>
            </div>

            {showUpdateModal && (
                <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center mx-4">
                    <div className="bg-[#1a1a1a] p-8 rounded-2xl shadow-lg max-w-md w-full">
                        <h2 className="text-2xl font-bold mb-6 text-center">Cập Nhật Phần Mềm</h2>
                        <p className="mb-4 text-lg font-semibold">Phiên bản AniOS 1.1:</p>
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
                        <div className="flex justify-center space-x-4">
                            <button
                                className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-3 px-6 rounded-full transition duration-300"
                                onClick={closeModal}
                            >
                                Hủy
                            </button>
                            <button
                                className="bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 px-6 rounded-full transition duration-300"
                                onClick={closeModal}
                            >
                                Xác nhận
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DeviceInfoPage;
