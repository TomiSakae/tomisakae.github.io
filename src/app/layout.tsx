// app/layout.tsx (hoặc file layout tương ứng của bạn)
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ResponsiveWrapper from "../components/ResponsiveWrapper"; // Đường dẫn đến file ResponsiveWrapper.tsx

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
      </body>
    </html>
  );
}
