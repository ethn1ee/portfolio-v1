"use client";

import { customEase } from "@/components/utils/anim";
import Experiences from "./experiences";
import HeroText from "./heroText";
import { EmailButton, LinkButton } from "./linkButtons";
import { animate, stagger } from "framer-motion";
import { useEffect } from "react";

const About = () => {
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
    <main>
      {/* HERO TEXT */}
      <HeroText />

      {/* LINKS */}
      <div className="flex gap-l w-[30vw] fixed bottom-ml z-20">
        {links.map((link) => (
          <LinkButton key={link.url} link={link} />
        ))}
        <EmailButton />
      </div>

      {/* EXPERIENCES */}
      <Experiences />
    </main>
  );
};

export default About;
