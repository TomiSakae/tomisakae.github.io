'use client'
import Image from 'next/image';
import StarsCanvas from "../../components/ThreeBackground"
import { motion } from "framer-motion";

const TomiSakae = () => {
    const text = "TomiSakae".split("");
    const next = "NextJS Developer".split("");
    return (
        <div className="flex flex-col text-center font-bold pb-12 items-center mx-6 justify-center text-white h-screen">
            <StarsCanvas />
            <Image
                src="/tomisakae.jpg"
                alt="TomiSakae"
                width={200}
                height={200}
                className="rounded-full box-tomi"
            />
            <h1 className="text-2xl mt-4">
                {text.map((el, i) => (
                    <motion.span
                        initial={{ opacity: 0.5 }}
                        animate={{ opacity: 1 }}
                        transition={{
                            duration: 0.5,
                            delay: i / 10,
                            repeat: Infinity,
                            repeatType: "mirror"

                        }}
                        key={i}
                    >
                        {el}{""}
                    </motion.span>
                ))}
            </h1>

            <p className="text-xl font-bold relative">
                <span className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                    {next.map((el, i) => (
                        <motion.span
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{
                                duration: 0.75,
                                delay: i / 10,
                            }}
                            key={i}
                        >
                            {el}{""}
                        </motion.span>
                    ))}
                </span>
            </p>

            <Image
                src="https://count.getloli.com/get/@:TomiSakaeWeb?theme=rule34"
                alt="Moe"
                width={350}
                height={350}
                className="mt-4"
            />
        </div>
    );
}

export default TomiSakae;
