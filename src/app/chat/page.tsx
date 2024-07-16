// components/Live2DModel.tsx
'use client'
import { useEffect, useState } from 'react';
import Script from 'next/script';
import * as PIXI from 'pixi.js';
import { generateChatResponse } from '@/components/GeminiAPI';
import { IoMdSend } from 'react-icons/io';
import { motion } from "framer-motion";
import { TypeAnimation } from 'react-type-animation';
import { MdHistory } from "react-icons/md";
import { AiOutlineClose } from 'react-icons/ai';

declare global {
    interface Window {
        PIXI: typeof PIXI;
    }
}

const Live2DModelComponent = () => {
    const [isLive2DScriptLoaded, setIsLive2DScriptLoaded] = useState(false);
    const [inputText, setInputText] = useState('');
    const [outputText, setOutputText] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const [isChangeType, setIsChangeType] = useState(false);
    const [textAnimation, setTextAnimation] = useState<string[]>([]);
    const [isHistoryOpen, setIsHistoryOpen] = useState(false);
    const [chatHistory, setChatHistory] = useState<any[]>([]);

    useEffect(() => {
        window.PIXI = PIXI;
        const app = new PIXI.Application({
            view: document.getElementById('canvas') as HTMLCanvasElement,
            autoStart: true,
            resizeTo: window,
            backgroundAlpha: 0,
        });

        const loadLive2DModel = async () => {
            const { Live2DModel } = await import('pixi-live2d-display');
            const model = await Live2DModel.from('/live2d/models/abeikelongbi_3/abeikelongbi_3.model3.json');
            let storedChatHistory = JSON.parse(window.localStorage.getItem('chatHistory') || '[]');
            setChatHistory(storedChatHistory);
            if (storedChatHistory.length > 0) {
                setOutputText(storedChatHistory[storedChatHistory.length - 1].parts[0].text);
            } else {
                setOutputText("Nhấn vào nút gửi để nhập tin nhắn!");
            }
            app.stage.addChild(model as unknown as PIXI.DisplayObject);
            (model as any).y = innerHeight * 0.09;
            (model as any).position.x = -125;
            (model as any).scale.set(0.1);
            (model as any).interactive = true;
            (model as any).trackedPointers = {};
        };

        loadLive2DModel();
    }, [isLive2DScriptLoaded]);

    const handleToggleInput = () => {
        setIsTyping((prev) => !prev);
        setInputText('');
        setOutputText('');
    };

    const handleSend = async () => {
        if (inputText.trim() !== '') {
            setIsChangeType(true);
            setOutputText('...');
            setTextAnimation('...'.split('')); // Hiển thị hiệu ứng với "..."
            setIsTyping(false);
            const response = await generateChatResponse(inputText);
            setOutputText(response);

            // Thêm phần tử mới với chuỗi người dùng nhập vào
            let newUserEntry = { parts: [{ text: inputText }], role: "user" };
            let updatedChatHistory = [...chatHistory, newUserEntry];

            // Thêm phần tử mới với phản hồi của model
            let newModelEntry = { parts: [{ text: response }], role: "model" };
            updatedChatHistory = [...updatedChatHistory, newModelEntry];
            setChatHistory(updatedChatHistory);
            setIsChangeType(false);
            setInputText('');
        }
    };

    const toggleHistory = () => {
        setIsHistoryOpen((prev) => !prev);
    };

    const closeHistory = () => {
        setIsHistoryOpen(false);
    };

    return (
        <>
            <Script
                src="/live2d/core/live2dcubismcore.min.js"
                strategy="beforeInteractive"
                onLoad={() => setIsLive2DScriptLoaded(true)}
            />
            <Script
                src="/live2d/core/live2d.min.js"
                strategy="beforeInteractive"
                onLoad={() => setIsLive2DScriptLoaded(true)}
            />

            <style jsx global>{`
                #canvas {
                    background-image: url('/background1.avif');
                    background-size: cover;
                    background-position: center;
                    background-repeat: no-repeat;
                }
                .gradient-background {
                    background: rgba(3, 122, 222, 0.5) linear-gradient(to bottom right, rgba(3, 122, 222, 0.5), rgba(3, 229, 183, 0.5));
                }
            `}</style>
            <canvas id="canvas" className={`${isHistoryOpen ? 'opacity-50' : ''} ${isHistoryOpen === false ? 'z-30' : ''}`} />
            <div className={`fixed inset-0 ${isHistoryOpen ? 'opacity-50' : ''}`}>
                <div className="fixed gradient-background text-sm bottom-[8em] z-10 left-[50%] w-[95%] transform -translate-x-1/2 rounded-lg pt-2 pb-2 px-2 text-white">
                    <div className="px-2 font-bold">
                        {outputText ? (
                            <h6>HMS Abercrombie (F109)</h6>
                        ) : (
                            <h6>User</h6>
                        )}
                    </div>
                    <div className="bg-[#333333] font-[500] rounded-lg h-[7em] mt-2 text-white py-2 px-4 relative overflow-auto">
                        {outputText ? (
                            outputText === "..." ? (
                                <div className="mb-4">
                                    {textAnimation.map((el, i) => (
                                        <motion.span
                                            className="text-2xl"
                                            initial={{ y: 0, opacity: 0, }}
                                            animate={{ y: [-5, 0], opacity: 1 }}
                                            transition={{
                                                duration: 0.75,
                                                delay: i / 10,
                                                repeat: Infinity,
                                            }}
                                            key={i}
                                        >
                                            {el}
                                        </motion.span>
                                    ))}
                                </div>
                            ) : (
                                <div className="mb-4">
                                    {/* <TypeAnimation
                                        sequence={[outputText
                                        ]}
                                        wrapper="span"
                                        speed={50}
                                        cursor={false}
                                        style={{ fontSize: `clamp(14px, 2vw, 16px)`, display: 'inline-block' }}
                                    /> */}
                                    <span>{outputText}</span>
                                </div>
                            )
                        ) : (
                            <textarea
                                className={`w-full h-full bg-transparent resize-none outline-none ${isTyping ? 'block' : 'hidden'}`}
                                placeholder="Nhập nội dung vào đây..."
                                value={inputText}
                                onChange={(e) => setInputText(e.target.value)}
                            />
                        )}
                        {isChangeType === false ? (
                            <IoMdSend
                                className="text-white fixed bottom-4 right-4 text-xl cursor-pointer"
                                onClick={isTyping ? handleSend : handleToggleInput}
                            />
                        ) : (<span></span>)}
                    </div>
                </div>
                <div className="fixed flex justify-end gradient-background text-sm bottom-[5em] z-10 left-[50%] w-[95%] transform -translate-x-1/2 rounded-lg py-2 px-4 text-white">
                    <MdHistory className="text-xl font-bold cursor-pointer" onClick={toggleHistory} />
                </div>
            </div>
            {isHistoryOpen && (
                <div className={`fixed top-4 bottom-[3.4em] left-4 right-4 bg-[#333333] rounded-lg p-4 z-20`}>
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="font-bold text-white">Lịch Sử Chat</h2>
                        <AiOutlineClose className="text-xl text-white cursor-pointer" onClick={closeHistory} />
                    </div>
                    <div className="h-[calc(100vh-12em)] overflow-y-auto flex flex-col-reverse">
                        {chatHistory.slice().reverse().map((entry, index) => (
                            <div key={index} className={`mb-2 flex flex-col px-6 ${entry.role === "model" ? "text-start" : "text-end"}`}>
                                <div className="font-bold mb-2 text-sm text-[#666666]">{entry.role === "model" ? "HMS Abercrombie (F109)" : "User"}</div>
                                <div className={`p-3 rounded-lg inline-block w-fit mb-4 ${entry.role === "model" ? "bg-[#404040] text-white" : "bg-[#d5f594] ml-auto text-black"} max-w-xs`}>
                                    <div className="text-sm">{entry.parts[0].text}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </>
    );
};

export default Live2DModelComponent;
