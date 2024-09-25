'use client'
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { FaArrowLeftLong } from 'react-icons/fa6';
import { useRouter } from 'next/navigation';
import Nav from '@/components/nav';
import { Character, charactersData } from '@/components/CharactersData';
import { FaArrowUp } from 'react-icons/fa';

const IdolGallery = () => {
    const [idols, setIdols] = useState<(Character & { level: number, currentSpeed: number })[]>([]);
    const [selectedIdol, setSelectedIdol] = useState<(Character & { level: number, currentSpeed: number }) | null>(null);
    const [showModal, setShowModal] = useState(false);
    const [points, setPoints] = useState(0);
    const router = useRouter();

    useEffect(() => {
        const storedIdols = JSON.parse(localStorage.getItem('idol') || '[]');
        const storedIdolSpeeds = JSON.parse(localStorage.getItem('idolspeed') || '[]');
        const storedIdolLevels = JSON.parse(localStorage.getItem('idollvl') || '[]');
        setIdols(charactersData.filter((_, index) => storedIdols[index] === 1).map(idol => ({
            ...idol,
            currentSpeed: storedIdolSpeeds[idol.id - 1] || idol.speed,
            level: storedIdolLevels[idol.id - 1] || 1
        })));

        const updatePoints = () => {
            const currentPoints = parseInt(localStorage.getItem('point') || '0', 10);
            setPoints(currentPoints);
        };

        updatePoints();
        const intervalId = setInterval(updatePoints, 1000);

        return () => clearInterval(intervalId);
    }, []);

    const getRarityColor = (rarity: string) => {
        switch (rarity) {
            case 'R': return 'text-blue-500';
            case 'SR': return 'text-purple-500';
            case 'SSR': return 'text-yellow-500';
            case 'UR': return 'text-red-500';
            default: return 'text-white';
        }
    };

    const openModal = (idol: Character & { level: number, currentSpeed: number }) => {
        setSelectedIdol(idol);
        setShowModal(true);
    };

    const closeModal = () => {
        setSelectedIdol(null);
        setShowModal(false);
    };

    const upgradeIdol = () => {
        if (selectedIdol) {
            const upgradeCost = selectedIdol.level * 100;
            if (points >= upgradeCost) {
                const newLevel = selectedIdol.level + 1;
                const newPoints = points - upgradeCost;
                const newSpeed = selectedIdol.currentSpeed + selectedIdol.speed;

                // Cập nhật cấp độ trong localStorage
                const storedIdolLevels = JSON.parse(localStorage.getItem('idollvl') || '[]');
                storedIdolLevels[selectedIdol.id - 1] = newLevel;
                localStorage.setItem('idollvl', JSON.stringify(storedIdolLevels));

                // Cập nhật tốc độ trong localStorage
                const storedIdolSpeeds = JSON.parse(localStorage.getItem('idolspeed') || '[]');
                storedIdolSpeeds[selectedIdol.id - 1] = newSpeed;
                localStorage.setItem('idolspeed', JSON.stringify(storedIdolSpeeds));

                // Cập nhật điểm trong localStorage
                localStorage.setItem('point', newPoints.toString());

                // Cập nhật state
                setIdols(prevIdols => prevIdols.map(idol =>
                    idol.id === selectedIdol.id ? { ...idol, level: newLevel, currentSpeed: newSpeed } : idol
                ));
                setSelectedIdol({ ...selectedIdol, level: newLevel, currentSpeed: newSpeed });
                setPoints(newPoints);
            } else {
                // Xử lý trường hợp không đủ điểm
            }
        }
    };

    const IdolModal = () => {
        if (!selectedIdol) return null;

        return (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 mx-4">
                <div className="bg-gray-800 p-6 rounded-lg shadow-lg max-w-md w-full">
                    <div className="relative w-full aspect-square mb-4">
                        <Image
                            src={selectedIdol.image}
                            alt={selectedIdol.name}
                            layout="fill"
                            objectFit="cover"
                            className="rounded-lg"
                        />
                    </div>
                    <h2 className="text-2xl font-bold mb-2">{selectedIdol.name}</h2>
                    <p>Độ hiếm: <span className={`font-bold ${getRarityColor(selectedIdol.rarity)}`}>{selectedIdol.rarity}</span></p>
                    <p className="flex justify-between items-center">
                        <div>
                            Cấp độ:
                            <span className="ml-2 font-bold text-green-300">{selectedIdol.level}</span>
                        </div>
                        <button
                            onClick={upgradeIdol}
                            className="bg-green-500 hover:bg-green-600 px-2 py-1 rounded-lg text-white font-bold text-sm"
                        >
                            <div className="flex items-center"><FaArrowUp className="inline mr-1" /> {selectedIdol.level * 100} điểm</div>
                        </button>
                    </p>
                    <p className="flex items-center">
                        Tốc độ: <span className="mx-2 text-blue-300">{selectedIdol.currentSpeed}</span>
                        <span className="text-sm">
                            → <span className="mx-2 font-bold text-green-300">{selectedIdol.currentSpeed + selectedIdol.speed}</span>
                        </span>
                    </p>
                    <div className="mt-4">
                        <button
                            onClick={closeModal}
                            className="w-full bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg text-white font-bold"
                        >
                            Đóng
                        </button>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div className="h-screen bg-black text-white">
            <Nav />
            <div className="p-4 mx-4">
                <div className="flex items-center mb-6">
                    <FaArrowLeftLong
                        className='text-xl cursor-pointer'
                        onClick={() => router.push('/AniPhone/setting/user-center/anistar')}
                    />
                    <h1 className="text-xl font-[600] mx-4">Nhân vật</h1>
                </div>
                <div className="mb-4">
                    <p className="text-xl font-semibold">Điểm: <span className="text-yellow-300">{points}</span></p>
                </div>
                <div className="grid grid-cols-2 gap-4 h-[71vh] overflow-y-auto">
                    {idols.map((idol, index) => (
                        <div key={index} className="bg-gray-800 rounded-lg p-2 cursor-pointer" onClick={() => openModal(idol)}>
                            <div className="relative w-full aspect-square mb-2">
                                <Image
                                    src={idol.image}
                                    alt={idol.name}
                                    layout="fill"
                                    objectFit="cover"
                                    className="rounded-lg"
                                />
                            </div>
                            <h3 className="text-lg font-semibold">{idol.name}</h3>
                            <p>Độ hiếm: <span className={`font-bold ${getRarityColor(idol.rarity)}`}>{idol.rarity}</span></p>
                            <p>Cấp độ: <span className="font-bold text-green-300">{idol.level}</span></p>
                            <p>Tốc độ: <span className="font-bold text-blue-300">{idol.currentSpeed}</span></p>
                        </div>
                    ))}
                </div>
            </div>
            {showModal && <IdolModal />}
        </div>
    );
};

export default IdolGallery;