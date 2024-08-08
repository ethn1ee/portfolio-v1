"use client";

import StickyWrapper from "@/components/stickyWrapper";
import { experiences } from "@/data/experiences";
import { customEase } from "@/utils/anim";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const Experiences = () => {
  const [currentExperience, setCurrentExperience] = useState(0);
  const [direction, setDirection] = useState(0);

  const handleScroll = (event) => {
    if (event.deltaY > 0) {
      setCurrentExperience((prev) =>
        Math.min(prev + 1, experiences.length - 1)
      );
      setDirection(1);
    } else {
      setCurrentExperience((prev) => Math.max(prev - 1, 0));
      setDirection(-1);
    }
  };

  useEffect(() => {
    window.addEventListener("wheel", handleScroll);
    return () => window.removeEventListener("wheel", handleScroll);
  }, []);

  return (
    <div className="flex-1 flex flex-col gap-ml">
      {/* HEADER */}
      <div>
        <Dates
          currentExperience={currentExperience}
          setCurrentExperience={setCurrentExperience}
        />
      </div>

      {/* BODY */}
      <Body currentExperience={currentExperience} direction={direction} />
    </div>
  );
};

const Dates = ({ currentExperience, setCurrentExperience }) => {
  return (
    <div className="flex gap-ml items-center w-fit">
      {experiences.map((experience, index) => (
        <div key={index} className="flex gap-ml items-center">
          <StickyWrapper cursorType={"underline"}>
            <motion.p
              animate={{
                color: index === currentExperience ? "#FAFAFA" : "#9F9C9C",
                fontWeight: index === currentExperience ? 600 : 300,
              }}
              onClick={() => setCurrentExperience(index)}
              className="cursor-pointer"
            >
              {experience.start.toUpperCase()} - {experience.end.toUpperCase()}
            </motion.p>
          </StickyWrapper>
          {index < experiences.length - 1 && (
            <div className="w-1 h-1 rounded-full bg-neutral-900" />
          )}
        </div>
      ))}
    </div>
  );
};

const Body = ({ currentExperience, direction }) => {
  return (
    <div className="flex flex-col flex-1">
      <ExperienceRow
        section="TITLE"
        content={experiences[currentExperience].title}
        currentExperience={currentExperience}
        direction={direction}
      />
      <ExperienceRow
        section="COMPANY"
        content={experiences[currentExperience].company}
        currentExperience={currentExperience}
        direction={direction}
      />
      <ExperienceRow
        section="LOCATION"
        content={experiences[currentExperience].location}
        currentExperience={currentExperience}
        direction={direction}
      />
      <ExperienceRow
        section="DESCRIPTION"
        content={experiences[currentExperience].description}
        currentExperience={currentExperience}
        direction={direction}
      />
    </div>
  );
};

const ExperienceRow = ({ section, content, currentExperience, direction }) => {
  const prevExperienceRef = useRef(currentExperience);

  useEffect(() => {
    prevExperienceRef.current = currentExperience;
  }, [currentExperience]);

  return (
    <div
      style={
        section === "DESCRIPTION"
          ? { flex: 1, borderBottomWidth: 1 }
          : { flex: 0, borderBottomWidth: 0 }
      }
      className="w-full flex border-t border-neutral-900 py-m"
    >
      <p className="flex-1 text-neutral-400">{section}</p>
      <div className="flex-1">
        <AnimatePresence mode="wait">
          <motion.p
            initial={{
              opacity: 0,
              y: direction > 0 ? 10 : -10,
            }}
            animate={{ opacity: 1, y: 0 }}
            exit={{
              opacity: 0,
              y: direction > 0 ? -10 : 10,
            }}
            transition={{ duration: 0.3, ease: customEase }}
            key={content + currentExperience}
            className="text-neutral-400"
          >
            <StickyWrapper cursorType={"textpointer"}>
              <span className="text-inherit">{content}</span>
            </StickyWrapper>
          </motion.p>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Experiences;
