"use client";

import Experiences from "./components/experiences";
import Map from "./components/map";
import { CurrentExperienceProvider } from "./utils/currentExperienceContext";

const About = () => {
  return (
    <div className="flex flex-col gap-ml h-[calc(100vh-80px)]">
      <CurrentExperienceProvider>
        <Map />
        <Experiences />
      </CurrentExperienceProvider>
    </div>
  );
};

export default About;
