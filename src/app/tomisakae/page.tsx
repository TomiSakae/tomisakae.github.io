import Image from 'next/image';

const TomiSakae = () => {
    return (
        <div className="flex flex-col text-center pb-12 items-center mx-6 justify-center text-white h-screen">
            <Image
                src="/tomisakae.jpg"
                alt="TomiSakae"
                width={200}
                height={200}
                className="rounded-full"
            />
            <h1 className="text-2xl mt-4">TomiSakae</h1>
            <p className="text-lg">Số lượng truy cập trang Web!</p>
            <Image
                src="https://count.getloli.com/get/@:tomisakaewebbeta?theme=rule34"
                alt="Moe"
                width={350}
                height={350}
                className="mt-4"
            />
        </div>
    );
}

export default TomiSakae;
