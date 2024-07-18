'use client'
import { CiSearch } from "react-icons/ci";
import { useEffect, useState, useRef } from 'react';
import { GoArrowLeft } from "react-icons/go";
import { AiOutlineClose } from 'react-icons/ai';
import Image from 'next/image';

const VTube = () => {
    const [isShowSearch, setIsShowSearch] = useState(false);
    const [inputValue, setInputValue] = useState('');
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


    return (
        <div className="flex flex-col bg-[#0f0f0f] pb-12 text-white">
            <header className="fixed top-0 left-0 w-full bg-[#0f0f0f] px-4 py-2">
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
                                className="resize-none overflow-x-auto text-sm border-none px-2 h-full rounded-2xl bg-[#333333] focus:outline-none text-white pr-16 leading-tight whitespace-nowrap" // Thêm padding phải để không che mất chữ
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
                <div className="grid grid-cols-1 gap-4">
                    {/* Danh sách video */}
                    {Array.from({ length: 10 }).map((_, index) => (
                        <div key={index} className="mx-[6vw] mb-6">
                            <div className="h-[44vw] bg-gray-800 rounded-xl mb-3"></div>
                            <div className="flex">
                                <Image
                                    src="/tomisakae.jpg"
                                    alt="TomiSakae"
                                    width={33}
                                    height={33}
                                    className="rounded-full w-[33px] h-[33px] mx-2"
                                />
                                <div className="flex flex-col ml-2 w-[80%]">
                                    <h6 className="text-md font-[600] mb-1">Tiêu Đề Video</h6>
                                    <p className="text-sm text-[#AAAAA0] font-[500] flex items-center">
                                        TomiSakae
                                    </p>
                                    <p className="text-sm text-[#AAAAA0] font-[500] flex items-center">
                                        10 N lượt xem <span className="mx-1">•</span> 1 ngày trước
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    )
}

export default VTube;
