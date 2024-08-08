"use client";

import {
  motion,
  AnimatePresence,
  useInView,
  stagger,
  animate,
} from "framer-motion";
import { useEffect, useRef, useState } from "react";
import anim, { customEase } from "@/utils/anim";
import Image from "next/image";
import { projects } from "@/data/projects";
import StickyWrapper from "@/components/stickyWrapper";
import Tag from "@/components/tag";
import { CaretLeft, CaretRight } from "@phosphor-icons/react";

const PROJECT_HEADER_HEIGHT = 40;
const IMG_ASPECT_RATIO = 16 / 9;

const Projects = () => {
  const [activeIndex, setActiveIndex] = useState(-1);
  const [topMargin, setTopMargin] = useState(10000);
  const projectsRef = useRef();

  const staggerProject = stagger(0.2, { ease: "easeOut", startDelay: 1 });

  const updateTopMargin = () => {
    setTopMargin(
      window.innerHeight -
        PROJECT_HEADER_HEIGHT * (projects.length + 1) -
        60 -
        20
    );
  };

  useEffect(() => {
    updateTopMargin();

    animate(
      ".stagger-project",
      { opacity: [0, 1] },
      { delay: staggerProject, ease: customEase, duration: 1 }
    );
    animate(
      ".stagger-line",
      { width: ["0%", "100%"] },
      { delay: staggerProject, ease: customEase, duration: 1 }
    );
    window.addEventListener("resize", () => updateTopMargin());

    return () => window.removeEventListener("resize", () => updateTopMargin());
  }, []);

  useEffect(() => {
    if (activeIndex === -1) return;

    projectsRef.current.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }, [activeIndex]);

  return (
    <div
      ref={projectsRef}
      id="home-projects"
      style={{ marginTop: topMargin }}
      className="w-full h-[calc(100vh-60px)]"
    >
      {/* LIST HEADER */}
      <div
        style={{ height: PROJECT_HEADER_HEIGHT }}
        className="w-full flex justify-between items-center pointer-events-none"
      >
        <small className="flex-1 font-bold text-neutral-400">PROJECT</small>
        <small className="flex-1 font-bold text-neutral-400">CATEGORY</small>
        <small className="flex-1 font-bold text-right text-neutral-400">
          CLIENT
        </small>
        <small className="flex-1 font-bold text-right text-neutral-400">
          YEAR
        </small>
      </div>

      {/* LIST */}
      {projects.map((project, index) => (
        <ProjectCard
          key={index}
          project={project}
          activeIndex={activeIndex}
          setActiveIndex={setActiveIndex}
          index={index}
        />
      ))}
    </div>
  );
};

const ProjectCard = ({ project, activeIndex, setActiveIndex, index }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [height, setHeight] = useState(0);
  const isExpand = activeIndex === index;

  const updateHeight = () => {
    const windowHeight = window.innerHeight;
    const navbarHeight = 60;
    const projectHeadersHeight = PROJECT_HEADER_HEIGHT * (projects.length + 1);
    setHeight(windowHeight - projectHeadersHeight - navbarHeight - 20);
  };

  useEffect(() => {
    updateHeight();
    window.addEventListener("resize", updateHeight);
    return () => window.removeEventListener("resize", updateHeight);
  }, []);

  const expandContentAnimation = {
    initial: {
      opacity: 0,
      scale: 0.95,
      height: 0,
    },
    animate: {
      opacity: 1,
      scale: 1,
      height: height,
    },
    exit: {
      opacity: 0,
      scale: 0.9,
      height: 0,
    },
    transition: {
      duration: 1,
      ease: customEase,
      opacity: {
        delay: 0.5,
        duration: 1,
        ease: customEase,
      },
      y: {
        delay: 0.5,
        duration: 1,
        ease: customEase,
      },
    },
  };

  const handleClick = () => {
    setActiveIndex(isExpand ? -1 : index);
  };

  return (
    <motion.div className="stagger-project flex flex-col overflow-hidden">
      {/* HEADER */}
      <StickyWrapper>
        <motion.div
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onClick={() => handleClick()}
          style={{ height: PROJECT_HEADER_HEIGHT }}
          className="w-full relative flex items-center cursor-pointer bg-base-black"
        >
          {/* TOP BORDER */}
          <motion.div
            animate={{ opacity: isHovered ? 0 : 1 }}
            className="stagger-line w-full h-[1px] opacity-100 absolute top-0 left-0 bg-base-white"
          />

          {/* INFO */}
          <div className="w-full flex justify-between items-center relative">
            <motion.p
              animate={{
                x: isHovered ? 10 : 0,
              }}
              transition={{ ease: customEase }}
              className="flex-1 font-semibold"
            >
              {project.name}
            </motion.p>

            <p className="flex-1 font-light">
              {project.category.map((category, index) => (
                <span className="text-inherit" key={index}>
                  {category}
                  {index < project.category.length - 1 ? ", " : ""}
                </span>
              ))}
            </p>

            <p className="flex-1 text-right font-light">{project.client}</p>

            <motion.p
              animate={{
                x: isHovered ? -10 : 0,
              }}
              transition={{ ease: customEase }}
              className="flex-1 text-right"
            >
              {project.year}
            </motion.p>
          </div>
        </motion.div>
      </StickyWrapper>

      {/* CONTENT */}
      <AnimatePresence>
        {isExpand && (
          <motion.div
            {...expandContentAnimation}
            className="flex flex-col overflow-hidden"
          >
            {/* IMAGES */}
            <div className="my-ml flex gap-ml overflow-auto">
              {project.images.map((img, i) => (
                <Image
                  key={i}
                  src={img.src}
                  alt=""
                  width={
                    img.orientation === "landscape"
                      ? (height / 2) * IMG_ASPECT_RATIO - 40
                      : height / 2 / IMG_ASPECT_RATIO - 40
                  }
                  height={height / 2}
                  className="object-contain snap-center"
                />
              ))}
            </div>

            {/* DESCRIPTION */}
            <ProjectRow section="CATEGORY" content={project.category} />
            <ProjectRow
              section="DESCRIPTION"
              content={project.description}
            />
            <ProjectRow section="CLIENT" content={project.client} />
            <ProjectRow section="TECH STACK" content={project.tags} />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const ProjectRow = ({ section, content }) => {
  return (
    <div
      style={{ flex: section === "DESCRIPTION" ? 1 : 0 }}
      className="flex border-t border-neutral-900 py-m"
    >
      <p className="flex-1 text-neutral-400">{section}</p>
      <p className="flex-1 text-neutral-400">
        {typeof content === "string" ? (
          <StickyWrapper cursorType={"textpointer"}>
            <span className="text-inherit">{content}</span>
          </StickyWrapper>
        ) : (
          content.map((item, index) => {
            return (
              <span className="text-inherit" key={index}>
                <StickyWrapper cursorType={"underline"}>
                  <span className="text-inherit">{item}</span>
                </StickyWrapper>
                {index < content.length - 1 && ", "}
              </span>
            );
          })
        )}
      </p>
    </div>
  );
};

export default Projects;
