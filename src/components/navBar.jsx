"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { useState } from "react";
import { customEase } from "../utils/anim";
import StickyWrapper from "./stickyWrapper";
import { nohemi } from "./nohemi";

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
      className={nohemi.className + " w-screen px-ml fixed top-0 left-0 flex items-center justify-between h-[60px] bg-base-black z-10"}
    >
      {/* LOGO */}
      <StickyWrapper cursorType={"underline"}>
        <motion.p whileTap={{ scale: 0.8 }} className="font-medium">
          <Link href="/">ETHAN LEE</Link>
        </motion.p>
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
          className="flex flex-col gap-xs h-4 md:h-5 overflow-hidden"
        >
          <div className="flex">
            {link.title.split("").map((letter, index) => (
              <motion.small
                key={index}
                initial={{ y: 0 }}
                animate={{ y: isHovered ? -21 : 0 }}
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
                animate={{ y: isHovered ? -21 : 0 }}
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
