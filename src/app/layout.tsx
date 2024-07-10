import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ZZZ Chương Zero",
  description: "Đem tới trải nghiệm cốt truyện chương 0 của tựa game Zenless Zone Zero đến với mọi người bằng hình thức truyện chat!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <body className={inter.className}>
        {children}
        </body>
    </html>
  );
}
