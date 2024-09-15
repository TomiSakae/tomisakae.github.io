'use client'
import { useState, useEffect } from 'react';
import { MdExpandMore } from "react-icons/md";

export default function Home() {
  const [turnOn, setTurnOn] = useState(false);
  const [setUp, setSetUp] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setTurnOn(true);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const timer2 = setTimeout(() => {
      setSetUp(true);
    }, 3000);
    return () => clearTimeout(timer2);
  }, []);

  return (
    <>
      {!setUp &&
        <div className="bg-black h-screen flex items-center justify-center">
          <h1 className="text-white font-[600] text-4xl">{turnOn ? 'AniPhone' : ''}</h1>
        </div>
      }
      {setUp &&
        <div className="bg-white h-screen flex flex-col items-center justify-between text-center">
          <h1 className="text-black text-3xl mt-20">Xin Chào!</h1>
          <div className="flex flex-col items-center justify-center mb-20">
            <div className="flex items-center justify-center cursor-pointer hover:bg-gray-100 rounded-lg transition-colors duration-200 py-2 px-2 mb-4">
              <p className="text-black text-md ml-1">Tiếng Việt</p>
              <MdExpandMore className="text-black text-xl ml-3" />
            </div>
            <button className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
              Bắt Đầu
            </button>
          </div>
        </div>
      }
    </>
  );
}
