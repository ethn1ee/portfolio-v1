"use client";

import Experiences from "./components/experiences";
import Map from "./components/map";

const About = () => {

  return (
    <main className="flex flex-col gap-ml h-[calc(100vh-80px)]">
      <Map />
      <Experiences />
    </main>
  );
};

export default About;
