export default function Home() {
  return (
    <div className="relative w-screen h-screen">
    <div className="absolute inset-0 bg-custom-background bg-cover bg-center"></div>
    <div className="absolute inset-0 bg-black opacity-50"></div> {/* Lớp phủ mờ */}
    <div className="relative flex items-center justify-center w-full h-full">
      <div className="bg-black p-8 rounded-2xl mx-auto text-white text-center font-bold">
        <h1 className="text-2xl mb-5">TomiSakae</h1>
        <div className="text-lg">
            <p>Cốt Truyện Zenless Zone Zero </p>
            <p>Chương 0 Và Chương 1</p>
          <p className="mt-5 rounded-3xl bg-gradient-to-r from-gradient-bg-start to-gradient-bg-end py-2 px-4">Đang phát triển...</p>
        </div>
      </div>
    </div>
  </div>
  );
}
