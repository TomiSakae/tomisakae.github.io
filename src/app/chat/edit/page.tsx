// components/Live2DModel.tsx
'use client'
import { useEffect, useState, useRef } from 'react';
import Script from 'next/script';
import * as PIXI from 'pixi.js';
import { useRouter } from 'next/navigation';
import { AiOutlineClose } from 'react-icons/ai';
import { GrPowerReset } from "react-icons/gr";
import { CiSettings } from "react-icons/ci";
import { Live2d } from '../../../components/Live2D';
import { CiPlay1 } from "react-icons/ci";

type Motion = {
    File: string;
};

type Motions = {
    [key: string]: Motion[];
};

type JsonData = {
    Version: number;
    Name: string;
    FileReferences: {
        Moc: string;
        Textures: string[];
        DisplayInfo: null | string;
        Physics: string;
        Motions: Motions;
        Expressions: any[];
    };
    Groups: {
        Target: string;
        Name: string;
        Ids: string[];
    }[];
};

declare global {
    interface Window {
        PIXI: typeof PIXI;
    }
}

const Live2DModelComponent = () => {
    const router = useRouter();
    const modelRef = useRef(null);  // Khai báo một biến tham chiếu useRef
    const [isLive2DScriptLoaded, setIsLive2DScriptLoaded] = useState(false);
    const [scaleModel, setScaleModel] = useState(0.1);
    const [isSettingOpen, setIsSettingOpen] = useState(false);
    const [isPlayOpen, setIsPlayOpen] = useState(false);
    const [motions, setMotions] = useState<string[]>([]);

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
            const { Live2DModel, MotionPreloadStrategy } = await import('pixi-live2d-display');
            const model = await Live2DModel.from(window.localStorage.getItem('model') || '/live2d/models/abeikelongbi_3_hx/abeikelongbi_3_hx.model3.json', { motionPreload: MotionPreloadStrategy.ALL });
            const res = await fetch(window.localStorage.getItem('model') || '/live2d/models/abeikelongbi_3_hx/abeikelongbi_3_hx.model3.json');
            const jsonData: JsonData = await res.json();
            const motionTitles = Object.keys(jsonData.FileReferences.Motions);
            setMotions(motionTitles);
            app.stage.addChild(model as unknown as PIXI.DisplayObject);
            const id = parseInt(window.localStorage.getItem('modelid') || '1', 10);
            const { setX, setY, setScale } = Live2d(id);
            (model as any).position.y = window.localStorage.getItem('modely') || setY;
            (model as any).position.x = window.localStorage.getItem('modelx') || setX;
            (model as any).scale.set(window.localStorage.getItem('scale') || setScale);
            (model as any).interactive = true;
            (model as any).trackedPointers = {};
            (modelRef as any).current = model;
            draggable(model);
        };

        loadLive2DModel();
    }, [isLive2DScriptLoaded]);

    useEffect(() => {
        setScaleModel(Number(window.localStorage.getItem('scale')) || 0.1);
    }, []);

    const upScale = () => {
        (modelRef as any).current.scale.set(parseFloat((scaleModel + 0.01).toFixed(2)));
        setScaleModel(parseFloat((scaleModel + 0.01).toFixed(2)));
    }

    const downScale = () => {
        (modelRef as any).current.scale.set(parseFloat((scaleModel - 0.01).toFixed(2)));
        setScaleModel(parseFloat((scaleModel - 0.01).toFixed(2)));
    }

    const setPlayMotions = (title: string) => {
        setIsPlayOpen(false);
        (modelRef as any).current.motion(title);
    }

    const changeModel = (id: number) => {
        let location: string;
        let name: string;
        switch (id) {
            case 1:
                location = '/live2d/models/abeikelongbi_3_hx/abeikelongbi_3_hx.model3.json';
                name = 'HMS Abercrombie (F109)';
                break;
            case 2:
                location = '/live2d/models/adaerbote_2/adaerbote_2.model3.json';
                name = 'KMS Prinz Adalbert';
                break;
            default:
                location = ''; // Hoặc bạn có thể đặt một giá trị mặc định khác nếu cần
                name = '';
                break;
        }
        window.localStorage.setItem('model', location);
        window.localStorage.setItem('modelname', name);
        window.localStorage.setItem('modelid', String(id));
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
                                window.sessionStorage.setItem('reload', 'true');
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
                                (modelRef as any).current.scale.set(0.1);
                                window.location.reload();
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
                    <div className="mt-6">
                        <CiPlay1
                            className="text-xl font-bold text-white cursor-pointer"
                            onClick={() => {
                                setIsPlayOpen(true);
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
                    <div className="overflow-auto h-[30vh] mt-4 mb-4 text-center">
                        <button
                            className="px-4 py-2 rounded-2xl mt-3 mx-2 bg-white text-black"
                            onClick={() => {
                                changeModel(1);
                            }}
                        >
                            abeikelongbi_3_hx
                        </button>
                        <button
                            className="px-4 py-2 rounded-2xl mt-3 mx-2 bg-white text-black"
                            onClick={() => {
                                changeModel(2);
                            }}
                        >
                            adaerbote_2
                        </button>
                        <button
                            className="px-4 py-2 rounded-2xl mt-3 mx-2 bg-white text-black"
                            onClick={() => {
                                changeModel(1);
                            }}
                        >
                            abeikelongbi_3_hx
                        </button>
                        <button
                            className="px-4 py-2 rounded-2xl mt-3 mx-2 bg-white text-black"
                            onClick={() => {
                                changeModel(1);
                            }}
                        >
                            abeikelongbi_3_hx
                        </button>
                        <button
                            className="px-4 py-2 rounded-2xl mt-3 mx-2 bg-white text-black"
                            onClick={() => {
                                changeModel(1);
                            }}
                        >
                            abeikelongbi_3_hx
                        </button>
                    </div>
                </div>
            )}
            {isPlayOpen && (
                <div className="fixed top-[20vh] overflow-auto right-0 bg-[#333333] h-1/2 rounded-2xl">
                    <div className="flex flex-col px-1 justify-center items-center">
                        <AiOutlineClose
                            className="text-lg text-white mt-2 mb-2 text-center cursor-pointer"
                            onClick={() => setIsPlayOpen(false)}
                        />
                        {motions.map((title, index) => (
                            <button
                                key={index}
                                className="px-1 py-1 text-xs rounded-lg mb-2 font-bold bg-white text-black" onClick={() => setPlayMotions(title)}>{title}</button>
                        ))}
                    </div>
                </div>
            )}
        </>
    );
};

export default Live2DModelComponent;
