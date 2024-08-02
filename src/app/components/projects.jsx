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

const PROJECT_HEADER_HEIGHT = 40;

const Projects = () => {
  const [activeIndex, setActiveIndex] = useState(-1);
  const [topMargin, setTopMargin] = useState(10000);
  const projectsRef = useRef();

  const staggerProject = stagger(0.3);

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
      { delay: staggerProject, ease: customEase, duration: 0.5 }
    );
    animate(
      ".stagger-line",
      { width: ["0%", "100%"] },
      { delay: staggerProject, ease: customEase, duration: 0.5 }
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
        <div className="flex flex-1 justify-start items-center">
          <small className="text-neutral-400">PROJECT</small>
        </div>
        <div className="flex flex-1 justify-start items-center">
          <small className="text-neutral-400">CATEGORY</small>
        </div>
        <div className="flex flex-1 justify-end items-center">
          <small className="text-neutral-400">CLIENT</small>
        </div>
        <div className="flex flex-1 justify-end items-center">
          <small className="text-neutral-400">YEAR</small>
        </div>
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
  const [currentThumbnail, setCurrentThumbnail] = useState(0);
  const expand = activeIndex === index;
  const carouselRef = useRef();

  const expandContentVariant = {
    initial: {
      opacity: 0,
      maxHeight: 0,
      marginTop: 0,
      marginBottom: 0,
      rotateX: -10,
    },
    animate: {
      opacity: expand ? 1 : 0,
      maxHeight: expand ? 1000 : 0,
      marginTop: expand ? 20 : 0,
      marginBottom: expand ? 40 : 0,
      rotateX: expand ? 0 : -10,
    },
    exit: {
      opacity: 0,
      maxHeight: 0,
      marginTop: 0,
      marginBottom: 0,
      rotateX: -10,
    },
    transition: {
      ease: customEase,
      delay: 0,
      duration: 1,
    },
  };

  return (
    <motion.div className="stagger-project flex flex-col overflow-hidden">
      {/* HEADER */}
      <StickyWrapper>
        <motion.div
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onClick={() => setActiveIndex(expand ? -1 : index)}
          style={{ height: PROJECT_HEADER_HEIGHT }}
          className="w-full relative flex items-center cursor-pointer"
        >
          {/* TOP BORDER */}
          <motion.div
            animate={{ opacity: isHovered ? 0 : 1 }}
            className="stagger-line w-full h-[1px] opacity-100 absolute top-0 left-0 bg-neutral-400"
          ></motion.div>

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

            <p className="flex-1">
              {project.category.map((category, index) => (
                <span className="text-inherit" key={index}>
                  {category}
                  {index < project.category.length - 1 ? ", " : ""}
                </span>
              ))}
            </p>

            <p className="flex-1 text-right">{project.client}</p>

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
        {expand && (
          <motion.div
            {...anim(expandContentVariant)}
            transition={expandContentVariant.transition}
            style={{ transformPerspective: 800, originY: 0 }}
            className="flex flex-col gap-l overflow-hidden"
          >
            {/* DESCRIPTION */}
            <StickyWrapper cursorType={"textpointer"}>
              <h4 className="cursor-none font-light w-full md:w-1/2">
                {project.description}
              </h4>
            </StickyWrapper>

            {/* TAGS */}
            <div
              className="flex flex-wrap gap-sm"
              style={{ scrollbarWidth: "none" }}
            >
              {project.tags.map((item, i) => (
                <Tag item={item} key={i} />
              ))}
            </div>

            {/* CAROUSEL */}
            <motion.div
              ref={carouselRef}
              className="flex gap-sm overflow-scroll scroll-smooth relative snap-x"
              style={{ scrollbarWidth: "none" }}
              initial={{ x: "-100px" }}
              animate={{ x: "0px" }}
              exit={{ x: "100px" }}
              transition={{ duration: 1, ease: "easeOut" }}
            >
              {project.images.map((img, i) => (
                <Thumbnail
                  key={i}
                  img={img}
                  carouselRef={carouselRef}
                  currentThumbnail={currentThumbnail}
                  setCurrentThumbnail={setCurrentThumbnail}
                  index={i}
                />
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const Thumbnail = ({
  img,
  carouselRef,
  currentThumbnail,
  setCurrentThumbnail,
  index,
}) => {
  const maxImgHeight = 500;
  const minImgHeight = 180;
  const aspectRatio = {
    landscape: 16 / 9,
    portrait: 390 / 844,
  };

  const [imgHeight, setImgHeight] = useState(0);

  const [imgWidth, setImgWidth] = useState(0);

  const updateSize = () => {
    const carouselWidth = window.innerWidth - 40;

    setImgHeight(
      Math.max(
        minImgHeight,
        Math.min(
          (carouselWidth * 0.9 * 9) / 16,
          Math.min(maxImgHeight, window.innerHeight - 600)
        )
      )
    );
    setImgWidth(imgHeight * aspectRatio[img.orientation]);
  };

  useEffect(() => {
    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  });

  return (
    <StickyWrapper cursorType={"hidden"}>
      <motion.div
        whileHover={{ scale: 0.97 }}
        transition={{ duration: 0.3 }}
        onClick={() => {
          if (currentThumbnail === index) return;
          carouselRef.current.scrollBy({
            left: currentThumbnail < index ? imgWidth - 20 : -imgWidth + 20,
            behavior: "smooth",
          });
          setCurrentThumbnail(index);
        }}
        style={{ width: imgWidth, height: imgHeight }}
        className=" cursor-pointer bg-neutral-400 rounded-lg shrink-0 relative overflow-hidden snap-center"
      >
        {img && <Image src={img.src} alt="" fill className="object-cover" />}
      </motion.div>
    </StickyWrapper>
  );
};

export default Projects;
