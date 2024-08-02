"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { useState } from "react";
import { customEase } from "../utils/anim";
import StickyWrapper from "./stickyWrapper";

const links = [
  { url: "/about", title: "ABOUT" },
  { url: "/blog", title: "BLOG" },
];

const NavBar = () => {
  return (
    <motion.nav
      initial={{ y: -60 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: customEase }}
      id="navbar"
      className="w-screen px-ml fixed top-0 left-0 flex items-center justify-between h-[60px] bg-base-black z-10"
    >
      {/* LOGO */}
      <StickyWrapper cursorType={"hover"}>
        <div className="w-8 h-8 relative">
          <motion.div whileTap={{ scale: 0.8 }} className="w-full h-full">
            <Link href="/">
              <Image src="/logo.svg" alt="logo" fill />
            </Link>
          </motion.div>
        </div>
      </StickyWrapper>
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

  return (
    <Link
      href={link.url}
      rel={isExternal ? "noopener noreferrer" : ""}
      target={isExternal ? "_blank" : ""}
    >
      <StickyWrapper cursorType={"underline"}>
        <motion.div
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          whileTap={{ scale: 0.8 }}
          className="flex flex-col gap-xs md:gap-xxs h-4 md:h-5 overflow-hidden"
        >
          <div className="flex">
            {link.title.split("").map((letter, index) => (
              <motion.small
                key={index}
                initial={{ y: 0 }}
                animate={{ y: isHovered ? -19 : 0 }}
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
                animate={{ y: isHovered ? -19 : 0 }}
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
      </StickyWrapper>
    </Link>
  );
};

export default NavBar;
