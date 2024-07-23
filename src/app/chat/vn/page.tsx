// components/Live2DModel.tsx
'use client'
import { useEffect, useState, useRef } from 'react';
import Script from 'next/script';
import * as PIXI from 'pixi.js';
import { generateChatResponse } from '@/components/GeminiAPIVN';
import { motion } from "framer-motion";
import { TypeAnimation } from 'react-type-animation';
import { FaEdit } from "react-icons/fa";
import { useRouter } from 'next/navigation';
import { FaExchangeAlt } from "react-icons/fa";
import { GrPowerReset } from "react-icons/gr";
import { Live2d } from '../../../components/Live2D';

declare global {
    interface Window {
        PIXI: typeof PIXI;
    }
}

const Live2DModelComponent = () => {
    const router = useRouter();
    const modelRef = useRef(null);  // Khai báo một biến tham chiếu useRef
    const [isLive2DScriptLoaded, setIsLive2DScriptLoaded] = useState(false);
    const [outputText, setOutputText] = useState('');
    const [isTypeDone, setIsTypeDone] = useState(false);
    const [textAnimation, setTextAnimation] = useState<string[]>([]);
    const [optionsVN, setOptionsVN] = useState<any[]>([]);
    const [modelName, setModelName] = useState('');

    useEffect(() => {
        window.PIXI = PIXI;
        const devicePixelRatio = window.devicePixelRatio || 1;
        const scaleFactor = 1.0; // Adjust this value as needed
        PIXI.GRAPHICS_CURVES.adaptive = false;
        PIXI.settings.ANISOTROPIC_LEVEL = 0;
        PIXI.settings.RESOLUTION = devicePixelRatio;
        PIXI.settings.ROUND_PIXELS = true;
        const app = new PIXI.Application({
            view: document.getElementById('canvas') as HTMLCanvasElement,
            width: window.innerWidth * scaleFactor,
            height: window.innerHeight * scaleFactor,
            autoStart: true,
            resizeTo: window,
            antialias: true,
            autoDensity: true,
            resolution: devicePixelRatio,
            powerPreference: 'high-performance',
            backgroundAlpha: 0,
        });

        const loadLive2DModel = async () => {
            const { Live2DModel, MotionPreloadStrategy } = await import('pixi-live2d-display');
            const model = await Live2DModel.from(window.localStorage.getItem('model') || '/live2d/models/abeikelongbi_3_hx/abeikelongbi_3_hx.model3.json', { motionPreload: MotionPreloadStrategy.ALL });
            app.stage.addChild(model as unknown as PIXI.DisplayObject);
            const id = parseInt(window.localStorage.getItem('modelid') || '1', 10);
            const { setX, setY, setScale } = Live2d(id);
            (model as any).position.y = window.localStorage.getItem('modely') || setY;
            (model as any).position.x = window.localStorage.getItem('modelx') || setX;
            (model as any).scale.set(window.localStorage.getItem('scale') || setScale);
            (model as any).interactive = true;
            (model as any).trackedPointers = {};
            setModelName(window.localStorage.getItem('modelname') || 'HMS Abercrombie (F109)');
            // Gán giá trị model vào biến tham chiếu useRef
            (modelRef as any).current = model;

            (model as any).on("hit", (hitAreas: any) => {
                if (hitAreas.includes("TouchSpecial")) {
                    (model as any).motion("TapTouchSpecial");
                }

                if (hitAreas.includes("TouchHead")) {
                    (model as any).motion("TapTouchHead");
                }
                if (hitAreas.includes("TouchBody")) {
                    (model as any).motion("TapTouchBody");
                }
                if (hitAreas.includes("Face")) {
                    (model as any).motion("TapFace");
                }
                if (hitAreas.includes("panci")) {
                    (model as any).motion("Tappanci");
                }
                if (hitAreas.includes("damuzi")) {
                    (model as any).motion("Tapdamuzi");
                }
            });
        };

        loadLive2DModel();
    }, [isLive2DScriptLoaded]);

    useEffect(() => {
        if (window.sessionStorage.getItem('reload') == 'true') {
            window.sessionStorage.setItem('reload', 'false');
            window.location.reload();
        }
        window.sessionStorage.setItem('reload', 'false');
    }, []);

    useEffect(() => {
        const ChatVN = async () => {
            if (window.localStorage.getItem('chatVNHistory')) {
                let storedChatVNHistory = JSON.parse(window.localStorage.getItem('chatVNHistory') || '[]');
                if (storedChatVNHistory.length > 0) {
                    const text = JSON.parse(storedChatVNHistory[storedChatVNHistory.length - 1].parts[0].text);
                    setOutputText(text.text);
                    setOptionsVN(text.options);
                } else {
                    setOutputText("Nhấn vào nút gửi để nhập tin nhắn!");
                }
            } else {
                setOutputText('...');
                setTextAnimation('...'.split('')); // Hiển thị hiệu ứng với "..."
                setIsTypeDone(false);
                const response = await generateChatResponse("new");
                const text = JSON.parse(response);
                setOutputText(text.text);
                setOptionsVN(text.options);
            }
        }
        if (window.sessionStorage.getItem('reload') == 'false') {
            ChatVN();
        }
    }, []);

    const ChooseVN = async (option: string) => {
        (modelRef as any).current.motion('Animation');
        setOutputText('...');
        setTextAnimation('...'.split('')); // Hiển thị hiệu ứng với "..."
        setIsTypeDone(false);
        const response = await generateChatResponse(option);
        const text = JSON.parse(response);
        setOutputText(text.text);
        setOptionsVN(text.options);
    }

    const resetVN = async () => {
        window.localStorage.removeItem('chatVNHistory');
        window.location.reload();
    }

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
            <canvas id="canvas" />
            <div className="fixed gradient-background text-sm bottom-[8em] left-[50%] w-[95%] transform -translate-x-1/2 rounded-lg pt-2 pb-2 px-2 text-white">
                <div className="px-2 font-bold">
                    <h6>{modelName}</h6>
                </div>
                <GrPowerReset
                    className="text-white fixed bottom-[5.84em] z-10 right-4 text-xl cursor-pointer" onClick={resetVN}
                />
                <div className="bg-[#333333] font-[500] rounded-lg h-[7.2em] mt-2 text-white py-2 px-4 relative overflow-auto">
                    {outputText && (
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
                                        , () => {
                                            setIsTypeDone(true);
                                        },]}
                                    wrapper="span"
                                    speed={50}
                                    cursor={false}
                                    style={{ fontSize: "14px", display: 'inline-block' }}
                                />
                            </div>
                        ))}
                </div>
            </div>
            <div className="fixed flex justify-end items-center gradient-background text-sm bottom-[5.2em] left-[50%] w-[95%] transform -translate-x-1/2 rounded-lg py-2 px-4 text-white">
                <FaExchangeAlt className="text-lg font-bold cursor-pointer me-5"
                    onClick={() => {
                        router.back();
                        window.sessionStorage.setItem('reload', 'true');
                    }} />
                <FaEdit className="text-lg font-bold cursor-pointer" onClick={() => router.push("/chat/edit")} />
            </div>
            {isTypeDone && (
                <div className={`fixed top-1/2 text-[0.8em] bottom-[4em] left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-4 w-[90%] max-w-[600px] ${isTypeDone === true ? 'z-30' : '-z-30'}`}>
                    <div className="text-center text-white font-bold bg-[#333333] px-4 py-3 rounded-lg items-center mb-4 cursor-pointer" onClick={() => { ChooseVN("1") }}>
                        {optionsVN[1].replace(/^"|"$/g, '')}
                    </div>
                    <div className="text-center text-white font-bold bg-[#333333] px-4 py-3 rounded-lg items-center mb-4 cursor-pointer" onClick={() => { ChooseVN("2") }}>
                        {optionsVN[2].replace(/^"|"$/g, '')}
                    </div>
                    <div className="text-center text-white font-bold bg-[#333333] px-4 py-3 rounded-lg items-center mb-4 cursor-pointer" onClick={() => { ChooseVN("3") }}>
                        {optionsVN[3].replace(/^"|"$/g, '')}
                    </div>
                </div>
            )}
        </>
    );
};

export default Live2DModelComponent;
