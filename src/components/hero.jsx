"use client";

import { Source_Serif_4 } from "next/font/google";
import { motion } from "framer-motion";
import { customEase } from "./anim";
import { useEffect, useRef, useState } from "react";
import { useStickyRefs } from "./useStickyRefs";

const sourceSerif = Source_Serif_4({
  subsets: ["latin"],
});

const Hero = () => {
  const descRef1 = useRef();
  const descRef2 = useRef();

  const { addStickyElement, removeStickyElement } = useStickyRefs();

  useEffect(() => {
    addStickyElement(descRef1);
    addStickyElement(descRef2);
    return () => {
      removeStickyElement(descRef1);
      removeStickyElement(descRef2);
    };
  }, []);

  return (
    <div className="w-full h-[calc(100vh-60px)] flex items-center justify-center">
      <div className="flex gap-m relative">
        <div className="flex flex-col items-end absolute top-0 -left-[170px] gap-s">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 1 }}
            ref={descRef1}
            className="cursor-underline select-none"
          >
            UI / UX DESIGNER
          </motion.p>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 1 }}
            ref={descRef2}
            className="cursor-underline select-none"
          >
            SOFTWARE ENGINEER
          </motion.p>
        </div>
        <motion.div
          initial={{ opacity: 0, fontWeight: 400, letterSpacing: "-10px" }}
          animate={{ opacity: 1, fontWeight: 200, letterSpacing: "-2px" }}
          transition={{
            duration: 1,
            delay: 0.6,
            ease: customEase,
          }}
          className={
            sourceSerif.className +
            " text-[144px] tracking-tight select-none flex"
          }
        >
          {"ETHAN LEE".split("").map((letter, index) => (
            <Letter letter={letter} key={index} />
          ))}
        </motion.div>
      </div>
    </div>
  );
};

const Letter = ({ letter }) => {
  const letterRef = useRef();

  const { addStickyElement, removeStickyElement } = useStickyRefs();

  useEffect(() => {
    addStickyElement(letterRef);
    return () => removeStickyElement(letterRef);
  }, [letter]);

  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.span
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      animate={isHovered ? { fontWeight: 400 } : { fontWeight: 200 }}
      transition={{
        duration: isHovered ? 0.2 : 0.8,
        delay: isHovered ? 0 : 0.1,
      }}
      ref={letterRef}
      className="h-[100px] flex items-center overflow-hidden"
    >
      {letter === " " ? "\u00A0" : letter}
    </motion.span>
  );
};

export default Hero;
