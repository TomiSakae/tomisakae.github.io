// components/NavBar.tsx
import React from "react";
import { useRouter, usePathname } from "next/navigation";
import Image from 'next/image';
import Lottie from 'lottie-react';
import HomeData from '../icon/home.json';
import DiceData from '../icon/dice.json';
import ChatData from '../icon/chat.json';
import MenuData from '../icon/menu.json';
import { useViewport } from "../hooks/useViewport"; // Import the useViewport hook

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
    const { width } = useViewport(); // Use the useViewport hook to get viewport width

    // Determine margin classes based on viewport width
    let chatMargin = "mx-5";
    let diceMargin = "mx-5";

    if (width < 340) {
        chatMargin = "mx-3";
        diceMargin = "mx-3";
    } else if (width > 400) {
        chatMargin = "mx-7";
        diceMargin = "mx-7";
    }

    return (
        <nav className="fixed bottom-0 left-0 w-screen bg-zinc-800 text-white">
            <div className="mx-auto px-2">
                <div className="relative flex items-center h-12">
                    <div className="flex items-center justify-center flex-1 items-stretch justify-start">
                        <button
                            onClick={() => router.push("/tomisakae")}
                            className={`py-2 rounded-md text-sm`}
                        >
                            <Image
                                src={"/tomisakae.jpg"}
                                alt={"TomiSakae"}
                                width={25}
                                height={25}
                                priority={true}
                                className="rounded-2xl w-[25px] h-[25px]"
                                placeholder="empty"
                            />
                        </button>
                        <button
                            onClick={() => router.push("/random")}
                            className={`hover:bg-gray-700 ${diceMargin} py-2 rounded-md ${pathname === "/random" || pathname === "/random/anime" ? "bg-gray-700" : "hover:bg-gray-700"}`}
                        >
                            <Lottie
                                animationData={DiceData}
                                style={diceStyle}
                            />
                        </button>
                        <button
                            onClick={() => router.push("/")}
                            className={`hover:bg-gray-700 px-2 py-2 rounded-md ${pathname === "/" ? "bg-gray-700" : "hover:bg-gray-700"}`}
                        >
                            <Lottie
                                animationData={HomeData}
                                style={homeStyle}
                            />
                        </button>
                        <button
                            onClick={() => {
                                router.push("/chat");
                                window.sessionStorage.setItem('reload', 'true');
                            }}
                            className={`hover:bg-gray-700 ${chatMargin} px-1 py-2 rounded-md ${pathname === "/chat" || pathname === "/chat/vn" ? "bg-gray-700" : "hover:bg-gray-700"}`}
                        >
                            <Lottie
                                animationData={ChatData}
                                style={chatStyle}
                            />
                        </button>
                        <button

                            className="py-2 rounded-md"
                        >
                            <Image
                                src={"/7G.png"}
                                alt={"7G"}
                                width={30}
                                height={17}
                                priority={true}
                                className="w-[30px] h-[17px]"
                                placeholder="empty"
                            />
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default NavBar;
