'use client'

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { FaBatteryEmpty, FaBatteryQuarter, FaBatteryHalf, FaBatteryThreeQuarters, FaBatteryFull, FaPlug } from 'react-icons/fa';

const ShutdownPage = () => {
    const router = useRouter();
    const [showChargingButton, setShowChargingButton] = useState(false);
    const [batteryLevel, setBatteryLevel] = useState(0);
    const [isCharging, setIsCharging] = useState(false);

    useEffect(() => {
        const shutdownTimer = setTimeout(() => {
            setShowChargingButton(true);
        }, 1000);

        return () => clearTimeout(shutdownTimer);
    }, []);

    useEffect(() => {
        if (isCharging) {
            const chargingInterval = setInterval(() => {
                setBatteryLevel(prev => {
                    if (prev >= 100) {
                        clearInterval(chargingInterval);
                        window.localStorage.setItem('batteryPercentage', '100');
                        return 100;
                    }
                    return prev + 1;
                });
            }, 1000);

            return () => clearInterval(chargingInterval);
        }
    }, [isCharging]);

    useEffect(() => {
        if (batteryLevel >= 100) {
            router.push('/');
        }
    }, [batteryLevel, router]);

    const handleCharge = () => {
        setIsCharging(true);
    };

    const getBatteryIcon = () => {
        if (batteryLevel <= 0) return <FaBatteryEmpty className={`text-8xl ${getBatteryColor()}`} />;
        if (batteryLevel <= 25) return <FaBatteryQuarter className={`text-8xl ${getBatteryColor()}`} />;
        if (batteryLevel <= 50) return <FaBatteryHalf className={`text-8xl ${getBatteryColor()}`} />;
        if (batteryLevel <= 75) return <FaBatteryThreeQuarters className={`text-8xl ${getBatteryColor()}`} />;
        return <FaBatteryFull className={`text-8xl ${getBatteryColor()}`} />;
    };

    const getBatteryColor = () => {
        if (batteryLevel <= 20) return 'text-red-500';
        if (batteryLevel <= 50) return 'text-yellow-500';
        return 'text-green-500';
    };

    return (
        <div className="h-screen w-screen bg-gradient-to-b from-gray-900 to-black flex flex-col items-center justify-center">
            {!showChargingButton && !isCharging && (
                <div className="flex flex-col items-center animate-pulse">
                    <h1 className="text-white text-5xl font-bold mb-6">AniPhone</h1>
                    <FaBatteryEmpty className="text-red-500 text-8xl" />
                </div>
            )}
            {showChargingButton && !isCharging && (
                <button
                    onClick={handleCharge}
                    className="flex items-center bg-blue-500 text-white rounded-full px-8 py-4 animate-bounce hover:bg-blue-600 transition-colors duration-300 shadow-lg"
                >
                    <FaPlug className="mr-3 text-2xl" />
                    <span className="text-xl font-semibold">Sạc pin</span>
                </button>
            )}
            {isCharging && (
                <div className="flex flex-col items-center animate-fadeIn">
                    <div className="relative">
                        {getBatteryIcon()}
                        <FaPlug className="absolute top-1/2 right-0 transform translate-x-full -translate-y-1/2 text-4xl text-green-400 animate-pulse" />
                    </div>
                    <p className="text-white text-4xl mt-6 font-bold">{batteryLevel}%</p>
                    <div className="mt-4 w-64 h-2 bg-gray-700 rounded-full overflow-hidden">
                        <div
                            className="h-full bg-green-500 transition-all duration-300 ease-out"
                            style={{ width: `${batteryLevel}%` }}
                        ></div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ShutdownPage;
