import { Fira_Sans } from "next/font/google";
import "./globals.css";
import GlobalComponents from "@/components/globalComponents";
import { StickyRefsProvider } from "@/components/useStickyRefs";
import SmoothScroll from "@/components/smoothScroll";

const firaSans = Fira_Sans({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata = {
  title: "ETHAN LEE",
  description: "Ethan's personal website",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={[firaSans.className]}>
        <StickyRefsProvider>
          <GlobalComponents />
          <SmoothScroll>
            <div
              className="w-full relative mt-[60px] bg-base-black z-10"
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
