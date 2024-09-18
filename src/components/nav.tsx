import { LiaBatteryFullSolid, LiaBatteryThreeQuartersSolid, LiaBatteryHalfSolid, LiaBatteryQuarterSolid, LiaBatteryEmptySolid } from "react-icons/lia";
import { FaRegSquare } from "react-icons/fa6";
import { CiMenuBurger } from "react-icons/ci";
import { RiPlayReverseLargeLine } from "react-icons/ri";
import { useRouter, usePathname } from 'next/navigation';
import { BiSignal5 } from "react-icons/bi";
import { useEffect, useState, useCallback } from "react";
import { IoWifiOutline } from "react-icons/io5";

const Nav = () => {
    const router = useRouter();
    const pathname = usePathname();
    const isAniPhone = pathname === '/AniPhone';
    const [isSignal, setIsSignal] = useState(false);
    const [batteryPercentage, setBatteryPercentage] = useState(100);
    const [usageDuration, setUsageDuration] = useState(0);
    const [showLowBatteryModal, setShowLowBatteryModal] = useState(false);
    const [hasWifi, setHasWifi] = useState(false);
    const [customTime, setCustomTime] = useState(() => {
        if (typeof window !== 'undefined') {
            const savedTime = window.localStorage.getItem('customTime');
            return savedTime ? new Date(JSON.parse(savedTime)) : new Date(2024, 7, 12, 6, 0);
        }
        return new Date(2024, 7, 12, 6, 0);
    });

    const updateCustomTime = useCallback((minutes: number) => {
        setCustomTime(prevTime => {
            const newTime = new Date(prevTime.getTime());
            newTime.setMinutes(newTime.getMinutes() + minutes);

            // Xử lý tăng ngày, tháng, năm, và thứ
            const daysPassed = Math.floor(minutes / (24 * 60));
            if (daysPassed > 0) {
                const newDate = new Date(prevTime.getTime() + daysPassed * 24 * 60 * 60 * 1000);
                newTime.setDate(newDate.getDate());
                newTime.setMonth(newDate.getMonth());
                newTime.setFullYear(newDate.getFullYear());
            }

            if (typeof window !== 'undefined') {
                window.localStorage.setItem('customTime', JSON.stringify(newTime));
            }
            return newTime;
        });
    }, []);

    useEffect(() => {
        if (window.localStorage.getItem('phoneNumber') !== null) {
            setIsSignal(true);
        }

        // Load battery percentage and usage duration from localStorage
        const storedBattery = window.localStorage.getItem('batteryPercentage');
        const storedUsage = window.localStorage.getItem('usageDuration');

        if (storedBattery) setBatteryPercentage(parseInt(storedBattery));
        if (storedUsage) setUsageDuration(parseInt(storedUsage));

        // Start tracking usage time and updating battery
        const interval = setInterval(() => {
            setUsageDuration(prevDuration => {
                const newDuration = prevDuration + 1;
                window.localStorage.setItem('usageDuration', newDuration.toString());
                return newDuration;
            });

            setBatteryPercentage(prevBattery => {
                // Giảm pin 1% mỗi 60 giây
                if (prevBattery > 0 && usageDuration % 60 === 0) {
                    const newBattery = prevBattery - 1;
                    window.localStorage.setItem('batteryPercentage', newBattery.toString());

                    // Kiểm tra nếu pin còn 5% thì hiện modal
                    if (newBattery === 5) {
                        setShowLowBatteryModal(true);
                    }

                    // Thêm điều kiện để chuyển hướng khi pin 0%
                    if (newBattery === 0) {
                        router.push('/shutdown');
                    }

                    return newBattery;
                }
                return prevBattery;
            });
        }, 1000); // Update every second

        // Add custom time tracking
        const timeInterval = setInterval(() => {
            updateCustomTime(1); // Tăng 1 phút mỗi giây
        }, 1000);

        // Check for wifiPlanId and expiration
        const checkWifiPlan = () => {
            const savedPlanId = window.localStorage.getItem('wifiPlanId');
            const purchaseDate = window.localStorage.getItem('wifiPlanPurchaseDate');
            if (savedPlanId && purchaseDate) {
                const expirationDate = new Date(purchaseDate);
                expirationDate.setDate(expirationDate.getDate() + 30);
                const remainingDays = Math.ceil((expirationDate.getTime() - customTime.getTime()) / (1000 * 3600 * 24));

                if (remainingDays <= 0) {
                    // Plan has expired, cancel it
                    window.localStorage.removeItem('wifiPlanId');
                    window.localStorage.removeItem('wifiPlanPurchaseDate');
                    setHasWifi(false);
                } else {
                    setHasWifi(true);
                }
            } else {
                setHasWifi(false);
            }
        };

        checkWifiPlan();
        const wifiCheckInterval = setInterval(checkWifiPlan, 60000); // Check every minute

        return () => {
            clearInterval(interval);
            clearInterval(wifiCheckInterval);
            clearInterval(timeInterval);
        };
    }, [usageDuration, router, updateCustomTime, customTime]);

    const getBatteryIcon = () => {
        const iconClass = batteryPercentage <= 20 ? 'text-red-500' : '';
        if (batteryPercentage > 75) return <LiaBatteryFullSolid className={`mr-1 mt-[2px] text-2xl ${iconClass}`} />;
        if (batteryPercentage > 50) return <LiaBatteryThreeQuartersSolid className={`mr-1 mt-[2px] text-2xl ${iconClass}`} />;
        if (batteryPercentage > 25) return <LiaBatteryHalfSolid className={`mr-1 mt-[2px] text-2xl ${iconClass}`} />;
        if (batteryPercentage > 10) return <LiaBatteryQuarterSolid className={`mr-1 mt-[2px] text-2xl ${iconClass}`} />;
        return <LiaBatteryEmptySolid className={`mr-1 mt-[2px] text-2xl ${iconClass}`} />;
    };

    const formatCustomTime = (date: Date) => {
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');
        return `${hours}:${minutes}`;
    };

    return (
        <>
            <div className='flex justify-between items-center text-white mx-4 pt-1'>
                <div className='flex items-center'>
                    <div className='text-md'>
                        {formatCustomTime(customTime)}
                    </div>
                </div>
                <div className='flex items-center'>
                    {hasWifi && (
                        <IoWifiOutline className='mr-1 text-xl' />
                    )}
                    {isSignal && (
                        <BiSignal5 className='mr-1 text-xl' />
                    )}
                    {getBatteryIcon()}
                    <span className={batteryPercentage <= 20 ? 'text-red-500' : ''}>{batteryPercentage}%</span>
                </div>
            </div>
            <div className='absolute bottom-0 left-0 right-0 flex justify-between items-center text-white pb-1 mx-6'>
                <div className='flex-1 flex justify-center p-2 rounded-full hover:bg-gray-200 hover:bg-opacity-20 transition-all duration-300'>
                    <div className='flex flex-col items-center'>
                        <CiMenuBurger className='text-md' />
                    </div>
                </div>
                <div className='flex-1 flex justify-center p-2 rounded-full hover:bg-gray-200 hover:bg-opacity-20 transition-all duration-300'
                    onClick={() => router.push('/AniPhone')}
                >
                    <div className='flex flex-col items-center'>
                        <FaRegSquare className='text-md' />
                    </div>
                </div>
                <div className="flex-1 flex justify-center p-2 rounded-full hover:bg-gray-200 hover:bg-opacity-20 transition-all duration-300"
                    onClick={() => {
                        if (!isAniPhone) {
                            router.back();
                        }
                    }}
                >
                    <div className='flex flex-col items-center'>
                        <RiPlayReverseLargeLine className='text-lg' />
                    </div>
                </div>
            </div>
            {showLowBatteryModal && (
                <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
                    <div className="bg-[#1a1a1a] p-6 rounded-lg text-white">
                        <h2 className="text-xl font-bold mb-4">Cảnh báo pin yếu</h2>
                        <p className="mb-4">Pin của bạn còn 5%. Vui lòng sạc pin ngay.</p>
                        <button
                            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded transition duration-300"
                            onClick={() => setShowLowBatteryModal(false)}
                        >
                            Đóng
                        </button>
                    </div>
                </div>
            )}
        </>
    );
};

export default Nav;