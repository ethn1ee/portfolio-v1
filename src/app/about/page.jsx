"use client";

import Experiences from "./experiences";
import HeroText from "./heroText";
import LinkButtons from "./linkButtons";


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
