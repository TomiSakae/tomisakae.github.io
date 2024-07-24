// components/Live2DModel.tsx
'use client'
import { useEffect, useState, useRef } from 'react';
import Script from 'next/script';
import * as PIXI from 'pixi.js';
import { motion } from "framer-motion";
import { FaEdit } from "react-icons/fa";
import { useRouter } from 'next/navigation';
import { FaExchangeAlt } from "react-icons/fa";
import { Live2d } from '../../../components/Live2D';
import { MdOutlineChangeCircle } from "react-icons/md";
import { AiOutlineClose } from 'react-icons/ai';
import modelData from "../../../components/Live2D";
import Image from 'next/image';
import { CiPlay1 } from "react-icons/ci";
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';

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
    const [isChangeCharacter, setIsChangeCharacter] = useState(false);
    const [isLoadedLive2d, setIsLoadedLive2d] = useState(false);
    const [isOpacityOpen, setIsOpacityOpen] = useState(false);
    const [motions, setMotions] = useState<string[]>([]);
    const [isPlayOpen, setIsPlayOpen] = useState(false);

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
            setIsLoadedLive2d(true);
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

    const toggleChangeCharacter = () => {
        setIsChangeCharacter(true);
        setIsOpacityOpen(true);
    };

    const closeChangeCharacter = () => {
        setIsChangeCharacter(false);
        setIsOpacityOpen(false);
    };

    const setPlayMotions = (title: string) => {
        setIsPlayOpen(false);
        (modelRef as any).current.motion(title);
    }

    const resetPage = () => {
        window.localStorage.removeItem('modely');
        window.localStorage.removeItem('modelx');
        window.localStorage.removeItem('scale');
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
            <canvas id="canvas" className={`${isOpacityOpen ? 'opacity-50' : ''}`} />
            {isPlayOpen &&
                <div className={`fixed flex justify-center bg-[#333333] items-center text-sm bottom-[2.5em] left-[50%] w-[100%] transform -translate-x-1/2 py-2 px-4 text-white ${isOpacityOpen ? 'opacity-50' : ''}`}>
                    <Swiper
                        modules={[Autoplay]}
                        slidesPerView={2}
                        className="text-center"
                        loop={true}
                        autoplay={{
                            delay: 1500,
                        }}
                    >
                        {motions.map((title, index) => (
                            <SwiperSlide key={index}>
                                <button
                                    className="px-1 w-[75%] py-1 text-xs rounded-lg font-bold bg-white text-black" onClick={() => setPlayMotions(title)}>{title}</button>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            }
            <div className={`fixed flex justify-end bg-[#333333] items-center  text-sm bottom-0 left-[50%] w-[100%] transform -translate-x-1/2 py-2 px-4 text-white ${isOpacityOpen ? 'opacity-50' : ''}`}>
                <CiPlay1
                    className="text-xl font-bold cursor-pointer me-5"
                    onClick={() => {
                        setIsPlayOpen((prev) => !prev);
                    }}
                />
                <MdOutlineChangeCircle className="text-xl font-bold cursor-pointer me-5" onClick={toggleChangeCharacter} />
                <FaExchangeAlt className="text-lg font-bold cursor-pointer me-5"
                    onClick={() => {
                        router.back();
                        window.sessionStorage.setItem('reload', 'true');
                    }} />
                <FaEdit className="text-lg font-bold cursor-pointer" onClick={() => {
                    router.push("/chat/edit");
                    window.sessionStorage.setItem('reload', 'true');
                }} />
            </div>
            {isChangeCharacter && (
                <div className={`fixed top-4 bottom-[10vh] h-[88vh] left-4 right-4 bg-[#333333] rounded-lg p-4 ${isChangeCharacter === true ? 'z-30' : '-z-30'}`}>
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="font-bold text-lg text-white">Đổi Nhân Vật</h2>
                        <AiOutlineClose className="text-xl text-white cursor-pointer" onClick={closeChangeCharacter} />
                    </div>
                    <div className="h-[90%] overflow-auto">
                        <div className='grid grid-cols-2'>
                            {modelData.models.map((model: any) => (
                                model.img &&
                                <div key={model.modelid}>
                                    <div className='border rounded-t-2xl mx-1 my-2'>
                                        <p className='bg-white text-center text-sm font-[600] rounded-t-2xl p-1'>{model.modelname}</p>
                                        <Image
                                            src={model.img}
                                            alt={model.modelname}
                                            width={192}
                                            height={256}
                                            className="h-auto bg-white cursor-pointer"
                                            onClick={() => {
                                                window.localStorage.setItem('model', model.model);
                                                window.localStorage.setItem('modelname', model.modelname);
                                                window.localStorage.setItem('modelid', model.modelid);
                                                resetPage();
                                            }}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Live2DModelComponent;
