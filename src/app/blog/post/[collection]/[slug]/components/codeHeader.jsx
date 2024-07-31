"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { customEase } from "@/utils/anim";
import { Check, CopySimple } from "@phosphor-icons/react";

const CodeHeader = ({ language, code }) => {
  const [isHovered, setIsHovered] = useState(false);
  const copyRef = useRef();
  const checkRef = useRef();
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = () => {
    setIsCopied(true);
    navigator.clipboard.writeText(code);
    setTimeout(() => setIsCopied(false), 3000);
  };

  return (
    <div className="w-full flex justify-between items-center px-m py-xs bg-neutral-1000 border-b border-neutral-900">
      {/* LANGUAGE */}
      <small className="text-xs !text-neutral-400 select-none">
        {language}
      </small>

      {/* COPY BUTTON */}
      <motion.button
        whileHover={{ opacity: 0.8, transition: { duration: 0.2 } }}
        onClick={handleCopy}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="!text-xs !text-neutral-400 w-5 h-5 overflow-hidden relative -right-1"
      >
        <motion.div
          animate={{ scale: isCopied ? 1 : 0 }}
          transition={{ duration: 0.3, ease: customEase }}
          className="absolute top-[2px] right-0"
        >
          <Check size={16} color="#9f9c9c" />
        </motion.div>
        <motion.div
          animate={{ scale: isCopied ? 0 : 1 }}
          transition={{ duration: 0.3, ease: customEase }}
          className="absolute top-[2px] right-0"
        >
          <CopySimple size={16} color="#9f9c9c" />
        </motion.div>
      </motion.button>
    </div>
  );
};

export default CodeHeader;
