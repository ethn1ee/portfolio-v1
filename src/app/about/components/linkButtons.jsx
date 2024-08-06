"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useStickyRefs } from "@/utils/useStickyRefs";
import { customEase } from "@/utils/anim";
import { animate, stagger } from "framer-motion";

const LinkButtons = () => {
  const links = [
    { url: "./Ethan_Lee_resume.pdf", title: "RESUME" },
    { url: "https://github.com/ethn1ee", title: "GITHUB" },
    { url: "https://www.linkedin.com/in/ethn1ee/", title: "LINKEDIN" },
  ];

  const staggerButton = stagger(0.1, { startDelay: 1 });

  useEffect(() => {
    animate(
      ".stagger-button",
      { opacity: [0, 1], y: [100, 0] },
      { delay: staggerButton, ease: customEase, duration: 1 }
    );
  }, []);
  return (
    <div className="flex gap-l w-[30vw] fixed bottom-ml z-20">
      {links.map((link) => (
        <LinkButton key={link.url} link={link} />
      ))}
      <EmailButton />
    </div>
  );
};

const LinkButton = ({ link }) => {
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
        className="cursor-underline flex flex-col gap-xs h-5 md:h-6 overflow-hidden stagger-button"
      >
        <div className="flex">
          {link.title.split("").map((letter, index) => (
            <motion.p
              key={index}
              initial={{ y: 0 }}
              animate={{ y: isHovered ? -22 : 0 }}
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
              animate={{ y: isHovered ? -22 : 0 }}
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

const EmailButton = () => {
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
      className="cursor-underline cursor-pointer flex flex-col w-fit gap-xs h-5 md:h-6 overflow-y-clip stagger-button"
    >
      <div className="flex w-fit">
        {"EMAIL".split("").map((letter, index) => (
          <motion.p
            key={index}
            initial={{ y: 0 }}
            animate={{
              y: isCopied ? -40 : isHovered ? -22 : 0,
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

      <div className="flex w-fit">
        {"COPY?".split("").map((letter, index) => (
          <motion.p
            key={index}
            initial={{ y: 0 }}
            animate={{
              y: isCopied ? -40 : isHovered ? -22 : 0,
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

      {isCopied && (
        <div className="flex w-fit">
          {"COPIED!".split("").map((letter, index) => (
            <motion.p
              key={index}
              initial={{ y: 0 }}
              animate={{ y: isCopied ? -45 : 0 }}
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
    </motion.div>
  );
};

export default LinkButtons;
