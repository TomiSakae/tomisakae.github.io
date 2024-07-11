'use client'

import { useState, useRef, useEffect } from 'react';
import KitsuList from '../components/KitsuList';
import { FaCalendar } from "react-icons/fa";
import { MdExpandMore } from "react-icons/md";
import { useFloating, autoUpdate, offset, flip } from '@floating-ui/react-dom';

export default function Home() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [subtype, setSubtype] = useState('TV');
  const buttonRef = useRef<HTMLDivElement>(null);
  const popupRef = useRef<HTMLDivElement>(null);

  const { x, y, floatingStyles, isPositioned } = useFloating({
    placement: 'bottom-start',
    strategy: 'fixed',
    whileElementsMounted: autoUpdate,
    middleware: [offset(8), flip()],
  });

  const togglePopup = () => {
    setIsPopupOpen(!isPopupOpen);
  };

  const closePopup = (e: MouseEvent) => {
    if (
      popupRef.current &&
      !popupRef.current.contains(e.target as Node) &&
      buttonRef.current &&
      !buttonRef.current.contains(e.target as Node)
    ) {
      setIsPopupOpen(false);
    }
  };

  useEffect(() => {
    if (isPopupOpen) {
      document.body.style.overflow = 'hidden'; // Ngăn không cho cuộn khi popup mở
      document.addEventListener('mousedown', closePopup);
    } else {
      document.body.style.overflow = ''; // Cho phép cuộn lại khi popup đóng
      document.removeEventListener('mousedown', closePopup);
    }
    return () => {
      document.removeEventListener('mousedown', closePopup);
    };
  }, [isPopupOpen]);

  const handleOptionClick = (option: string) => {
    setSubtype(option);
    setIsPopupOpen(false);
  };

  return (
    <main className="pt-12">
      <nav className="bg-black pt-3 pb-3 fixed w-full top-0 z-10">
        <div className="font-bold text-white container mx-auto flex items-center relative">
          <div
            className="absolute left-0 flex items-center ml-4 cursor-pointer"
            onClick={togglePopup}
            ref={buttonRef}
          >
            <p className="text-sm">{subtype}</p>
            <MdExpandMore className="ml-1 text-xl" />
          </div>
          <h1 className="text-sm mx-auto">Mùa Đông 2024</h1>
          <FaCalendar className="absolute right-0 text-sm mr-4" />
        </div>
      </nav>
      {isPopupOpen && (
        <>
          <div className="fixed inset-0 bg-black opacity-0 z-20" onClick={togglePopup}></div>
          <div
            ref={popupRef}
            style={{ position: isPositioned ? 'fixed' : 'absolute', top: y ?? '', left: x ?? '' }}
            className="bg-black shadow-lg rounded px-4 py-2 w-30 z-30 mt-12 text-white font-bold"
          >
            {/* Nội dung của popup */}
            <ul>
              {['TV', 'ONA', 'OVA', 'Special', 'Movie', 'Music'].map(option => (
                <li
                  key={option}
                  className="cursor-pointer px-2 py-1"
                  onClick={() => handleOptionClick(option)}
                >
                  {option}
                </li>
              ))}
            </ul>
          </div>
        </>
      )}
      <div className="container mx-auto">
        <KitsuList subtype={subtype} />
      </div>
    </main>
  );
}
