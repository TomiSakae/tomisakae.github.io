'use client'

import { useState } from 'react';
import { FaCoins, FaUser } from 'react-icons/fa';

const DocTruyenKiemTien = () => {
    const [balance, setBalance] = useState(0);
    const [stories] = useState([
        { id: 1, title: 'Cuộc phiêu lưu kỳ thú', chapters: 10, reward: 5 },
        { id: 2, title: 'Bí mật của rừng xanh', chapters: 15, reward: 8 },
        { id: 3, title: 'Hành trình về phương Đông', chapters: 20, reward: 10 },
    ]);
    const [currentStory, setCurrentStory] = useState<{
        id: number;
        title: string;
        chapters: number;
        reward: number;
    } | null>(null);
    const [currentChapter, setCurrentChapter] = useState(1);

    const readChapter = () => {
        if (currentStory && currentChapter <= currentStory.chapters) {
            setBalance(prevBalance => prevBalance + currentStory.reward);
            setCurrentChapter(prevChapter => prevChapter + 1);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 text-gray-800 p-4">
            <h1 className="text-3xl font-bold mb-6 text-center">Đọc Truyện Kiếm Tiền</h1>

            <div className="bg-white rounded-lg shadow-md p-4 mb-6 flex justify-between items-center">
                <div className="flex items-center">
                    <FaUser className="text-blue-500 mr-2" />
                    <span>Người dùng</span>
                </div>
                <div className="flex items-center">
                    <FaCoins className="text-yellow-500 mr-2" />
                    <span>{balance} xu</span>
                </div>
            </div>

            {!currentStory ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {stories.map(story => (
                        <div key={story.id} className="bg-white rounded-lg shadow-md p-4 cursor-pointer hover:bg-gray-50" onClick={() => setCurrentStory(story)}>
                            <h2 className="text-xl font-semibold mb-2">{story.title}</h2>
                            <p className="text-gray-600 mb-2">Số chương: {story.chapters}</p>
                            <p className="text-green-600">Thưởng: {story.reward} xu/chương</p>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="bg-white rounded-lg shadow-md p-4">
                    <h2 className="text-2xl font-semibold mb-4">{currentStory.title}</h2>
                    <p className="mb-4">Chương hiện tại: {currentChapter - 1}/{currentStory.chapters}</p>
                    {currentChapter <= currentStory.chapters ? (
                        <button
                            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                            onClick={readChapter}
                        >
                            Đọc chương tiếp theo
                        </button>
                    ) : (
                        <p className="text-green-600">Bạn đã đọc hết truyện này!</p>
                    )}
                    <button
                        className="mt-4 text-blue-500 hover:underline"
                        onClick={() => {
                            setCurrentStory(null);
                            setCurrentChapter(1);
                        }}
                    >
                        Quay lại danh sách truyện
                    </button>
                </div>
            )}
        </div>
    );
};

export default DocTruyenKiemTien;
