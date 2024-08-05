import localFont from "next/font/local";
import "./globals.scss";
import { StickyRefsProvider } from "@/utils/useStickyRefs";
import SmoothScroll from "@/utils/smoothScroll";
import NavBar from "@/components/navBar";
import Cursor from "@/components/cursor";

const nohemi = localFont({ src: "./components/Nohemi-VF.ttf" });

export const metadata = {
  title: "ETHAN LEE",
  description: "Ethan's personal website",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={nohemi.className}>
        <SmoothScroll>
          <StickyRefsProvider>
            <NavBar />
            <Cursor />
            <main className="w-full relative mt-[60px] bg-base-black overflow-y-auto overflow-x-hidden">
              {children}
            </main>
          </StickyRefsProvider>
        </SmoothScroll>
      </body>
    </html>
  );
}
