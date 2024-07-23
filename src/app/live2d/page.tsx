// pages/index.tsx
import Image from 'next/image';
import images from '../../../public/live2d/steam_models/img';

const Home = () => {
    return (
        <div className="flex flex-wrap mb-16">
            {images.map((image) => (
                <div key={image.id} className="w-1/2 p-[2px]">
                    <div className="w-full aspect-w-1 aspect-h-1 relative">
                        <Image
                            src={image.src}
                            alt={image.alt}
                            width={180}
                            height={180}
                            className="w-[180px] rounded-sm h-[180px]"
                        />
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Home;
