// components/Live2DModel.tsx
'use client'
import { useEffect, useState } from 'react';
import Script from 'next/script';
import * as PIXI from 'pixi.js';

declare global {
    interface Window {
        PIXI: typeof PIXI;
    }
}

const Live2DModelComponent = () => {
    const [isLive2DScriptLoaded, setIsLive2DScriptLoaded] = useState(false);

    useEffect(() => {
        window.PIXI = PIXI;
        const app = new PIXI.Application({
            view: document.getElementById('canvas') as HTMLCanvasElement,
            autoStart: true,
            resizeTo: window,
        });

        const loadLive2DModel = async () => {
            // Cấu hình PixiJS

            const { Live2DModel } = await import('pixi-live2d-display');

            const model = await Live2DModel.from('https://cdn.jsdelivr.net/gh/Eikanya/Live2d-model/%E7%A2%A7%E8%93%9D%E8%88%AA%E7%BA%BF%20Azue%20Lane/Azue%20Lane(JP)/abeikelongbi_3/abeikelongbi_3.model3.json');

            app.stage.addChild(model as unknown as PIXI.DisplayObject); // Chuyển kiểu về DisplayObject
            (model as any).y = innerHeight * 0.25;
            (model as any).x = innerWidth * 0.1;
            (model as any).scale.set(0.05); // Cast về any để tránh lỗi TypeScript
            // Cấu hình mô hình
            (model as any).interactive = true;
            (model as any).trackedPointers = {}; // Đảm bảo thuộc tính trackedPointers được khởi tạo
        };

        loadLive2DModel();
    }, [isLive2DScriptLoaded]);
    return (
        <>
            <Script
                src="https://cubism.live2d.com/sdk-web/cubismcore/live2dcubismcore.min.js"
                strategy="beforeInteractive"
                onLoad={() => setIsLive2DScriptLoaded(true)}
            />
            <Script
                src="https://cdn.jsdelivr.net/gh/dylanNew/live2d/webgl/Live2D/lib/live2d.min.js"
                strategy="beforeInteractive"
                onLoad={() => setIsLive2DScriptLoaded(true)}
            />
            <canvas id="canvas" />
        </>
    );
};

export default Live2DModelComponent;
