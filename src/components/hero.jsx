"use client";

import { Great_Vibes, Playfair_Display_SC } from "next/font/google";
import {
  motion,
  useMotionValue,
  useMotionValueEvent,
  useScroll,
  useSpring,
} from "framer-motion";
import { useEffect, useRef, useState } from "react";

const greatVibes = Great_Vibes({
  subsets: ["latin"],
  weight: ["400"],
});

const playfairDisplaySC = Playfair_Display_SC({
  subsets: ["latin"],
  weight: ["400"],
});

const Hero = () => {
  const { scrollYProgress } = useScroll();

  const [heroOpacity, setHeroOpacity] = useState(1);

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    setHeroOpacity(Math.max(0, 1 - latest * 3));
  });

  return (
    <motion.div
      style={{
        opacity: heroOpacity,
      }}
      className="w-full h-[calc(100vh-60px)] flex items-center justify-center select-none relative"
    >
      <div className="fixed flex flex-col items-center justify-center">
        <div className={greatVibes.className + " text-[164px]"}>Ethan Lee</div>
        <div
          className={
            playfairDisplaySC.className +
            " text-[64px] -mt-3 flex flex-col items-center justify-center tracking-tighter"
          }
        >
          <div>Developer & Designer</div>
          <div className="-mt-2">Portfolio 2024</div>
        </div>
      </div>
    </motion.div>
  );
};

export default Hero;
