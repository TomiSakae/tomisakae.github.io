// components/Live2DModel.tsx
'use client'
import { useEffect, useState } from 'react';
import Script from 'next/script';
import * as PIXI from 'pixi.js';
import { generateChatResponse } from '@/components/GeminiAPI';
import { motion } from "framer-motion";
import { TypeAnimation } from 'react-type-animation';
import { FaEdit } from "react-icons/fa";
import { useRouter } from 'next/navigation';
import { FaExchangeAlt } from "react-icons/fa";

declare global {
    interface Window {
        PIXI: typeof PIXI;
    }
}

const Live2DModelComponent = () => {
    const router = useRouter();
    const [isLive2DScriptLoaded, setIsLive2DScriptLoaded] = useState(false);
    const [outputText, setOutputText] = useState('');
    const [textAnimation, setTextAnimation] = useState<string[]>([]);

    useEffect(() => {
        window.PIXI = PIXI;
        const app = new PIXI.Application({
            view: document.getElementById('canvas') as HTMLCanvasElement,
            autoStart: true,
            resizeTo: window,
            backgroundAlpha: 0,
            antialias: true,
        });

        const loadLive2DModel = async () => {
            const { Live2DModel, MotionPreloadStrategy } = await import('pixi-live2d-display');
            const model = await Live2DModel.from('/live2d/models/abeikelongbi_3_hx/abeikelongbi_3_hx.model3.json', { motionPreload: MotionPreloadStrategy.ALL });
            app.stage.addChild(model as unknown as PIXI.DisplayObject);
            (model as any).y = window.localStorage.getItem('modely') || innerHeight * 0.09;
            (model as any).position.x = window.localStorage.getItem('modelx') || -125;
            (model as any).scale.set(window.localStorage.getItem('scale') || 0.1);
            (model as any).interactive = true;
            (model as any).trackedPointers = {};

        };

        loadLive2DModel();
    }, [isLive2DScriptLoaded]);

    useEffect(() => {
        if (window.sessionStorage.getItem('reload') == 'true') {
            window.sessionStorage.setItem('reload', 'false');
            window.location.reload();
        }
        window.sessionStorage.setItem('reload', 'false');
    }, [])

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
                    <h6>HMS Abercrombie (F109)</h6>
                </div>
                <div className="bg-[#333333] font-[500] rounded-lg h-[7.2em] mt-2 text-white py-2 px-4 relative overflow-auto">
                    {outputText === "..." ? (
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
                                style={{ fontSize: "14px", display: 'inline-block' }}
                            />
                        </div>
                    )}
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
        </>
    );
};

export default Live2DModelComponent;
