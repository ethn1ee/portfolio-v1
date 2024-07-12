"use client";

import { Great_Vibes, Playfair_Display_SC } from "next/font/google";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useMotionValueEvent,
  useScroll,
  useSpring,
} from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { customEase } from "./utils/anim";

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
    <div
      style={{
        opacity: heroOpacity,
      }}
      className="w-full h-[calc(100vh-60px)] flex items-center justify-center select-none relative"
    >
      <div className="fixed flex flex-col items-center justify-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className={
            greatVibes.className + " text-[64px] md:text-[10vw] xl:text-[164px]"
          }
        >
          Ethan Lee
        </motion.div>
        <div
          className={
            playfairDisplaySC.className +
            " text-[24px] -mt-2 md:text-[4vw] xl:text-[64px] md:-mt-[1vw] xl:-mt-3 flex flex-col items-center justify-center tracking-tighter"
          }
        >
          <motion.div
            initial={{ opacity: 0, y: -20, rotateX: -90 }}
            animate={{ opacity: 1, y: 0, rotateX: 0 }}
            transition={{ duration: 1, ease: customEase, delay: 0.5 }}
          >
            Developer & Designer
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: -20, rotateX: 90 }}
            animate={{ opacity: 1, y: 0, rotateX: 0 }}
            transition={{ duration: 1, ease: customEase, delay: 0.8 }}
            className="-mt-1 md:-mt-[0.5vw] xl:-mt-2"
          >
            Portfolio 2024
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
