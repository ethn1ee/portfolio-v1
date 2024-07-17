"use client";

import { customEase } from "@/utils/anim";
import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";

const Template = ({ children }) => {
  const pathName = usePathname();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathName}
        // initial={{ opacity: 0, scale: 0.97 }}
        // animate={{ opacity: 1, scale: 1 }}
        // transition={{ duration: 0.5, ease: customEase }}
        className="w-full relative mt-[60px] bg-base-black"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

export default Template;
