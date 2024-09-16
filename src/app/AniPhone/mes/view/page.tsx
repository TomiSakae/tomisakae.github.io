'use client'

import { useState, useEffect, useRef } from 'react';
import Nav from '@/components/nav';
import { FaArrowLeftLong } from "react-icons/fa6";
import { useRouter } from 'next/navigation';
import { IoMdSend } from "react-icons/io";

const MessageViewPage = () => {
    const router = useRouter();
    const [messages, setMessages] = useState([
        { id: 1, sender: 'Người lạ', content: 'Cần giúp giải quyết vài vấn đề!', timestamp: new Date() },
    ]);
    const [idMessage, setIdMessage] = useState(0);
    const [money, setMoney] = useState(0);

    const [newMessage, setNewMessage] = useState('');
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSendMessage = () => {
        if (newMessage.trim()) {
            const userMessage = { id: messages.length + 1, sender: 'Bạn', content: newMessage, timestamp: new Date() };
            setMessages([...messages, userMessage]);
            setNewMessage('');

            switch (idMessage) {
                case 0:
                    setTimeout(() => {
                        const responseMessage1 = { id: messages.length + 2, sender: 'Người lạ', content: 'Hãy giúp tôi giải quyết bài toán sau và tôi sẽ chuyển cho bạn 5.000 đ.', timestamp: new Date() };
                        setMessages(prevMessages => [...prevMessages, responseMessage1]);
                    }, 1000);

                    setTimeout(() => {
                        const responseMessage2 = { id: messages.length + 3, sender: 'Người lạ', content: '1+1=?', timestamp: new Date() };
                        setMessages(prevMessages => [...prevMessages, responseMessage2]);
                    }, 2000);
                    setIdMessage(idMessage + 1);
                    break;
                case 1:
                    if (newMessage.trim() === '2') {
                        setTimeout(() => {
                            const responseMessage1 = { id: messages.length + 2, sender: 'Người lạ', content: 'Chúa ơi! Tôi đã giải được bài toán rồi! Đây là 5.000 đ cho bạn.', timestamp: new Date() };
                            setMessages(prevMessages => [...prevMessages, responseMessage1]);
                            setMoney(money + 5000);
                        }, 1000);
                        setIdMessage(idMessage + 1);
                    }
                    else {
                        setTimeout(() => {
                            const responseMessage1 = { id: messages.length + 2, sender: 'Người lạ', content: 'Đừng trả lời linh tinh nữa!', timestamp: new Date() };
                            setMessages(prevMessages => [...prevMessages, responseMessage1]);
                        }, 1000);
                    }
                    break;
                default:
                    break;
            }
        }
    };

    return (
        <div className="h-screen bg-black text-white flex flex-col">
            <Nav />
            <div className="p-4 flex items-center border-b border-gray-700">
                <FaArrowLeftLong className='text-xl cursor-pointer mr-4' onClick={() => router.back()} />
                <h1 className="text-xl font-semibold">Người lạ</h1>
            </div>
            <div className="flex-grow overflow-y-auto p-4 space-y-4">
                <div className="h-full overflow-y-auto">
                    {messages.map((message) => (
                        <div key={message.id} className={`flex ${message.sender === 'Bạn' ? 'justify-end' : 'justify-start'} mb-4`}>
                            <div className={`max-w-[70%] p-3 rounded-lg ${message.sender === 'Bạn' ? 'bg-blue-500' : 'bg-gray-700'}`}>
                                <p className="break-words">{message.content}</p>
                                <p className="text-xs text-gray-300 mt-1">
                                    {message.timestamp.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })}
                                </p>
                            </div>
                        </div>
                    ))}
                    <div ref={messagesEndRef} />
                </div>
            </div>
            {money !== 0 ? (
                <div className="p-4 border-t border-gray-700 mb-8 text-center">
                    <p className="text-green-500 font-semibold">Bạn đã nhận được 5.000 đ</p>
                    <p className="text-gray-400 mt-2">Cuộc trò chuyện đã kết thúc</p>
                </div>
            ) : (
                <div className="p-4 border-t border-gray-700 mb-8">
                    <div className="flex items-center">
                        <input
                            type="text"
                            value={newMessage}
                            onChange={(e) => setNewMessage(e.target.value)}
                            placeholder="Nhập tin nhắn..."
                            className="flex-grow bg-gray-800 text-white p-2 rounded-lg focus:outline-none"
                        />
                        <button
                            onClick={handleSendMessage}
                            className="bg-blue-500 text-white p-2 rounded-lg ml-2"
                        >
                            <IoMdSend className='text-2xl' />
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MessageViewPage;
