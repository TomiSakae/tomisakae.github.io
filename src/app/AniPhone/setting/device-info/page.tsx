'use client'

import { useState } from 'react';
import Nav from '@/components/nav';

const DeviceInfoPage = () => {
    const [deviceInfo] = useState({
        name: 'AniPhone 15 Pro Max',
        model: 'A2849',
        software: 'AniOS 17.2.1',
        serial: 'FVFG2LKJHGFD',
        storage: '1 TB',
        battery: '100%',
    });

    return (
        <div className="h-screen bg-black text-white">
            <Nav />
            <div className="p-4">
                <div className="flex items-center mb-6">
                    <h1 className="text-3xl font-[600] mx-2">Thông tin thiết bị</h1>
                </div>
                {Object.entries(deviceInfo).map(([key, value]) => (
                    <div key={key} className="p-4 hover:bg-gray-800 rounded-lg transition-all duration-300">
                        <div className="flex justify-between items-center">
                            <span className="text-xl capitalize">{key.replace('_', ' ')}</span>
                            <span className="text-lg text-gray-400">{value}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default DeviceInfoPage;
