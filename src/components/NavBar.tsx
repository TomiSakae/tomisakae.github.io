'use client'
import React from "react";
import { useRouter, usePathname } from "next/navigation";
import Image from 'next/image';
import Lottie from 'lottie-react';
import HomeData from '../app/icon/home.json';
import DiceData from '../app/icon/dice.json';
import ChatData from '../app/icon/chat.json';
import MenuData from '../app/icon/menu.json';

const homeStyle = {
    width: 35,
    height: 35,
};

const diceStyle = {
    width: 50,
    height: 50,
};

const chatStyle = {
    width: 40,
    height: 40,
};

const menuStyle = {
    width: 25,
    height: 25,
};

const NavBar: React.FC = () => {
    const router = useRouter();
    const pathname = usePathname();

    return (
        <nav className="fixed bottom-0 left-0 w-full bg-zinc-800 text-white">
            <div className="mx-auto px-2">
                <div className="relative flex items-center justify-between h-12">
                    <div className="flex items-center justify-center flex-1 items-stretch justify-start">
                        <button
                            onClick={() => router.push("/")}
                            className={`px-3 py-2 rounded-md text-sm ${pathname === "/tomisakae" ? "bg-gray-700" : "hover:bg-gray-700"}`}
                        >
                            <Image
                                src={"/tomisakae.jpg"}
                                alt={"TomiSakae"}
                                width={25}
                                height={25}
                                priority={true}
                                className="rounded-2xl"
                                placeholder="empty"
                            />
                        </button>
                        <button
                            onClick={() => router.push("/")}
                            className={`hover:bg-gray-700 mx-4 py-2 rounded-md ${pathname === "/random" ? "bg-gray-700" : "hover:bg-gray-700"}`}
                        >
                            <Lottie
                                animationData={DiceData}
                                style={diceStyle}
                            />
                        </button>
                        <button
                            onClick={() => router.push("/")}
                            className={`hover:bg-gray-700 px-3 py-2 rounded-md ${pathname === "/" ? "bg-gray-700" : "hover:bg-gray-700"}`}
                        >
                            <Lottie
                                animationData={HomeData}
                                style={homeStyle}
                            />
                        </button>
                        <button
                            onClick={() => router.push("/")}
                            className={`hover:bg-gray-700 px-1 py-2 rounded-md mx-4 ${pathname === "/chat" ? "bg-gray-700" : "hover:bg-gray-700"}`}
                        >
                            <Lottie
                                animationData={ChatData}
                                style={chatStyle}
                            />
                        </button>
                        <button
                            className={`hover:bg-gray-700 px-3 py-2 rounded-md ${pathname === "/menu" ? "bg-gray-700" : "hover:bg-gray-700"}`}
                        >
                            <Lottie
                                animationData={MenuData}
                                style={menuStyle}
                            />
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default NavBar;
