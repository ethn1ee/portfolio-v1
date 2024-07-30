import { Lato, Sora } from "next/font/google";
import "./globals.css";
import { StickyRefsProvider } from "@/utils/useStickyRefs";
import SmoothScroll from "@/utils/smoothScroll";
import NavBar from "@/components/navBar";
import Cursor from "@/components/cursor";

const lato = Lato({
  subsets: ["latin"],
  weight: ["100", "300", "400", "700", "900"],
});

// const firaSans = Fira_Sans({
//   subsets: ["latin"],
//   weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
// });

const sora = Sora({
  subsets: ["latin"],
});

export const metadata = {
  title: "ETHAN LEE",
  description: "Ethan's personal website",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={sora.className}>
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
