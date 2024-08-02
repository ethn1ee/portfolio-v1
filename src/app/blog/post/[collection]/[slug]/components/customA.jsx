"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { motion } from "framer-motion";

const StickyWrapper = dynamic(() => import("@/components/stickyWrapper"), {
  ssr: false,
});

const CustomA = ({ children, href }) => {
  const text = children[0];

  return (
    <Link href={href} target="_blank" rel="noopener noreferrer">
      <StickyWrapper cursorType="underline">
        <motion.span
          whileHover={{ opacity: 0.8 }}
          className="cursor-pointer relative z-10 inline-block w-fit h-[25px] !text-primary-400"
        >
          {text}
        </motion.span>
      </StickyWrapper>
    </Link>
  );
};

export default CustomA;
