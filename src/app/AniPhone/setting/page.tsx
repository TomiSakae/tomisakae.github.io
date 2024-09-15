'use client'

import Nav from '@/components/nav';
import { useRouter } from 'next/navigation';
import { IoIosArrowForward } from "react-icons/io";
import { LuSmartphone } from "react-icons/lu";

const SettingsPage = () => {
    const router = useRouter();

    const handleDeviceInfo = () => {
        router.push('/AniPhone/setting/device-info');
    };

    return (
        <div className="h-screen bg-black text-white">
            <Nav />
            <div className="p-4">
                <div className="flex items-center mb-6">
                    <h1 className="text-3xl font-[600] mx-2">Cài đặt</h1>
                </div>
                <div className="p-4 hover:bg-gray-800 rounded-lg transition-all duration-300">
                    <div
                        className="flex justify-between items-center cursor-pointer"
                        onClick={handleDeviceInfo}
                    >
                        <div className="flex items-center gap-2">
                            <div className="bg-[#2fca4b] rounded-full p-2">
                                <LuSmartphone className="text-lg text-white" />
                            </div>
                            <span className="text-xl ml-2">Giới thiệu về thiết bị</span>
                        </div>
                        <IoIosArrowForward className="text-lg" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SettingsPage;
