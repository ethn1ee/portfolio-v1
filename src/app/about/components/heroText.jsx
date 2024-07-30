"use client";

import { Playfair_Display_SC } from "next/font/google";
import { animate, stagger } from "framer-motion";
import { customEase } from "@/utils/anim";
import { useEffect } from "react";

const playfairDisplaySC = Playfair_Display_SC({
  subsets: ["latin"],
  weight: ["400", "700"],
});

const HeroText = () => {
  const staggerText = stagger(0.2);

  useEffect(() => {
    animate(
      ".stagger-text",
      { opacity: [0, 1], scaleY: [0, 1] },
      { delay: staggerText, ease: customEase, duration: 0.5 }
    );
  }, []);

  return (
    <div className="text-neutral-900 select-none fixed">
      <div className="uppercase text-inherit font-extrabold text-[3vw] tracking-tight stagger-text">
        Currently in
      </div>
      <div
        className={
          playfairDisplaySC.className +
          " uppercase text-inherit font-bold text-[12vw] -mt-[3vw] tracking-tight stagger-text"
        }
      >
        Atlanta, GA
      </div>
      <div className="uppercase text-inherit font-extrabold text-[3vw] tracking-tight stagger-text">
        Attending
      </div>
      <div
        className={
          playfairDisplaySC.className +
          " uppercase text-inherit font-bold text-[9vw] -mt-[2vw] tracking-tight stagger-text"
        }
      >
        Emory University
      </div>
    </div>
  );
};

export default HeroText;
