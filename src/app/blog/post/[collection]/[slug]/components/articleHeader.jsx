"use client";

import getFormattedDate from "@/app/blog/utils/getFormattedDate";
import StickyWrapper from "@/components/stickyWrapper";
import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useState } from "react";

const ArticleHeader = ({ post }) => {
  const formattedDate = getFormattedDate(post.metadata.date);

  const { scrollY } = useScroll();

  const rotateConfig = {
    transformOrigin: "top",
    transformPerspective: 500,
  };

  const [thumbnailWidth, setThumbnailWidth] = useState(0);
  const THUMBNAIL_ASPECT_RATIO = 16 / 9;

  const updateThumbnailWidth = () => {
    setThumbnailWidth(window.innerWidth * 0.5 + 40);
  };

  useEffect(() => {
    updateThumbnailWidth();
    window.addEventListener("resize", updateThumbnailWidth);
    return () => window.removeEventListener("resize", updateThumbnailWidth);
  }, []);

  const scrollRange = [0, thumbnailWidth / THUMBNAIL_ASPECT_RATIO - 30];

  const thumbnailStyle = {
    width: thumbnailWidth,
    height: useTransform(scrollY, scrollRange, [
      thumbnailWidth / THUMBNAIL_ASPECT_RATIO,
      30,
    ]),
    opacity: useTransform(scrollY, scrollRange, [1, -1]),
  };
  const dateStyle = {
    opacity: useTransform(scrollY, scrollRange, [1, -4]),
    y: useTransform(scrollY, scrollRange, [0, -20]),
    rotateX: useTransform(scrollY, scrollRange, [0, 40]),
    ...rotateConfig,
  };
  const headingsStyle = {
    bottom: useTransform(scrollY, scrollRange, [20, 8]),
  };
  const titleStyle = {
    fontSize: useTransform(scrollY, scrollRange, ["56px", "16px"]),
  };
  const subtitleStyle = {
    opacity: useTransform(scrollY, scrollRange, [1, -4]),
    height: useTransform(scrollY, scrollRange, [20, 0]),
    y: useTransform(scrollY, scrollRange, [0, -10]),
    marginTop: useTransform(scrollY, scrollRange, [10, 0]),
    rotateX: useTransform(scrollY, scrollRange, [0, -90]),
    ...rotateConfig,
  };

  const handleHeaderClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <StickyWrapper cursorType={"underline"}>
      <header className="fixed top-0 z-30 bg-base-black -translate-x-5">
        {/* TOP SPACER */}
        <div className="h-[80px] w-full"></div>

        {/* HEADER */}
        <div
          onClick={handleHeaderClick}
          className="relative h-max !cursor-pointer overflow-hidden rounded-md"
        >
          {/* THUMBNAIL */}
          <motion.img
            style={thumbnailStyle}
            className="object-cover"
            src={post.metadata.thumbnail}
            alt="thumbnail"
          />
          {/* OPACITY GRADIENT */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-base-black" />

          {/* DATE */}
          <motion.small
            style={dateStyle}
            className="absolute top-ml left-ml block font-bold bg-base-black px-sm py-xs rounded-md border border-neutral-900"
          >
            {formattedDate}
          </motion.small>

          {/* HEADINGS */}
          <motion.div style={headingsStyle} className="absolute left-ml h-fit">
            <motion.h1 style={titleStyle} className="font-semibold">
              {post.metadata.title}
            </motion.h1>
            <motion.div
              style={subtitleStyle}
              className="text-highlight text-neutral-400"
            >
              {post.metadata.subtitle}
            </motion.div>
          </motion.div>
        </div>

        {/* BOTTOM BORDER */}
        <div className="mt-s h-[1px] w-full bg-neutral-900" />
      </header>
    </StickyWrapper>
  );
};

export default ArticleHeader;
