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

  const [highlightedIndices, setHighlightedIndices] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      const indices = [];
      while (indices.length < 2) {
        const randomIndex = Math.floor(Math.random() * "ETHANLEE".length);
        if (!indices.includes(randomIndex)) {
          indices.push(randomIndex);
        }
      }
      setHighlightedIndices(indices);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

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
      <div className="w-full flex justify-center text-nowrap overflow-hidden">
        {"ETHANLEE".split("").map((char, index) => (
          <motion.span
            key={index}
            initial={{ opacity: 0, fontWeight: 0 }}
            animate={{
              opacity: 1,
              fontWeight: highlightedIndices.includes(index) ? 800 : 500,
            }}
            transition={{ duration: 2, ease: customEase }}
            className="text-[18.8vw] md:text-[19.4vw] lg:text-[20vw] leading-none"
          >
            {char}
          </motion.span>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, fontWeight: 0 }}
        animate={{ opacity: 1, fontWeight: 700 }}
        transition={{ delay: 2, duration: 1.5, ease: customEase }}
        className="w-full flex justify-between gap-m font-bold leading-none -mt-[3vw] text-[2vw]"
      >
        <div>CREATIVE</div>
        <div className="flex-1 h-[2vw] bg-base-white" />
        <div>DEVELOPER</div>
      </motion.div>
    </div>
  );
};

export default Hero;
