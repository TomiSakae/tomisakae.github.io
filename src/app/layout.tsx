import type { Metadata } from "next";
import { Inter } from "next/font/google";
// import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Zenless Zone Zero Cốt Truyện",
  description: "Đem tới trải nghiệm cốt truyện chương 0 và 1 của tựa game Zenless Zone Zero đến với mọi người bằng hình thức truyện chat!",
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
