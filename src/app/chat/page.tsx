// components/Live2DModel.tsx
'use client'
import { useEffect, useState } from 'react';
import Script from 'next/script';
import * as PIXI from 'pixi.js';
import { generateChatResponse } from '@/components/GeminiAPI';
declare global {
    interface Window {
        PIXI: typeof PIXI;
    }
}

const Live2DModelComponent = () => {
    const [isLive2DScriptLoaded, setIsLive2DScriptLoaded] = useState(false);
    const TestGemini = async () => {
        console.log(await generateChatResponse("có gì không?"));
    }
    useEffect(() => {
        window.PIXI = PIXI;
        const app = new PIXI.Application({
            view: document.getElementById('canvas') as HTMLCanvasElement,
            autoStart: true,
            resizeTo: window,
            backgroundAlpha: 0,
        });

        const loadLive2DModel = async () => {
            // Cấu hình PixiJS

            const { Live2DModel } = await import('pixi-live2d-display');

            const model = await Live2DModel.from('https://cdn.jsdelivr.net/gh/Eikanya/Live2d-model/%E7%A2%A7%E8%93%9D%E8%88%AA%E7%BA%BF%20Azue%20Lane/Azue%20Lane(JP)/abeikelongbi_3/abeikelongbi_3.model3.json');

            app.stage.addChild(model as unknown as PIXI.DisplayObject); // Chuyển kiểu về DisplayObject
            (model as any).y = innerHeight * 0.10;
            (model as any).position.x = -125;
            (model as any).scale.set(0.1); // Cast về any để tránh lỗi TypeScript
            // Cấu hình mô hình
            (model as any).interactive = true;
            (model as any).trackedPointers = {}; // Đảm bảo thuộc tính trackedPointers được khởi tạo
        };

        loadLive2DModel();

    }, [isLive2DScriptLoaded]);

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
                    background-image: url('/background1.avif'); */
                   background-size: cover; /* Đảm bảo hình ảnh nền được phủ đầy canvas */
                    background-position: center; /* Canh giữa hình ảnh */
                    background-repeat: no-repeat; /* Không lặp lại hình ảnh */
                    /* Thiết lập các thuộc tính khác cho canvas */
                    width: 100vw; /* Chiều rộng bằng 100% viewport width */
                    height: 100vh; /* Chiều cao bằng 100% viewport height */
                    position: fixed; /* Đảm bảo canvas cố định trong viewport */
                    top: 0;
                    left: 0;
                    z-index: -1; /* Đặt z-index để đặt nó phía sau các phần tử khác trên trang */
                }
                .gradient-background {
                    background: rgba(3, 122, 222, 0.5) linear-gradient(to bottom right, rgba(3, 122, 222, 0.5), rgba(3, 229, 183, 0.5)); /* Gradient màu với opacity 0.5 */
                }
            `}</style>
            <canvas id="canvas" />
            {/* Phần tử văn bản dưới cùng dựa trên canvas */}
            <div className="fixed gradient-background text-sm bottom-[8em] z-5 left-[50%] w-[95%] transform -translate-x-1/2 rounded-lg pt-2 pb-2 px-2 text-white">
                <div className="px-2 font-bold">
                    <h6>HMS Abercrombie (F109)</h6>
                </div>
                <div className="bg-white font-[500] rounded-lg h-[7em] mt-2 text-black py-2 px-4">
                    <p>Đây là văn bản dựa trên canvas</p>
                </div>
            </div>
        </>
    );
};

export default Live2DModelComponent;
