import { Lato } from "next/font/google";
import "./globals.css";
import GlobalComponents from "@/components/globalComponents";
import { StickyRefsProvider } from "@/components/useStickyRefs";
import SmoothScroll from "@/components/smoothScroll";

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
        <StickyRefsProvider>
          <GlobalComponents />
          <SmoothScroll>
            <div
              className="w-full relative mt-[60px] bg-base-black"
              style={{ scrollbarWidth: "none" }}
            >
              {children}
            </div>
          </SmoothScroll>
        </StickyRefsProvider>
      </body>
    </html>
  );
}
