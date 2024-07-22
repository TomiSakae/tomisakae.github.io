// components/Live2DModel.tsx
'use client'
import { useEffect, useState } from 'react';
import Script from 'next/script';
import * as PIXI from 'pixi.js';
import { useRouter } from 'next/navigation';
import { AiOutlineClose } from 'react-icons/ai';
import { Live2d } from '../../../../components/Live2D';

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

        const loadLive2DModel = async () => {
            const { Live2DModel, MotionPreloadStrategy } = await import('pixi-live2d-display');
            const model = await Live2DModel.from(window.localStorage.getItem('model') || '/live2d/models/abeikelongbi_3_hx/abeikelongbi_3_hx.model3.json', { idleMotionGroup: 'Animation' });
            app.stage.addChild(model as unknown as PIXI.DisplayObject);
            const id = parseInt(window.localStorage.getItem('modelid') || '1', 10);
            const { setX, setY, setScale } = Live2d(id);
            (model as any).position.y = window.localStorage.getItem('modely') || setY;
            (model as any).position.x = window.localStorage.getItem('modelx') || setX;
            (model as any).scale.set(window.localStorage.getItem('scale') || setScale);
            setScaleModel(Number(window.localStorage.getItem('scale')) || setScale);
            (model as any).interactive = true;
            (model as any).trackedPointers = {};

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
                                router.back();
                            }}
                        />
                    </div>
                </div>
            </div>
        </>
    );
};

export default Live2DModelComponent;
