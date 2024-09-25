"use client";

import { nohemi } from "@/components/nohemi";
import StickyWrapper from "@/components/stickyWrapper";
import { experiences } from "@/data/experiences";
import { customEase } from "@/utils/anim";
import { AnimatePresence, motion } from "framer-motion";
import { useContext, useEffect, useRef, useState } from "react";
import { CurrentExperienceContext } from "../utils/currentExperienceContext";
import { UserIcon as UserIconOutline } from "@heroicons/react/24/outline";
import { UserIcon as UserIconSolid } from "@heroicons/react/24/solid";

const Experiences = () => {
  const { currentExperience, setCurrentExperience } = useContext(
    CurrentExperienceContext
  );

  // const handleScroll = (event) => {
  //   if (event.deltaY > 0) {
  //     setCurrentExperience((prev) =>
  //       Math.min(prev + 1, experiences.length - 1)
  //     );
  //   } else {
  //     setCurrentExperience((prev) => Math.max(prev - 1, -1));
  //   }
  // };

  // useEffect(() => {
  //   window.addEventListener("wheel", handleScroll);
  //   return () => window.removeEventListener("wheel", handleScroll);
  // }, []);

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
      <Body currentExperience={currentExperience} />
    </div>
  );
};

const Dates = ({ currentExperience, setCurrentExperience }) => {
  return (
    <div className="flex gap-ml items-center w-fit">
      {/* <StickyWrapper cursorType={"hover"}>
        <div
          style={{ color: currentExperience === -1 ? "#FAFAFA" : "#9F9C9C" }}
          onClick={() => setCurrentExperience(-1)}
          className="cursor-pointer relative w-5 h-5"
        >
          <AnimatePresence>
            {currentExperience === -1 ? (
              <motion.div
                key={1}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute top-0 left-0"
              >
                <UserIconSolid className="size-5 fill-base-white text-base-white" />
              </motion.div>
            ) : (
              <motion.div
                key={2}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute top-0 left-0"
              >
                <UserIconOutline className="size-5 stroke-neutral-400 text-neutral-400" />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </StickyWrapper> */}

      <div>
        <StickyWrapper cursorType={"underline"}>
          <motion.p
            animate={{
              color: currentExperience === -1 ? "#FAFAFA" : "#9F9C9C",
              fontWeight: currentExperience === -1 ? 600 : 300,
            }}
            onClick={() => setCurrentExperience(-1)}
            className={nohemi.className + " cursor-pointer"}
          >
            PROFILE
          </motion.p>
        </StickyWrapper>
      </div>

      <div className="w-1 h-1 rounded-full bg-neutral-700" />

      {experiences.map((experience, index) => (
        <div key={index} className="flex gap-ml items-center">
          <StickyWrapper cursorType={"underline"}>
            <motion.p
              animate={{
                color: index === currentExperience ? "#FAFAFA" : "#9F9C9C",
                fontWeight: index === currentExperience ? 600 : 300,
              }}
              onClick={() => setCurrentExperience(index)}
              className={nohemi.className + " cursor-pointer"}
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

const Body = ({ currentExperience }) => {
  return (
    <div className="flex flex-col flex-1">
      {currentExperience === -1 ? (
        <>
          <ExperienceRow
            section="EDUCATION"
            content={[
              "Emory University (2023 - 2026)",
              "UC Santa Barbara (2022 - 2023)",
            ]}
          />
          <ExperienceRow
            section="DEGREES"
            content={["B.S. Computer Science", "B.A. Psychology"]}
          />
          <ExperienceRow
            section="DESCRIPTION"
            content={[
              "Psychologist-turned-developer with a passion for machine learning and web development. Leverages an understanding of human behavior to craft intuitive and engaging software solutions using diverse programming languages and frameworks.",
            ]}
          />
        </>
      ) : (
        <>
          <ExperienceRow
            section="TITLE"
            content={experiences[currentExperience].title}
            currentExperience={currentExperience}
          />
          <ExperienceRow
            section="COMPANY"
            content={experiences[currentExperience].company}
            currentExperience={currentExperience}
          />
          <ExperienceRow
            section="LOCATION"
            content={experiences[currentExperience].location}
            currentExperience={currentExperience}
          />
          <ExperienceRow
            section="DESCRIPTION"
            content={experiences[currentExperience].description}
            currentExperience={currentExperience}
          />
        </>
      )}
    </div>
  );
};

const ExperienceRow = ({ section, content, currentExperience }) => {
  const prevExperienceRef = useRef(currentExperience);

  useEffect(() => {
    prevExperienceRef.current = currentExperience;
  }, [currentExperience]);

  const transitionAnimation = {
    initial: {
      opacity: 0,
      y: -10,
    },
    animate: { opacity: 1, y: 0 },
    exit: {
      opacity: 0,
      y: 10,
    },
    transition: { duration: 0.3, ease: customEase },
  };

  return (
    <div
      style={
        section === "DESCRIPTION"
          ? { flex: 1, borderBottomWidth: 1 }
          : { flex: 0, borderBottomWidth: 0 }
      }
      className="w-full flex border-t border-neutral-900 py-m"
    >
      <AnimatePresence mode="wait">
        <motion.p
          key={section}
          {...transitionAnimation}
          className={nohemi.className + " font-medium flex-1 text-neutral-400"}
        >
          {section}
        </motion.p>
      </AnimatePresence>

      <AnimatePresence mode="wait">
        <motion.div
          key={content + currentExperience}
          {...transitionAnimation}
          className="text-neutral-400 flex-1"
        >
          <StickyWrapper cursorType={"textpointer"}>
            {typeof content === "string" ? (
              <p className="text-inherit font-medium">{content}</p>
            ) : (
              <ul className="text-inherit font-medium flex flex-col gap-s">
                {content.map((item, i) => (
                  <li key={i} className="text-inherit">
                    {item}
                  </li>
                ))}
              </ul>
            )}
          </StickyWrapper>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default Experiences;
