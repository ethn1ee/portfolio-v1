import { Lato } from "next/font/google";
import "./globals.scss";
import { StickyRefsProvider } from "@/utils/useStickyRefs";
import SmoothScroll from "@/utils/smoothScroll";
import NavBar from "@/components/navBar";
import Cursor from "@/components/cursor";

const lato = Lato({
  subsets: ["latin"],
  weight: ["100", "300", "400", "700", "900"],
});

export const metadata = {
  title: "ETHAN LEE",
  description: "Ethan's personal website",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={lato.className}>
        <SmoothScroll>
          <StickyRefsProvider>
            <NavBar />
            <Cursor />
            <div className="w-full relative mt-[60px] bg-base-black overflow-y-auto overflow-x-hidden">
              {children}
            </div>
          </StickyRefsProvider>
        </SmoothScroll>
      </body>
    </html>
  );
}
