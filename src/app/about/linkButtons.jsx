"use client";

import { useState, useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useStickyRefs } from "@/components/utils/useStickyRefs";
import { customEase } from "@/components/utils/anim";

export const LinkButton = ({ link }) => {
  const [isHovered, setIsHovered] = useState(false);

  const navRef = useRef();

  const { addStickyElement, removeStickyElement } = useStickyRefs();

  useEffect(() => {
    addStickyElement(navRef);
    return () => removeStickyElement(navRef);
  }, [link]);

  return (
    <Link href={link.url} rel="noopener noreferrer" target="_blank">
      <motion.div
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        ref={navRef}
        whileTap={{ scale: 0.8 }}
        className="cursor-underline flex flex-col gap-xxs h-5 overflow-hidden stagger-button"
      >
        <div className="flex">
          {link.title.split("").map((letter, index) => (
            <motion.p
              key={index}
              initial={{ y: 0 }}
              animate={{ y: isHovered ? -20 : 0 }}
              transition={{
                ease: customEase,
                duration: 0.5,
                delay: 0.02 * index,
              }}
            >
              {letter}
            </motion.p>
          ))}
        </div>

        <div className="flex">
          {link.title.split("").map((letter, index) => (
            <motion.p
              key={index}
              initial={{ y: 0 }}
              animate={{ y: isHovered ? -20 : 0 }}
              transition={{
                ease: customEase,
                duration: 0.5,
                delay: 0.02 * index,
              }}
            >
              {letter}
            </motion.p>
          ))}
        </div>
      </motion.div>
    </Link>
  );
};

export const EmailButton = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  const navRef = useRef();

  const { addStickyElement, removeStickyElement } = useStickyRefs();

  useEffect(() => {
    addStickyElement(navRef);
    return () => removeStickyElement(navRef);
  }, [isCopied]);

  const handleCopy = () => {
    setIsCopied(true);
    navigator.clipboard.writeText("lth20031021@gmail.com");
    setTimeout(() => setIsCopied(false), 3000);
  };

  return (
    <motion.div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleCopy}
      ref={navRef}
      whileTap={{ scale: 0.8 }}
      className="cursor-underline cursor-pointer flex flex-col gap-xxs h-5 overflow-hidden stagger-button"
    >
      <div className="flex">
        {"EMAIL".split("").map((letter, index) => (
          <motion.p
            key={index}
            initial={{ y: 0 }}
            animate={{
              y: isCopied ? -40 : isHovered ? -20 : 0,
            }}
            transition={{
              ease: customEase,
              duration: 0.5,
              delay: 0.02 * index,
            }}
          >
            {letter}
          </motion.p>
        ))}
      </div>

      <div className="flex">
        {"COPY?".split("").map((letter, index) => (
          <motion.p
            key={index}
            initial={{ y: 0 }}
            animate={{
              y: isCopied ? -40 : isHovered ? -20 : 0,
            }}
            transition={{
              ease: customEase,
              duration: 0.5,
              delay: 0.02 * index,
            }}
          >
            {letter}
          </motion.p>
        ))}
      </div>

      <AnimatePresence>
        {isCopied && (
          <div className="flex">
            {"COPIED!".split("").map((letter, index) => (
              <motion.p
                key={index}
                initial={{ y: 0 }}
                animate={{ y: isCopied ? -40 : 0 }}
                exit={{ y: 0 }}
                transition={{
                  ease: customEase,
                  duration: 0.5,
                  delay: 0.02 * index,
                }}
              >
                {letter}
              </motion.p>
            ))}
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
