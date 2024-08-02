"use client";

import { useEffect, useState } from "react";

export const HeroSpacer = () => {
  const [height, setHeight] = useState(0);

  const updateHeight = () => {
    const navbarHeight = document.getElementById("navbar").clientHeight;
    const heroHeight = document.getElementById("home-hero").clientHeight;
    const projectsHeight =
      document.getElementById("home-projects").clientHeight;

    setHeight(window.innerHeight - navbarHeight - projectsHeight - 10);
  };

  useEffect(() => {
    updateHeight();
    window.addEventListener("resize", updateHeight);
    return () => window.removeEventListener("resize", updateHeight);
  }, []);

  return <div id="hero-spacer" style={{ height: height }} />;
};

export const ProjectsSpacer = () => {
  const [height, setHeight] = useState(0);

  const updateHeight = () => {
    const navbarHeight = document.getElementById("navbar").clientHeight;
    const projectsHeight =
      document.getElementById("home-projects").clientHeight;

    setHeight(window.innerHeight - navbarHeight - projectsHeight);
  };

  useEffect(() => {
    updateHeight();
    window.addEventListener("resize", updateHeight);
    return () => window.removeEventListener("resize", updateHeight);
  }, []);

  return <div style={{ height: height }} />;
};
