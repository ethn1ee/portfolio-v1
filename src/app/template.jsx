"use client";

import { customEase } from "@/components/utils/anim";
import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";

const Template = ({ children }) => {
  const pathName = usePathname();

  return (
    <motion.div
      key={pathName}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1, ease: customEase }}
    >
      {children}
    </motion.div>
  );
};

export default Template;
