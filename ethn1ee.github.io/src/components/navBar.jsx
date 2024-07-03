"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { useStickyRefs } from "./useStickyRefs";
import { customEase } from "./anim";

const links = [
  { url: "/about", title: "ABOUT" },
  { url: "/blog", title: "BLOG" },
  {
    url: "https://www.linkedin.com/in/ethn1ee/",
    title: "LINKEDIN",
  },
];

const NavBar = () => {
  const logoRef = useRef();

  const { addStickyElement, removeStickyElement } = useStickyRefs();

  useEffect(() => {
    addStickyElement(logoRef);
    return () => removeStickyElement(logoRef);
  }, []);

  return (
    <div className="w-full flex items-center justify-center h-[60px] bg-base-black z-10">
      <div className="flex justify-between items-center w-full">
        {/* LOGO */}
        <p ref={logoRef}>
          <Link href="/">ETHAN LEE</Link>
        </p>
        {/* LINKS */}
        <div className="flex gap-ml items-center">
          {links.map((link, index) => (
            <NavLink key={link.url} link={link} />
          ))}
        </div>
      </div>
    </div>
  );
};

const NavLink = ({ link }) => {
  const [isHovered, setIsHovered] = useState(false);

  const isExternal = link.url[0] !== "/";

  const navRef = useRef();

  const { addStickyElement, removeStickyElement } = useStickyRefs();

  useEffect(() => {
    addStickyElement(navRef);
    return () => removeStickyElement(navRef);
  }, [link]);

  return (
    <Link
      href={link.url}
      rel={isExternal ? "noopener noreferrer" : ""}
      target={isExternal ? "_blank" : ""}
    >
      <motion.div
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        ref={navRef}
        className="cursor-underline flex flex-col gap-xxs h-4 overflow-hidden"
      >
        <div className="flex">
          {link.title.split("").map((letter, index) => (
            <motion.small
              key={index}
              initial={{ y: 0 }}
              animate={{ y: isHovered ? -18 : 0 }}
              transition={{
                ease: customEase,
                duration: 0.5,
                delay: 0.02 * index,
              }}
            >
              {letter}
            </motion.small>
          ))}
        </div>

        <div className="flex">
          {link.title.split("").map((letter, index) => (
            <motion.small
              key={index}
              initial={{ y: 0 }}
              animate={{ y: isHovered ? -18 : 0 }}
              transition={{
                ease: customEase,
                duration: 0.5,
                delay: 0.02 * index,
              }}
            >
              {letter}
            </motion.small>
          ))}
        </div>
      </motion.div>
    </Link>
  );
};

export default NavBar;
