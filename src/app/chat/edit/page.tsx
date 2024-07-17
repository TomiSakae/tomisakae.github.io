// components/Live2DModel.tsx
'use client'
import { useEffect, useState } from 'react';
import Script from 'next/script';
import * as PIXI from 'pixi.js';
import { useRouter } from 'next/navigation';
import { AiOutlineClose } from 'react-icons/ai';

declare global {
    interface Window {
        PIXI: typeof PIXI;
    }
}

const Live2DModelComponent = () => {
    const router = useRouter();
    const [isLive2DScriptLoaded, setIsLive2DScriptLoaded] = useState(false);
    const [scaleModel, setScaleModel] = useState(0.1);

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
            (model as any).y = innerHeight * 0.09;
            (model as any).position.x = -125;
            (model as any).scale.set(scaleModel);
            (model as any).interactive = true;
            (model as any).trackedPointers = {};
            draggable(model);
        };

        loadLive2DModel();
    }, [isLive2DScriptLoaded, scaleModel]);

    const upScale = () => {
        setScaleModel(parseFloat((scaleModel + 0.01).toFixed(2)));
        window.localStorage.setItem('scale', String(scaleModel));
    }

    const downScale = () => {
        setScaleModel(parseFloat((scaleModel - 0.01).toFixed(2)));
        window.localStorage.setItem('scale', String(scaleModel));
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
                <div className="fixed top-4 right-4 opacity-50">
                    <AiOutlineClose
                        className="text-xl text-white cursor-pointer"
                        onClick={() => {
                            router.back();
                            setTimeout(() => {
                                window.location.reload();
                            }, 100);
                        }}
                    />
                </div>
                <div className="fixed top-4 items-center opacity-50 right-4 mx-8 p-2 bg-gray-800 rounded-md flex space-x-2">
                    <button className="bg-green-500 text-white px-2 py-1 rounded" onClick={upScale}>+</button>
                    <div className="text-white font-bold">{scaleModel}</div>
                    <button className="bg-red-500 text-white px-2 py-1 rounded" onClick={downScale}>-</button>
                </div>
            </div >
        </>
    );
};

export default Live2DModelComponent;
