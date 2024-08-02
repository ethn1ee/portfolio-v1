"use client";

import {
  animate,
  motion,
  stagger,
  useMotionValue,
  useMotionValueEvent,
  useScroll,
  useSpring,
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

  const staggerText = stagger(0.03, { startDelay: 1 });

  useEffect(() => {
    animate(
      ".stagger-letter",
      { rotateX: [90, 0], opacity: [0, 1], z: [-50, 0], y: [-20, 0] },
      { delay: staggerText, ease: customEase, duration: 0.5 }
    );
  }, []);

  return (
    <div
      id="home-hero"
      className="fixed select-none"
      style={{ opacity: heroOpacity }}
    >
      <motion.div
        initial={{ opacity: 0, fontWeight: 100 }}
        animate={{ opacity: 1, fontWeight: 800 }}
        transition={{ duration: 1, ease: customEase }}
        className="text-[64px] md:text-[12vw] leading-[64px] md:leading-[12vw] tracking-tight -translate-x-[0.6vw]"
      >
        Ethan Lee
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, ease: customEase, delay: 1 }}
        className="flex text-[24px] md:text-[3vw] tracking-tighter font-extralight"
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

      {/* <StickyWrapper cursorType={"underline"}>
        <motion.div
          style={{
            rotateX: springRotate2,
            transformOrigin: "top",
            transformPerspective: 500,
          }}
          className="inline"
        >
          Portfolio 2024 ed.
        </motion.div>
      </StickyWrapper> */}
    </div>
  );
};

const LetterSplit = ({ text }) => {
  return (
    <div className="flex w-fit">
      {text.split("").map((letter, index) => (
        <div
          key={index}
          style={{ transformPerspective: 500 }}
          className="stagger-letter"
        >
          {letter === " " ? "\u00A0" : letter}
        </div>
      ))}
    </div>
  );
};

export default Hero;
