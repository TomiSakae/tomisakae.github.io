'use client'
import useSWR from 'swr';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

const getRandomNumber = () => Math.floor(Math.random() * 999999999);

const fetcher = async (url: string) => {
    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    if (!response.ok) {
        throw new Error('Network response was not ok');
    }

    return response.json();
};

const AnimeImg = () => {
    const [page, setPage] = useState(0);
    const [randomValue, setRandomValue] = useState(getRandomNumber); // Tạo giá trị ngẫu nhiên ban đầu
    const { data: waifusData, error: waifusError } = useSWR(
        `https://api.waifu.pics/sfw/waifu?page=${page}&random=${randomValue}`,
        fetcher,
        { revalidateOnFocus: false }
    );
    const [images, setImages] = useState<string[]>([]);
    const sentinelRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (waifusData) {
            setImages((prev) => [...prev, waifusData.url]);
        }
    }, [waifusData]);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    setPage((prevPage) => prevPage + 1); // Tăng trang
                    setRandomValue(getRandomNumber()); // Tạo giá trị ngẫu nhiên mới
                }
            },
            { threshold: 1 }
        );

        if (sentinelRef.current) {
            observer.observe(sentinelRef.current);
        }

        return () => {
            if (sentinelRef.current) {
                observer.unobserve(sentinelRef.current);
            }
        };
    }, []);

    return (
        <div className="flex flex-wrap mb-16">
            {images.map((imageUrl, index) => (
                <Image
                    key={index}
                    src={imageUrl}
                    alt={`Ảnh Anime ${index}`}
                    width={1920}
                    height={1080}
                />
            ))}
            <div ref={sentinelRef} className="w-full h-16"></div>
        </div>
    );
};

export default AnimeImg;
