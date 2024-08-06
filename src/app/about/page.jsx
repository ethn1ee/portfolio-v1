"use client";

import Cursor from "@/components/cursor";
import Experiences from "./components/experiences";
import HeroText from "./components/heroText";
import LinkButtons from "./components/linkButtons";

const About = () => {
  return (
    <main>
      {/* HERO TEXT */}
      <HeroText />

      {/* LINKS */}
      <LinkButtons />

      {/* EXPERIENCES */}
      <Experiences />
    </main>
  );
};

export default About;
