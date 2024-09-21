'use client'

import { useState, useRef, useEffect } from 'react';
import Nav from '@/components/nav';
import { FaArrowLeftLong } from "react-icons/fa6";
import { useRouter } from 'next/navigation';

const AdminMessagePage = () => {
    const router = useRouter();
    const [messages] = useState([
        { content: "Dưới đây là các tên miền giúp kiếm tiền nhanh chóng: ", time: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }) },
        { content: "1. aniw://doctruyenkiemtien.ani", time: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }) },
    ]);

    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    return (
        <div className="h-screen bg-black text-white flex flex-col">
            <Nav />
            <div className="p-4 flex items-center border-b border-gray-700">
                <FaArrowLeftLong
                    className="text-xl cursor-pointer mr-4"
                    onClick={() => router.push('/AniPhone/mes')}
                />
                <h1 className="text-xl font-semibold">Admin</h1>
            </div>
            <div className="flex-grow overflow-y-auto p-4 space-y-4">
                <div className="h-full overflow-y-auto">
                    {messages.map((message, index) => (
                        <div key={index} className="flex justify-start mb-4">
                            <div className="max-w-[70%] p-3 rounded-lg bg-gray-700">
                                <p className="break-words">{message.content}</p>
                                <p className="text-xs text-gray-300 mt-1">{message.time}</p>
                            </div>
                        </div>
                    ))}
                    <div ref={messagesEndRef} />
                </div>
            </div>
            <div className="p-4 border-t border-gray-700 mb-8">
                <div className="bg-gray-800 rounded-lg p-3 text-center text-gray-400">
                    Bạn không thể trả lời tin nhắn từ Admin
                </div>
            </div>
        </div>
    );
};

export default AdminMessagePage;
