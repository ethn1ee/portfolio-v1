"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { useStickyRefs } from "../utils/useStickyRefs";
import { customEase } from "../utils/anim";

const links = [
  { url: "/about", title: "ABOUT" },
  { url: "/blog", title: "BLOG" },
];

const NavBar = () => {
  const logoRef = useRef();

  const { addStickyElement, removeStickyElement } = useStickyRefs();

  useEffect(() => {
    addStickyElement(logoRef);
    return () => removeStickyElement(logoRef);
  }, []);

  return (
    <motion.nav
      initial={{ y: -60 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: customEase }}
      className="w-screen px-ml fixed top-0 left-0 flex items-center justify-between h-[60px] z-40"
    >
      {/* LOGO */}
      <div ref={logoRef} className="cursor-hover w-8 h-8 relative">
        <motion.div whileTap={{ scale: 0.8 }} className="w-full h-full">
          <Link href="/">
            <Image src="/logo.svg" alt="logo" fill />
          </Link>
        </motion.div>
      </div>
      {/* LINKS */}
      <div className="flex gap-ml items-center h-fit">
        {links.map((link, index) => (
          <NavLink key={link.url} link={link} />
        ))}
      </div>
    </motion.nav>
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
        whileTap={{ scale: 0.8 }}
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
