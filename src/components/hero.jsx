"use client";

import { Great_Vibes, Playfair_Display_SC } from "next/font/google";
import {
  motion,
  useMotionValue,
  useMotionValueEvent,
  useScroll,
  useSpring,
} from "framer-motion";
import { useEffect, useState } from "react";
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

  const rotateDegree1 = useMotionValue(-90);
  const rotateDegree2 = useMotionValue(-90);
  const springOption = { stiffness: 80, damping: 8, mass: 2 };
  const springRotate1 = useSpring(rotateDegree1, springOption);
  const springRotate2 = useSpring(rotateDegree2, springOption);

  useEffect(() => {
    setTimeout(() => rotateDegree1.set(0), 700);
    setTimeout(() => rotateDegree2.set(0), 1000);
  }, []);

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
          transition={{ duration: 1, ease: customEase }}
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
            style={{
              rotateX: springRotate1,
              transformOrigin: "top",
              transformPerspective: 500,
            }}
          >
            Developer & Designer
          </motion.div>
          <motion.div
            style={{
              rotateX: springRotate2,
              transformOrigin: "top",
              transformPerspective: 500,
            }}
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
