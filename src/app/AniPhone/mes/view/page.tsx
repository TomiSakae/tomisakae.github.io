'use client'

import { useState, useEffect, useRef, Suspense } from 'react';
import Nav from '@/components/nav';
import { FaArrowLeftLong } from "react-icons/fa6";
import { useRouter, useSearchParams } from 'next/navigation';
import { IoMdSend } from "react-icons/io";

interface Message {
    id: number;
    sender: string;
    content: string;
    timestamp: Date;
}

const MessageContent = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const id = searchParams.get('id');
    const [messages, setMessages] = useState<Message[]>([]);
    const [idMessage, setIdMessage] = useState(0);
    const [money, setMoney] = useState(0);

    const [newMessage, setNewMessage] = useState('');
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const [currentAnswer, setCurrentAnswer] = useState('');
    const [passwordChallenge, setPasswordChallenge] = useState('');

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        switch (id) {
            case '0':
                setMessages([
                    { id: 1, sender: 'Người lạ', content: 'Bạn hãy giúp tôi giải quyết bài toán sau: ', timestamp: new Date() },
                ]);
                break;
            case '1':
                setMessages([
                    { id: 1, sender: 'Người lạ', content: 'Bạn hãy giúp tôi đặt mật khẩu với điều kiện sau: ', timestamp: new Date() },
                ]);
                break;
        }
    }, [id]);

    useEffect(() => {
        if (id === '1') {
            const challenges = [
                'Mật khẩu phải có ít nhất 8 ký tự.',
                'Mật khẩu phải có ít nhất một chữ hoa.',
                'Mật khẩu phải có ít nhất một ký tự đặc biệt (!@#$%^&*(),.?":{}|<>).'
            ];
            const randomChallenge = challenges[Math.floor(Math.random() * challenges.length)];
            setPasswordChallenge(randomChallenge);
        }
    }, [id]);

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const generateMathProblem = () => {
        const operators = ['+', '-', '*', '/'];
        const num1 = Math.floor(Math.random() * 90) + 10; // Random number between 10-99
        const num2 = Math.floor(Math.random() * 90) + 10; // Random number between 10-99
        const operator = operators[Math.floor(Math.random() * operators.length)];

        let problem = `${num1} ${operator} ${num2}`;
        let answer;

        switch (operator) {
            case '+':
                answer = num1 + num2;
                break;
            case '-':
                answer = num1 - num2;
                break;
            case '*':
                answer = num1 * num2;
                break;
            case '/':
                // Ensure division results in a whole number
                answer = num1;
                problem = `${num1 * num2} ${operator} ${num2}`;
                break;
        }

        return { problem, answer: answer?.toString() };
    };

    const handleSendMessage = () => {
        if (newMessage.trim()) {
            const userMessage = { id: messages.length + 1, sender: 'Bạn', content: newMessage, timestamp: new Date() };
            setMessages([...messages, userMessage]);
            setNewMessage('');

            switch (id) {
                case '0':
                    switch (idMessage) {
                        case 0:
                            const { problem, answer } = generateMathProblem();
                            setTimeout(() => {
                                const responseMessage2 = { id: messages.length + 3, sender: 'Người lạ', content: `${problem} = ?`, timestamp: new Date() };
                                setMessages(prevMessages => [...prevMessages, responseMessage2]);
                            }, 1000);
                            setIdMessage(idMessage + 1);
                            setCurrentAnswer(answer || '');
                            break;
                        case 1:
                            if (newMessage.trim() === currentAnswer) {
                                setTimeout(() => {
                                    const responseMessage1 = { id: messages.length + 2, sender: 'Người lạ', content: 'Chúa ơi! Bạn đã giải đúng bài toán rồi! Đây là 5.000 đ cho bạn.', timestamp: new Date() };
                                    setMessages(prevMessages => [...prevMessages, responseMessage1]);
                                    setMoney(money + 5000);
                                    if (typeof window !== 'undefined') {
                                        window.sessionStorage.setItem('mes', 'true');
                                        const currentBalance = parseInt(window.localStorage.getItem('balance') || '0', 10);
                                        window.localStorage.setItem('balance', (currentBalance + 5000).toString());
                                    }
                                }, 1000);
                                setIdMessage(idMessage + 1);
                            } else {
                                setTimeout(() => {
                                    const responseMessage1 = { id: messages.length + 2, sender: 'Người lạ', content: 'Rất tiếc, câu trả lời của bạn chưa chính xác. Hãy thử lại!', timestamp: new Date() };
                                    setMessages(prevMessages => [...prevMessages, responseMessage1]);
                                }, 1000);
                            }
                            break;
                        default:
                            break;
                    }
                    break;

                case '1':
                    switch (idMessage) {
                        case 0:
                            setTimeout(() => {
                                const responseMessage2 = { id: messages.length + 3, sender: 'Người lạ', content: `${passwordChallenge}`, timestamp: new Date() };
                                setMessages(prevMessages => [...prevMessages, responseMessage2]);
                            }, 1000);
                            setIdMessage(idMessage + 1);
                            break;
                        case 1:
                            const isValidPassword = (password: string) => {
                                switch (passwordChallenge) {
                                    case 'Mật khẩu phải có ít nhất 8 ký tự.':
                                        return password.length >= 8;
                                    case 'Mật khẩu phải có ít nhất một chữ hoa.':
                                        return /[A-Z]/.test(password);
                                    case 'Mật khẩu phải có ít nhất một ký tự đặc biệt (!@#$%^&*(),.?":{}|<>).':
                                        return /[!@#$%^&*(),.?":{}|<>]/.test(password);
                                    default:
                                        return false;
                                }
                            };

                            if (isValidPassword(newMessage.trim())) {
                                setTimeout(() => {
                                    const responseMessage1 = { id: messages.length + 2, sender: 'Người lạ', content: 'Tuyệt vời! Mật khẩu của bạn đáp ứng yêu cầu. Đây là 5.000 đ cho bạn.', timestamp: new Date() };
                                    setMessages(prevMessages => [...prevMessages, responseMessage1]);
                                    setMoney(money + 5000);
                                    if (typeof window !== 'undefined') {
                                        window.sessionStorage.setItem('mes', 'true');
                                        const currentBalance = parseInt(window.localStorage.getItem('balance') || '0', 10);
                                        window.localStorage.setItem('balance', (currentBalance + 5000).toString());
                                    }
                                }, 1000);
                                setIdMessage(idMessage + 1);
                            } else {
                                setTimeout(() => {
                                    const responseMessage1 = { id: messages.length + 2, sender: 'Người lạ', content: `Mật khẩu chưa đáp ứng yêu cầu. Hãy thử lại!`, timestamp: new Date() };
                                    setMessages(prevMessages => [...prevMessages, responseMessage1]);
                                }, 1000);
                            }
                            break;
                        default:
                            break;
                    }
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

const MessageViewPage = () => {
    return (
        <Suspense>
            <MessageContent />
        </Suspense>
    );
};

export default MessageViewPage;
