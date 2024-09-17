import React, { useState, useEffect, useRef } from 'react';
import { IoMdSend } from 'react-icons/io';

interface DecodeChallengeProps {
    onChallengeComplete: (reward: number) => void;
    onMessage: (message: { sender: string; content: string }) => void;
}

const DecodeChallenge: React.FC<DecodeChallengeProps> = ({ onChallengeComplete, onMessage }) => {
    const [, setEncodedMessage] = useState('');
    const [decodedMessage, setDecodedMessage] = useState('');
    const [userInput, setUserInput] = useState('');
    const [attempts, setAttempts] = useState(0);
    const [encodeMethod, setEncodeMethod] = useState('');
    const challengeGeneratedRef = useRef(false);

    const generateEncodedMessage = () => {
        const generateRandomMessage = (length: number) => {
            const words = ['xin', 'chao', 'ban', 'tot', 'dep', 'vui', 'hoc', 'code', 'game', 'thich'];
            return Array.from({ length }, () => words[Math.floor(Math.random() * words.length)]).join(' ');
        };

        const selectedMessage = generateRandomMessage(Math.floor(Math.random() * 3) + 2); // 2 đến 4 từ
        const methods = ['reverse', 'vowel', 'caesar'];
        const selectedMethod = methods[Math.floor(Math.random() * methods.length)];

        let encoded = '';
        switch (selectedMethod) {
            case 'reverse':
                encoded = selectedMessage.split(' ').map(word => word.split('').reverse().join('')).join(' ');
                break;
            case 'caesar':
                encoded = selectedMessage.split('').map(char => {
                    if (char === ' ') return ' ';
                    return String.fromCharCode(((char.charCodeAt(0) - 97 + 1) % 26) + 97);
                }).join('');
                break;
            case 'vowel':
                const vowels: { [key: string]: string } = { 'a': 'e', 'e': 'i', 'i': 'o', 'o': 'u', 'u': 'a' };
                encoded = selectedMessage.split('').map(char => vowels[char as keyof typeof vowels] || char).join('');
                break;
        }

        setEncodedMessage(encoded);
        setDecodedMessage(selectedMessage);
        setEncodeMethod(selectedMethod);
        return encoded;
    };

    useEffect(() => {
        if (!challengeGeneratedRef.current) {
            const newEncodedMessage = generateEncodedMessage();
            setTimeout(() => {
                onMessage({ sender: 'Người lạ', content: `${newEncodedMessage}` });
            }, 1000);
            challengeGeneratedRef.current = true;
        }
    }, [onMessage]);

    const handleSubmit = () => {
        onMessage({ sender: 'Bạn', content: userInput });

        setTimeout(() => {
            if (userInput.trim().toLowerCase() === decodedMessage.toLowerCase()) {
                let reward;
                switch (encodeMethod) {
                    case 'reverse':
                        reward = 5000;
                        break;
                    case 'vowel':
                        reward = 10000;
                        break;
                    case 'caesar':
                        reward = 20000;
                        break;
                    default:
                        reward = 5000;
                }
                onChallengeComplete(reward);
                onMessage({ sender: 'Người lạ', content: `Tuyệt vời! Bạn đã giải mã đúng tin nhắn. Đây là ${reward.toLocaleString()} đ cho bạn.` });
                setAttempts(0);
            } else {
                setAttempts(prev => prev + 1);
                if (attempts + 1 >= 3) {
                    let hint = '';
                    switch (encodeMethod) {
                        case 'reverse':
                            hint = 'Hãy thử đọc ngược lại từng từ.';
                            break;
                        case 'caesar':
                            hint = 'Mỗi chữ cái đã được thay thế bằng chữ cái tiếp theo trong bảng chữ cái.';
                            break;
                        case 'vowel':
                            hint = 'Các nguyên âm đã được thay thế: a->e, e->i, i->o, o->u, u->a.';
                            break;
                    }
                    onMessage({ sender: 'Người lạ', content: `Rất tiếc, tin nhắn giải mã chưa chính xác. Đây là gợi ý cho bạn: ${hint}` });
                } else {
                    onMessage({ sender: 'Người lạ', content: 'Rất tiếc, tin nhắn giải mã chưa chính xác. Hãy thử lại!' });
                }
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
                placeholder="Nhập tin nhắn đã giải mã..."
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

export default React.memo(DecodeChallenge);