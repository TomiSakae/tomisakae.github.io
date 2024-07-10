import Image from 'next/image'

export default function Home() {
  return (
    <div className="relative w-screen h-screen">
    <div className="absolute inset-0 bg-custom-background bg-cover bg-center"></div>
    <div className="absolute inset-0 bg-black opacity-50"></div>
    <div className="relative flex items-center justify-center p-5 flex-col w-full h-full">
      <div className="text-white text-center font-bold">
        <h1 className="md:text-3xl text-2xl mb-5">TomiSakae</h1>
        <div className="md:text-2xl text-lg">
            <p>Cốt Truyện Zenless Zone Zero </p>
            <p>Chương Zero</p>
        </div>
      </div>
      <Image
        src="/chuong_zero.png"
        alt="Ảnh Chương Zero"
        width={891}
        height={849}
        className="mt-12 h-auto sm:w-4/5 md:w-1/2 lg:w-1/4 xl:w-1/5 2xl:w-1/5"
      />
      <Image
        src="/khung_chuong_0.png"
        alt="Khung Chương Zero"
        width={419}
        height={110}
        className="mt-12 h-auto sm:w-4/5 md:w-1/2 lg:w-1/4 xl:w-1/5 2xl:w-1/5"
      />
    </div>
  </div>
  );
}
