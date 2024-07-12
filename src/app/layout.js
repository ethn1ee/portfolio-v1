import { Lato } from "next/font/google";
import "./globals.css";
import GlobalComponents from "@/components/utils/globalComponents";
import { StickyRefsProvider } from "@/components/utils/useStickyRefs";
import SmoothScroll from "@/components/utils/smoothScroll";

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
            {children}
          </SmoothScroll>
        </StickyRefsProvider>
      </body>
    </html>
  );
}
