// app/layout.tsx (hoặc file layout tương ứng của bạn)
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ResponsiveWrapper from "../components/ResponsiveWrapper"; // Đường dẫn đến file ResponsiveWrapper.tsx
import NavBar from "../components/ConditionalNavBar"; // Đường dẫn đến file NavBar.tsx

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "TomiSakae",
  description: "Trang Web hiển thị danh sách Anime theo mùa!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <body className={inter.className}>
        <ResponsiveWrapper>{children}</ResponsiveWrapper>
        <NavBar /> {/* Thêm NavBar vào đây */}
      </body>
    </html>
  );
}
