"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import anim, { customEase } from "./anim";
import Image from "next/image";
import { projects } from "@/data/projects";
import { useStickyRefs } from "./useStickyRefs";

const Projects = () => {
  const [activeIndex, setActiveIndex] = useState(-1);

  return (
    <div className="w-full min-h-[calc(100vh-60px)]">
      {/* LIST HEADER */}
      <div className="w-full flex justify-between items-center py-sm sticky top-[60px] bg-base-black z-10 pointer-events-none">
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
          setActiveIndex={setActiveIndex}
          expand={activeIndex === index}
          index={index}
        />
      ))}
    </div>
  );
};

const ProjectCard = ({ project, setActiveIndex, expand, index }) => {
  const [isHovered, setIsHovered] = useState(false);

  const projectRef = useRef();
  const { addStickyElement, removeStickyElement } = useStickyRefs();

  const carouselRef = useRef();

  const intervalRef = useRef(null);

  const startScrolling = (direction) => {
    intervalRef.current = setInterval(() => {
      if (carouselRef.current) {
        carouselRef.current.scrollLeft += direction * 30;
      }
    }, 0);
  };

  const stopScrolling = () => {
    clearInterval(intervalRef.current);
  };

  useEffect(() => {
    addStickyElement(projectRef);

    return () => removeStickyElement(projectRef);
  }, [project]);

  const hoverTextVariant = {
    initial: { padding: "0 0px" },
    animate: isHovered ? { padding: "0 10px" } : { padding: "0 0px" },
  };

  const expandContentVariant = {
    initial: {
      opacity: 0,
      maxHeight: "0px",
      margin: "0px 0",
      rotateX: -10,
    },
    animate: {
      opacity: expand ? 1 : 0,
      maxHeight: expand ? "1050px" : "0px",
      margin: expand ? "28px 0" : "0px 0",
      rotateX: expand ? 0 : -10,
    },
    exit: {
      opacity: 0,
      maxHeight: "0px",
      margin: "0px 0",
      rotateX: -10,
    },
    transition: {
      maxHeight: {
        delay: 0,
        duration: 0.5,
      },
      margin: {
        delay: {
          expand: 0,
          collapse: 0.2,
        },
        duration: 0.3,
      },
      opacity: {
        delay: {
          expand: 0,
          collapse: 0.2,
        },
        duration: 0.3,
      },
      display: {
        delay: {
          expand: 0,
          collapse: 0.5,
        },
        duration: 0,
      },
      rotateX: {
        delay: 0.1,
        duration: 0.2,
      },
    },
  };

  return (
    <div className="flex flex-col overflow-hidden">
      {/* HEADER */}
      <motion.div
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={() => setActiveIndex(expand ? -1 : index)}
        ref={projectRef}
        className="w-full py-sm relative flex items-center cursor-pointer select-none"
      >
        {/* TOP BORDER */}
        <AnimatePresence>
          <motion.div
            className="w-full h-[1px] opacity-100 absolute top-0 left-0 bg-base-white"
            initial={{ width: "0%", opacity: 1 }}
            animate={{
              opacity: isHovered ? 0 : 1,
              width: "100%",
            }}
            transition={{
              duration: 0.3,
              width: {
                duration: 0.8,
                delay: Math.sqrt(index) * 0.2,
                ease: customEase,
              },
            }}
          ></motion.div>
        </AnimatePresence>
        {/* INFO */}
        <div className="w-full flex justify-between items-center relative">
          <div className="flex flex-1 justify-start">
            <motion.p {...anim(hoverTextVariant)} className="font-semibold">
              {project.name}
            </motion.p>
          </div>
          <div className="flex flex-1 justify-start">
            <p className="font-semibold">
              {project.category.map((category, index) => (
                <span className="text-inherit" key={index}>
                  {category}
                  {index < project.category.length - 1 ? ", " : ""}
                </span>
              ))}
            </p>
          </div>
          <div className="flex flex-1 justify-end">
            <p className="font-semibold">{project.client}</p>
          </div>
          <div className="flex flex-1 justify-end">
            <motion.p {...anim(hoverTextVariant)} className="font-semibold">
              {project.year}
            </motion.p>
          </div>
        </div>
      </motion.div>

      {/* CONTENT */}
      <AnimatePresence>
        {expand && (
          <motion.div
            {...anim(expandContentVariant)}
            style={{ transformPerspective: 800, originY: 0 }}
            className="flex flex-col gap-l my-l overflow-hidden"
          >
            {/* DESCRIPTION */}
            <div className="text-hero w-full md:w-1/2">
              {project.description}
            </div>

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
              className="flex gap-sm overflow-scroll scroll-smooth relative"
              style={{ scrollbarWidth: "none" }}
              initial={{ x: "-200px" }}
              animate={{ x: "0px" }}
              exit={{ x: "-200px" }}
              transition={{ duration: 0.5, ease: customEase }}
              ref={carouselRef}
            >
              {project.images.map((img, i) => (
                <Thumbnail key={i} img={img} carouselRef={carouselRef} />
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const Tag = ({ item }) => {
  const tagRef = useRef();

  const { addStickyElement, removeStickyElement } = useStickyRefs();

  useEffect(() => {
    addStickyElement(tagRef);

    return () => removeStickyElement(tagRef);
  }, [item]);

  return (
    <motion.div
      ref={tagRef}
      className="h-[30px] flex py-s px-sm bg-neutral-900 shrink-0 cursor-default select-none"
    >
      <small className="text-inherit">{item}</small>
    </motion.div>
  );
};

const Thumbnail = ({ img, carouselRef }) => {
  const imgRef = useRef();

  const { addStickyElement, removeStickyElement } = useStickyRefs();

  useEffect(() => {
    addStickyElement(imgRef);

    return () => removeStickyElement(imgRef);
  }, [img]);

  const [carouselWidth, setCarouselWidth] = useState(0);

  const updateWidth = () => {
    if (carouselRef.current) {
      setCarouselWidth(carouselRef.current.getBoundingClientRect().width);
    }
  };

  useEffect(() => {
    if (carouselRef.current) {
      setCarouselWidth(carouselRef.current.getBoundingClientRect().width);
    }
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  });

  const imgHeight = Math.min((carouselWidth * 9) / 16, 388);
  const imgWidth =
    img.orientation === "landscape"
      ? (imgHeight * 16) / 9
      : (imgHeight * 9) / 16;

  return (
    <motion.div
      ref={imgRef}
      whileHover={{ scale: 0.95 }}
      transition={{ duration: 0.3 }}
      style={{ width: imgWidth, height: imgHeight }}
      className="cursor-hidden bg-neutral-400 rounded-lg shrink-0 relative overflow-hidden"
    >
      {img && <Image src={img.src} alt="" fill className="object-cover" />}
    </motion.div>
  );
};

export default Projects;
