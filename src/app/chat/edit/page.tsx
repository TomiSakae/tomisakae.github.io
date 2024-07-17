// components/Live2DModel.tsx
'use client'
import { useEffect, useState } from 'react';
import Script from 'next/script';
import * as PIXI from 'pixi.js';
import { useRouter } from 'next/navigation';
import { AiOutlineClose } from 'react-icons/ai';
import { GrPowerReset } from "react-icons/gr";
import { CiSettings } from "react-icons/ci";

declare global {
    interface Window {
        PIXI: typeof PIXI;
    }
}

const Live2DModelComponent = () => {
    const router = useRouter();
    const [isLive2DScriptLoaded, setIsLive2DScriptLoaded] = useState(false);
    const [scaleModel, setScaleModel] = useState(0.1);
    const [isSettingOpen, setIsSettingOpen] = useState(false);

    useEffect(() => {
        window.PIXI = PIXI;
        const app = new PIXI.Application({
            view: document.getElementById('canvas') as HTMLCanvasElement,
            autoStart: true,
            resizeTo: window,
            backgroundAlpha: 0,
            antialias: true,
        });

        const draggable = (model: any) => {
            model.buttonMode = true;
            model.on("pointerdown", (e: any) => {
                model.dragging = true;
                model._pointerX = e.data.global.x - model.x;
                model._pointerY = e.data.global.y - model.y;
            });
            model.on("pointermove", (e: any) => {
                if (model.dragging) {
                    model.position.x = e.data.global.x - model._pointerX;
                    model.position.y = e.data.global.y - model._pointerY;
                    window.localStorage.setItem('modelx', model.position.x);
                    window.localStorage.setItem('modely', model.position.y);
                }
            });
            model.on("pointerupoutside", () => (model.dragging = false));
            model.on("pointerup", () => (model.dragging = false));
        }

        const loadLive2DModel = async () => {
            const { Live2DModel } = await import('pixi-live2d-display');
            const model = await Live2DModel.from('/live2d/models/abeikelongbi_3/abeikelongbi_3.model3.json');
            app.stage.addChild(model as unknown as PIXI.DisplayObject);
            (model as any).y = window.localStorage.getItem('modely') || innerHeight * 0.09;
            (model as any).position.x = window.localStorage.getItem('modelx') || -125;
            (model as any).scale.set(scaleModel || 0.1);
            (model as any).interactive = true;
            (model as any).trackedPointers = {};
            draggable(model);
        };

        loadLive2DModel();
    }, [isLive2DScriptLoaded, scaleModel]);

    useEffect(() => {
        setScaleModel(Number(window.localStorage.getItem('scale')) || 0.1);
    }, [])


    const upScale = () => {
        setScaleModel(parseFloat((scaleModel + 0.01).toFixed(2)));
    }

    const downScale = () => {
        setScaleModel(parseFloat((scaleModel - 0.01).toFixed(2)));
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
            `}</style>
            <canvas id="canvas" />
            <div className="relative">
                <div className="fixed flex flex-col justify-center items-center top-4 right-4 opacity-50">
                    <div className="">
                        <AiOutlineClose
                            className="text-xl text-white cursor-pointer"
                            onClick={() => {
                                window.localStorage.setItem('scale', String(scaleModel));
                                router.back();
                                setTimeout(() => {
                                    window.location.reload();
                                }, 100);
                            }}
                        />
                    </div>
                    <div className="mt-6">
                        <GrPowerReset
                            className="text-xl text-white cursor-pointer"
                            onClick={() => {
                                window.localStorage.removeItem('modely');
                                window.localStorage.removeItem('modelx');
                                window.localStorage.removeItem('scale');
                                setScaleModel(0.1);
                            }}
                        />
                    </div>
                    <div className="mt-6">
                        <CiSettings
                            className="text-xl font-bold text-white cursor-pointer"
                            onClick={() => {
                                setIsSettingOpen(true);
                            }}
                        />
                    </div>
                </div>
                <div className="fixed top-4 items-center opacity-50 right-4 mx-8 p-2 bg-gray-800 rounded-md flex space-x-2">
                    <button className="bg-green-500 text-white px-2 py-1 rounded" onClick={upScale}>+</button>
                    <div className="text-white font-bold">{scaleModel}</div>
                    <button className="bg-red-500 text-white px-2 py-1 rounded" onClick={downScale}>-</button>
                </div>
            </div>
            {isSettingOpen && (
                <div className={`fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-[#333333] rounded-lg p-4 w-[90%] max-w-[600px] ${isSettingOpen === true ? 'z-30' : '-z-30'}`}>
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="font-bold text-lg text-white">Cài Đặt Live2D</h2>
                        <AiOutlineClose className="text-xl text-white cursor-pointer" onClick={() => { setIsSettingOpen(false) }} />
                    </div>
                    <h4 className="text-center font-bold text-lg text-white">Đổi ảnh nền</h4>
                    <div className="overflow-x-auto flex justify-center">
                        <p className="text-white py-5">Đang Cập Nhật...</p>
                    </div>
                    <h4 className="text-center font-bold text-lg text-white mt-5">Đổi Live2D</h4>
                    <div className="overflow-x-auto flex justify-center">
                        <p className="text-white py-5">Đang Cập Nhật...</p>
                    </div>
                </div>
            )}
        </>
    );
};

export default Live2DModelComponent;
