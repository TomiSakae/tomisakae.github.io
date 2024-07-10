import KitsuList from '../components/KitsuList';
import { FaCalendar } from "react-icons/fa";
import { MdExpandMore } from "react-icons/md";

export default function Home() {
  return (
    <main className="pt-12"> {/* Thêm padding phía trên để dịch chuyển nội dung phía dưới nav xuống */}
      <nav className="bg-black pt-3 pb-3 fixed w-full top-0 z-10">
        <div className="font-bold text-white container mx-auto flex items-center justify-between"> {/* Sử dụng flex và items-center, justify-center để căn chỉnh */}
          <div className="flex">
            <p className="text-sm ml-4">TV</p>
            <MdExpandMore className="mr-10 ml-1 text-xl"/>
            <h1 className="text-sm">Mùa Đông 2024</h1>
          </div>
          <FaCalendar className="text-sm mr-4" />
        </div>
      </nav>
      <div className="container mx-auto"> {/* Điều chỉnh margin top của phần nội dung */}
        <KitsuList />
      </div>
    </main>
  );
}
