import React, { useEffect, useState } from 'react';

interface Job {
    id: number;
    name: string;
    basePointsPerSecond: number;
}

const jobs: Job[] = [
    { id: 1, name: "Hỗ trợ giải toán", basePointsPerSecond: 0.3 },
    { id: 2, name: "Giúp đặt mật khẩu", basePointsPerSecond: 0.17 },
    { id: 3, name: "Xác thực CAPTCHA", basePointsPerSecond: 0.5 },
    { id: 4, name: "Giãi mã tin nhắn", basePointsPerSecond: 0.22 },
    { id: 5, name: "Đọc truyện kiếm tiền", basePointsPerSecond: 0.45 },
];

const TotalPointsPerSecond: React.FC = () => {
    const [totalPoints, setTotalPoints] = useState<number>(0);
    const [storedJobs, setStoredJobs] = useState<number[]>([]);

    useEffect(() => {
        const calculateTotalPoints = () => {
            const currentStoredJobs = JSON.parse(localStorage.getItem('jobs') || '[]');
            const storedIdolSpeeds = JSON.parse(localStorage.getItem('idolspeed') || '[]');

            let total = 0;
            for (let i = 0; i < currentStoredJobs.length; i++) {
                const characterId = currentStoredJobs[i];
                if (characterId > 0) {
                    const job = jobs[i];
                    const characterSpeed = storedIdolSpeeds[characterId - 1] || 1;
                    total += job.basePointsPerSecond * characterSpeed;
                }
            }
            return total;
        };

        const checkAndUpdateJobs = () => {
            const currentStoredJobs = JSON.parse(localStorage.getItem('jobs') || '[]');
            if (JSON.stringify(currentStoredJobs) !== JSON.stringify(storedJobs)) {
                setStoredJobs(currentStoredJobs);
                setTotalPoints(calculateTotalPoints());
            }
        };

        const updatePoints = () => {
            const currentPoints = parseInt(localStorage.getItem('point') || '0');
            const newPoints = currentPoints + totalPoints;
            localStorage.setItem('point', newPoints.toString());
        };

        // Initial calculation
        checkAndUpdateJobs();

        // Set up interval to check for changes and update points every second
        const intervalId = setInterval(() => {
            checkAndUpdateJobs();
            updatePoints();
        }, 1000);

        // Clean up interval on component unmount
        return () => clearInterval(intervalId);
    }, [storedJobs, totalPoints]);

    if (totalPoints === 0) {
        return null;
    }

    return (
        <div>
            {totalPoints.toFixed(2)}/s
        </div>
    );
};

export default TotalPointsPerSecond;