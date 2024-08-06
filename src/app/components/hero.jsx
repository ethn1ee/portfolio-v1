"use client";

import {
  animate,
  motion,
  stagger,
  useMotionValueEvent,
  useScroll,
} from "framer-motion";
import { useEffect, useState } from "react";
import anim, { customEase } from "@/utils/anim";
import StickyWrapper from "@/components/stickyWrapper";

const Hero = () => {
  const { scrollYProgress } = useScroll();

  const [heroOpacity, setHeroOpacity] = useState(1);

  useMotionValueEvent(scrollYProgress, "change", (current) => {
    setHeroOpacity(Math.max(0, 1 - current * 2));
  });

  const staggerText = stagger(0.04, { startDelay: 1, ease: customEase });

  useEffect(() => {
    animate(
      ".stagger-letter",
      { opacity: [0, 1], y: [-30, 0] },
      { delay: staggerText, duration: 0.3 }
    );
  }, []);

  return (
    <div
      id="home-hero"
      className="fixed select-none"
      style={{ opacity: heroOpacity, display: heroOpacity === 0 ? "none" : "" }}
    >
      <motion.div
        initial={{ opacity: 0, fontWeight: 100 }}
        animate={{ opacity: 1, fontWeight: 800 }}
        transition={{ duration: 1.5, ease: customEase }}
        className="text-[64px] md:text-[12vw] leading-[0.8] tracking-tight -translate-x-[0.6vw]"
      >
        Ethan Lee
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, ease: customEase, delay: 1 }}
        className="flex text-[24px] md:text-[3vw] mt-[10px] md:mt-[1vw] tracking-tighter font-extralight"
      >
        <StickyWrapper cursorType={"underline"}>
          <div>
            <LetterSplit text={"Developer"} />
          </div>
        </StickyWrapper>
        <LetterSplit text={" / "} />
        <StickyWrapper cursorType={"underline"}>
          <div>
            <LetterSplit text={"Designer"} />
          </div>
        </StickyWrapper>
      </motion.div>
    </div>
  );
};

const LetterSplit = ({ text }) => {
  return (
    <div className="flex w-fit overflow-hidden">
      {text.split("").map((letter, index) => (
        <div key={index} className="stagger-letter">
          {letter === " " ? "\u00A0" : letter}
        </div>
      ))}
    </div>
  );
};

export default Hero;
