// app/layout.tsx (hoặc file layout tương ứng của bạn)
import type { Metadata } from "next";
import Script from "next/script";
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
      <body className={`${inter.className} bg-black`}>
        <ResponsiveWrapper>{children}<NavBar /></ResponsiveWrapper>
        <Script
          src="https://cubism.live2d.com/sdk-web/cubismcore/live2dcubismcore.min.js"
          strategy="beforeInteractive"
        />
        <Script
          src="https://cdn.jsdelivr.net/gh/dylanNew/live2d/webgl/Live2D/lib/live2d.min.js"
          strategy="beforeInteractive"
        />
      </body>
    </html>
  );
}
