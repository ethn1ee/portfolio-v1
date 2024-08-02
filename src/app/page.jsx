"use client";

import { useEffect } from "react";
import Hero from "./components/hero";
import Projects from "./components/projects";
import { HeroSpacer, ProjectsSpacer } from "./components/spacers";

export default function Home() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Hero />
      {/* <HeroSpacer /> */}
      <Projects />
      {/* <ProjectsSpacer /> */}
    </>
  );
}
