"use client";

import StickyWrapper from "@/components/stickyWrapper";
import Link from "next/link";
import { motion } from "framer-motion";

const Links = () => {
  return (
    <div className="absolute flex flex-col gap-s">
      <LinkButton
        name="GitHub"
        href="https://github.com/ethn1ee"
        icon="github"
      />
      <LinkButton
        name="LinkedIn"
        href="https://www.linkedin.com/in/ethn1ee/"
        icon="linkedin"
      />
      {/* <LinkButton name="Email" href="mailto:" icon="email" /> */}
      <LinkButton name="Resume" href="/Ethan_Lee_resume.pdf" icon="resume" />
    </div>
  );
};

const LinkButton = ({ name, href, icon }) => {
  return (
    <Link href={href} target="_blank" rel="noopener noreferrer">
      <StickyWrapper>
        <motion.div
          style={{ gap: 10 }}
          whileHover={{
            color: "#fafafa",
            backgroundColor: "#0a0a0b",
            scale: 1.08,
          }}
          className="flex items-center bg-neutral-1000 px-sm py-s text-neutral-400 rounded-md"
        >
          <img src={`./icons/${icon}.svg`} alt={icon} />
          <span className="font-semibold text-inherit">
            {name.toUpperCase()}
          </span>
        </motion.div>
      </StickyWrapper>
    </Link>
  );
};

export default Links;
