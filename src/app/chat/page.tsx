// components/Live2DModel.tsx
'use client'
import { useEffect, useState } from 'react';
import Script from 'next/script';
import * as PIXI from 'pixi.js';
import { generateChatResponse } from '@/components/GeminiAPI';
import { IoMdSend } from 'react-icons/io';
import { motion } from "framer-motion";
import { TypeAnimation } from 'react-type-animation';

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
            let chatHistory = JSON.parse(window.localStorage.getItem('chatHistory') || '[]');
            if (chatHistory) {
                setOutputText(chatHistory[chatHistory.length - 1].parts[0].text);
            }
            else {
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

            setIsChangeType(false);
            setInputText('');

        }
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
                    z-index: -1;
                }
                .gradient-background {
                    background: rgba(3, 122, 222, 0.5) linear-gradient(to bottom right, rgba(3, 122, 222, 0.5), rgba(3, 229, 183, 0.5));
                }
            `}</style>
            <canvas id="canvas" />
            <div className="fixed gradient-background text-sm bottom-[8em] z-5 left-[50%] w-[95%] transform -translate-x-1/2 rounded-lg pt-2 pb-2 px-2 text-white">
                <div className="px-2 font-bold">
                    {outputText ? (
                        <h6>HMS Abercrombie (F109)</h6>
                    ) : (
                        <h6>User</h6>
                    )}
                </div>
                <div className="bg-white font-[500] rounded-lg h-[7em] mt-2 text-black py-2 px-4 relative overflow-auto">
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
                                <TypeAnimation
                                    sequence={[outputText
                                    ]}
                                    wrapper="span"
                                    speed={50}
                                    cursor={false}
                                    style={{ fontSize: '14px', display: 'inline-block' }}
                                />
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
                            className="fixed bottom-4 right-4 text-xl text-gray-500 cursor-pointer"
                            onClick={isTyping ? handleSend : handleToggleInput}
                        />
                    ) : (<span></span>)}
                </div>
            </div>
        </>
    );
};

export default Live2DModelComponent;
