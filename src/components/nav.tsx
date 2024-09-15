import { LiaBatteryFullSolid } from "react-icons/lia";
import { FaRegSquare } from "react-icons/fa6";
import { CiMenuBurger } from "react-icons/ci";
import { RiPlayReverseLargeLine } from "react-icons/ri";
import { useRouter, usePathname } from 'next/navigation';

const Nav = () => {
    const router = useRouter();
    const pathname = usePathname();
    const isAniPhone = pathname === '/AniPhone';

    return (
        <>
            <div className='flex justify-between items-center text-white mx-4 pt-1'>
                <div className='flex items-center'>
                    <div className='text-md'>
                        {new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })}
                    </div>
                </div>
                <div className='flex items-center'>
                    <LiaBatteryFullSolid className='mr-1 mt-[2px] text-2xl' />
                    <span className=''>100%</span>
                </div>
            </div>
            <div className='absolute bottom-0 left-0 right-0 flex justify-between items-center text-white pb-1 mx-6'>
                <div className='flex-1 flex justify-center p-2 rounded-full hover:bg-gray-200 hover:bg-opacity-20 transition-all duration-300'>
                    <div className='flex flex-col items-center'>
                        <CiMenuBurger className='text-md' />
                    </div>
                </div>
                <div className='flex-1 flex justify-center p-2 rounded-full hover:bg-gray-200 hover:bg-opacity-20 transition-all duration-300'>
                    <div className='flex flex-col items-center'>
                        <FaRegSquare className='text-md' />
                    </div>
                </div>
                <div className="flex-1 flex justify-center p-2 rounded-full hover:bg-gray-200 hover:bg-opacity-20 transition-all duration-300"
                    onClick={() => {
                        if (!isAniPhone) {
                            router.back();
                        }
                    }}
                >
                    <div className='flex flex-col items-center'>
                        <RiPlayReverseLargeLine className='text-lg' />
                    </div>
                </div>
            </div>
        </>
    );
};

export default Nav;