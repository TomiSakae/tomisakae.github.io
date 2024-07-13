'use client'

import { useState, useRef, useEffect, Suspense } from 'react';
import KitsuList from '../components/KitsuList';
import { FaCalendar } from "react-icons/fa";
import { MdExpandMore } from "react-icons/md";
import { MdExpandLess } from "react-icons/md";
import { useFloating, autoUpdate, offset, flip } from '@floating-ui/react-dom';
import { useRouter, useSearchParams } from 'next/navigation';
import Lottie from 'lottie-react';
import CalenderData from '../app/icon/calendar V3.json';

const calenderDataStyle = {
  width: 25,
  height: 25,
}

const Anime = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const getQueryParam = (param: string, defaultValue: string) => {
    const value = searchParams.get(param);
    return value || defaultValue;
  };

  const [isTvPopupOpen, setIsTvPopupOpen] = useState(false);
  const [isCalendarPopupOpen, setIsCalendarPopupOpen] = useState(false);
  const [subtype, setSubtype] = useState(() => getQueryParam('subtype', 'TV'));
  const [year, setYear] = useState(() => getQueryParam('year', new Date().getFullYear().toString()));

  const getCurrentSeason = () => {
    const currentMonth = new Date().getMonth() + 1; // Lấy tháng hiện tại (từ 0 đến 11)

    // Xác định mùa dựa trên tháng
    if (currentMonth >= 1 && currentMonth <= 3) {
      return 'winter';
    } else if (currentMonth >= 4 && currentMonth <= 6) {
      return 'spring';
    } else if (currentMonth >= 7 && currentMonth <= 9) {
      return 'summer';
    } else {
      return 'fall';
    }
  };

  const [season, setSeason] = useState(() => getQueryParam('season', getCurrentSeason()));

  const tvButtonRef = useRef<HTMLDivElement>(null);
  const calendarButtonRef = useRef<HTMLDivElement>(null);
  const tvPopupRef = useRef<HTMLDivElement>(null);
  const calendarPopupRef = useRef<HTMLDivElement>(null);

  const { x: tvX, y: tvY, floatingStyles: tvFloatingStyles, isPositioned: tvIsPositioned } = useFloating({
    placement: 'bottom-start',
    strategy: 'fixed',
    whileElementsMounted: autoUpdate,
    middleware: [offset(8), flip()],
  });

  const { x: calendarX, y: calendarY, floatingStyles: calendarFloatingStyles, isPositioned: calendarIsPositioned } = useFloating({
    placement: 'bottom-end', // Đặt popup của calendar bên phải
    strategy: 'fixed',
    whileElementsMounted: autoUpdate,
    middleware: [offset(8), flip()],
  });

  const toggleTvPopup = () => {
    setIsTvPopupOpen(!isTvPopupOpen);
  };

  const toggleCalendarPopup = () => {
    setIsCalendarPopupOpen(!isCalendarPopupOpen);
  };

  const closePopup = (e: MouseEvent) => {
    if (
      (tvPopupRef.current && !tvPopupRef.current.contains(e.target as Node) && tvButtonRef.current && !tvButtonRef.current.contains(e.target as Node)) ||
      (calendarPopupRef.current && !calendarPopupRef.current.contains(e.target as Node) && calendarButtonRef.current && !calendarButtonRef.current.contains(e.target as Node))
    ) {
      setIsTvPopupOpen(false);
      setIsCalendarPopupOpen(false);
    }
  };

  const handleBeforeUnload = () => {
    window.sessionStorage.setItem('scrollPosition', JSON.stringify(window.scrollY));
  };

  useEffect(() => {
    // Restore scroll position from sessionStorage on component mount
    const scrollPosition = window.sessionStorage.getItem('scrollPosition');
    if (scrollPosition) {
      window.scrollTo(0, JSON.parse(scrollPosition));
    }

    window.addEventListener('scroll', handleBeforeUnload);

    return () => {
      window.removeEventListener('scroll', handleBeforeUnload);
    };
  }, []);

  useEffect(() => {
    if (isTvPopupOpen || isCalendarPopupOpen) {
      document.body.style.overflow = 'hidden'; // Ngăn không cho cuộn khi popup mở
      document.addEventListener('mousedown', closePopup);
    } else {
      document.body.style.overflow = ''; // Cho phép cuộn lại khi popup đóng
      document.removeEventListener('mousedown', closePopup);
    }
    return () => {
      document.removeEventListener('mousedown', closePopup);
    };
  }, [isTvPopupOpen, isCalendarPopupOpen]);

  useEffect(() => {
    const queryParams = new URLSearchParams();
    queryParams.set('subtype', subtype);
    queryParams.set('year', year);
    queryParams.set('season', season);

    // Thay đổi URL
    router.replace(`/?${queryParams.toString()}`, { scroll: false });
  }, [subtype, year, season, router]);

  useEffect(() => {
    const newSubtype = getQueryParam('subtype', 'TV');
    const newYear = getQueryParam('year', new Date().getFullYear().toString());
    const newSeason = getQueryParam('season', getCurrentSeason());

    if (subtype !== newSubtype) {
      setSubtype(newSubtype);
    }
    if (year !== newYear) {
      setYear(newYear);
    }
    if (season !== newSeason) {
      setSeason(newSeason);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  const handleTvOptionClick = (option: string) => {
    setSubtype(option);
    setIsTvPopupOpen(false);
  };

  const handleCalendarOptionClick = (option: string) => {
    const year = option.split(' ')[1]; // Lấy phần số năm từ chuỗi 'Năm xxxx'
    setYear(year);
    setIsCalendarPopupOpen(false);
  };

  return (
    <main className="pt-12">
      <nav className="bg-black pb-3 fixed w-full top-0 z-10">
        <div className="bg-zinc-800 text-sm font-bold py-2 mb-3 container mx-auto flex items-center justify-center relative">
          <h1 className={`py-2 px-5 mx-1 rounded-lg cursor-pointer ${season === 'winter' ? 'bg-white text-dark' : 'text-gray-300'}`} onClick={() => setSeason('winter')}>Đông</h1>
          <h1 className={`py-2 px-5 mx-1 rounded-lg cursor-pointer ${season === 'spring' ? 'bg-rose-300 text-white' : 'text-gray-300'}`} onClick={() => setSeason('spring')}>Xuân</h1>
          <h1 className={`py-2 px-5 mx-1 rounded-lg cursor-pointer ${season === 'summer' ? 'bg-blue-400 text-white' : 'text-gray-300'}`} onClick={() => setSeason('summer')}>Hè</h1>
          <h1 className={`py-2 px-5 mx-1 rounded-lg cursor-pointer ${season === 'fall' ? 'bg-orange-500 text-white' : 'text-gray-300'}`} onClick={() => setSeason('fall')}>Thu</h1>
        </div>
        <div className="font-bold text-white container mx-auto flex items-center relative">
          <div
            className="absolute left-0 flex items-center ml-4 cursor-pointer"
            onClick={toggleTvPopup}
            ref={tvButtonRef}
          >
            <p className="text-sm">{subtype}</p>
            {isTvPopupOpen ? (<MdExpandLess className="ml-1 text-xl" />) : (<MdExpandMore className="ml-1 text-xl" />)}
          </div>
          <h1 className="text-sm mx-auto">{season === 'winter' ? 'Mùa Đông' : season === 'spring' ? 'Mùa Xuân' : season === 'summer' ? 'Mùa Hè' : season === 'fall' ? 'Mùa Thu' : ''} {year}</h1>
          <div
            className="absolute right-0 text-sm mr-4 cursor-pointer"
            onClick={toggleCalendarPopup}
            ref={calendarButtonRef}
          ><Lottie
              animationData={CalenderData}
              style={calenderDataStyle}
            /></div>
        </div>
      </nav>
      {isTvPopupOpen && (
        <>
          <div className="fixed inset-0 bg-black opacity-0 z-20" onClick={toggleTvPopup}></div>
          <div
            ref={tvPopupRef}
            style={{
              position: 'fixed',
              top: `${tvY}px`, // Đảm bảo y là pixel cho vị trí cố định
              left: `${tvX}px`, // Đảm bảo x là pixel cho vị trí cố định
            }}
            className="bg-black shadow-lg rounded px-6 py-2 z-30 mt-24 text-white font-bold"
          >
            {/* Nội dung của popup TV */}
            <ul>
              {['TV', 'ONA', 'OVA', 'Special', 'Movie', 'Music'].map(option => (
                <li
                  key={option}
                  className="cursor-pointer py-2 text-sm"
                  onClick={() => handleTvOptionClick(option)}
                >
                  {option}
                </li>
              ))}
            </ul>
          </div>
        </>
      )}
      {isCalendarPopupOpen && (
        <>
          <div className="fixed inset-0 bg-black opacity-0 z-20" onClick={toggleCalendarPopup}></div>
          <div
            ref={calendarPopupRef}
            style={{
              position: 'fixed',
              top: `${calendarY}px`,
              right: `${calendarX}px`,
              maxHeight: '220px', // Chiều cao cố định của popup
              overflowY: 'auto', // Cho phép thanh cuộn khi nội dung vượt quá chiều cao
            }}
            className="bg-black shadow-lg rounded px-6 z-30 mt-24 text-white font-bold"
          >
            {/* Nội dung của popup Calendar */}
            <ul>
              {Array.from({ length: new Date().getFullYear() - 1916 }, (_, index) => new Date().getFullYear() - index).map(year => (
                <li
                  key={year}
                  className="cursor-pointer py-2 text-sm"
                  onClick={() => handleCalendarOptionClick(`Năm ${year}`)}
                >
                  Năm {year}
                </li>
              ))}
            </ul>
          </div>
        </>
      )}
      <div className="container mx-auto mt-12 bg-black h-screen">
        <KitsuList subtype={subtype} year={year} season={season} />
      </div>
    </main>
  );
}

const Home = () => {
  return (
    <Suspense>
      <Anime />
    </Suspense>
  );
};

export default Home;