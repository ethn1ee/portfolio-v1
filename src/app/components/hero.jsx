"use client";

import {
  animate,
  motion,
  stagger,
  useMotionValueEvent,
  useScroll,
} from "framer-motion";
import { useEffect, useState } from "react";
import { customEase } from "@/utils/anim";
import StickyWrapper from "@/components/stickyWrapper";
import { nohemi } from "../../components/nohemi";
import { projects } from "@/data/projects";

const Hero = () => {
  const { scrollYProgress } = useScroll();

  const [heroOpacity, setHeroOpacity] = useState(1);
  const [height, setHeight] = useState(0);

  const updateHeight = () => {
    setHeight(window.innerHeight - 60 - 50 * (projects.length + 1));
  };
  useEffect(() => {
    updateHeight();
    window.addEventListener("resize", () => updateHeight());
    return () => window.removeEventListener("resize", () => updateHeight());
  }, []);

  useMotionValueEvent(scrollYProgress, "change", (current) => {
    setHeroOpacity(Math.max(0, 1 - current * 2));
  });

  return (
    <div
      id="home-hero"
      className={`fixed select-none w-[calc(100vw-40px)] flex flex-col ${nohemi.className}`}
      style={{
        opacity: heroOpacity,
        display: heroOpacity === 0 ? "none" : "",
        height: height,
      }}
    >
      <motion.div
        initial={{ opacity: 0, fontWeight: 0 }}
        animate={{ opacity: 1, fontWeight: 800 }}
        transition={{ duration: 1.5, ease: customEase }}
        className="text-[18vw] md:text-[18.5vw] lg:text-[18.9vw] leading-none w-full flex justify-center text-nowrap overflow-hidden"
      >
        ETHAN LEE
      </motion.div>

      <motion.div
        initial={{ opacity: 0, fontWeight: 0 }}
        animate={{ opacity: 1, fontWeight: 700 }}
        transition={{ delay: 2, duration: 1.5, ease: customEase }}
        className="w-full flex justify-between font-bold -mt-[3vw] text-[4vw] md:text-[3vw]"
      >
        <div>CREATIVE</div>
        <div>DEVELOPER</div>
      </motion.div>
    </div>
  );
};

export default Hero;
