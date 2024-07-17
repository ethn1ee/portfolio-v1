import { Lato } from "next/font/google";
import "./globals.css";
import { StickyRefsProvider } from "@/utils/useStickyRefs";
import SmoothScroll from "@/utils/smoothScroll";
import NavBar from "@/components/navBar";
import Cursor from "@/components/cursor";

const font = Lato({
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
      <body className={font.className}>
        <SmoothScroll>
          <StickyRefsProvider>
            <NavBar />
            <Cursor />
            {children}
          </StickyRefsProvider>
        </SmoothScroll>
      </body>
    </html>
  );
}
