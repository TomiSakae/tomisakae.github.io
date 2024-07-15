import Image from 'next/image';
import { FaFacebook } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import { SiZalo } from "react-icons/si";
import Link from 'next/link';
import StarsCanvas from "../../components/ThreeBackground"

const TomiSakae = () => {
    return (
        <div className="flex flex-col text-center font-bold pb-12 items-center mx-6 justify-center text-white h-screen">
            <StarsCanvas />
            <Image
                src="/tomisakae.jpg"
                alt="TomiSakae"
                width={200}
                height={200}
                className="rounded-full"
            />
            <h1 className="text-2xl mt-4">TomiSakae</h1>

            <p className="text-xl font-bold relative">
                <span className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                    NextJS Developer
                </span>
            </p>

            <Image
                src="https://count.getloli.com/get/@:tomisakaewebbeta?theme=rule34"
                alt="Moe"
                width={350}
                height={350}
                className="mt-4"
            />
            <div className="flex items-center space-x-6 text-lg mt-6 mb-4">
                <Link href="https://www.facebook.com/TomiSakaeAnime/" target="_blank" className="text-white">
                    <FaFacebook className="w-8 h-8" />
                </Link>
                <Link href="https://github.com/TomiSakae" className="text-white">
                    <FaGithub className="w-8 h-8" />
                </Link>
                <Link href="https://zalo.me/0762605309" target="_blank" className="bg-white text-black rounded-full flex items-center justify-center w-8 h-8">
                    <SiZalo className="w-6 h-6" />
                </Link>
            </div>
        </div>
    );
}

export default TomiSakae;
