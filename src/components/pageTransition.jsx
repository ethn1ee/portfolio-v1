"use client";

import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";

const PageTransition = ({ children }) => {
  const pathName = usePathname();

  const expand = {
    initial: {
      top: 0,
    },
    enter: (i) => ({
      top: "100vh",
      transition: {
        duration: 0.4,

        delay: 0.05 * i,

        ease: [0.215, 0.61, 0.355, 1],
      },

      transitionEnd: { height: "0", top: "0" },
    }),
    exit: (i) => ({
      height: "100vh",
      transition: {
        duration: 0.4,

        delay: 0.05 * i,

        ease: [0.215, 0.61, 0.355, 1],
      },
    }),
  };

  const opacity = {
    initial: {
      opacity: 0.5,
    },
    enter: {
      opacity: 0,
    },
    exit: {
      opacity: 0.5,
    },
  };

  const anim = (variants, custom = null) => {
    return {
      initial: "initial",

      animate: "enter",

      exit: "exit",

      custom,

      variants,
    };
  };

  const nbOfColumns = 5;

  return (
    <AnimatePresence mode="wait">
      <div key={pathName} className="bg-base-white">
        <motion.div
          {...anim(opacity)}
          className="fixed w-full h-screen bg-red z-40 pointer-events-none top-[60px] left-0"
        />
        <div className="fixed w-screen h-screen flex left-0 top-[60px] pointer-events-none z-50">
          {[...Array(nbOfColumns)].map((_, i) => {
            return (
              <motion.div
                className="relative h-full w-full bg-base-white"
                key={i}
                {...anim(expand, nbOfColumns - i)}
              />
            );
          })}
        </div>
        {children}
      </div>
    </AnimatePresence>
  );
};

export default PageTransition;
