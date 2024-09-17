import React, { useState, useEffect, useRef } from 'react';
import { IoMdSend } from 'react-icons/io';

interface CaptchaChallengeProps {
    onChallengeComplete: (reward: number) => void;
    onMessage: (message: { sender: string; content: string }) => void;
}

const CaptchaChallenge: React.FC<CaptchaChallengeProps> = ({ onChallengeComplete, onMessage }) => {
    const [captcha, setCaptcha] = useState('');
    const [userInput, setUserInput] = useState('');
    const captchaGeneratedRef = useRef(false);

    const generateCaptcha = () => {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let result = '';
        for (let i = 0; i < 6; i++) {
            result += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        return result;
    };

    useEffect(() => {
        if (!captchaGeneratedRef.current) {
            const newCaptcha = generateCaptcha();
            setCaptcha(newCaptcha);
            setTimeout(() => {
                onMessage({ sender: 'Người lạ', content: `${newCaptcha}` });
            }, 1000);
            captchaGeneratedRef.current = true;
        }
    }, [onMessage]);

    const handleSubmit = () => {
        onMessage({ sender: 'Bạn', content: userInput });

        setTimeout(() => {
            if (userInput.trim() === captcha) {
                const reward = 5000;
                onChallengeComplete(reward);
                onMessage({ sender: 'Người lạ', content: `Tuyệt vời! Bạn đã nhập đúng mã CAPTCHA. Đây là ${reward.toLocaleString()} đ cho bạn.` });
            } else {
                onMessage({ sender: 'Người lạ', content: 'Rất tiếc, mã CAPTCHA bạn nhập chưa chính xác. Hãy thử lại!' });
                // Đã xóa phần tạo CAPTCHA mới
            }
        }, 1000);
        setUserInput('');
    };

    return (
        <div className="flex items-center">
            <input
                type="text"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                placeholder="Nhập mã CAPTCHA..."
                className="flex-grow bg-gray-800 text-white p-2 rounded-lg focus:outline-none"
            />
            <button
                onClick={handleSubmit}
                className="bg-blue-500 text-white p-2 rounded-lg ml-2"
            >
                <IoMdSend className='text-2xl' />
            </button>
        </div>
    );
};

export default React.memo(CaptchaChallenge);