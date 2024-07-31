"use client";

import getFormattedDate from "@/app/blog/utils/getFormattedDate";
import StickyWrapper from "@/components/stickyWrapper";
import { color, motion, useScroll, useTransform } from "framer-motion";

const ArticleHeader = ({ post }) => {
  const formattedDate = getFormattedDate(post.metadata.date);

  const { scrollY } = useScroll();

  const rotateConfig = {
    transformOrigin: "top",
    transformPerspective: 500,
  };

  const headerStyle = {
    height: useTransform(scrollY, [0, 50], [190, 112]),
  };
  const dateStyle = {
    opacity: useTransform(scrollY, [0, 50], [1, 0]),
    y: useTransform(scrollY, [0, 50], [0, -20]),
    rotateX: useTransform(scrollY, [0, 50], [0, 40]),
    ...rotateConfig,
  };
  const headingsStyle = {
    top: useTransform(scrollY, [0, 50], [30, 0]),
    height: useTransform(scrollY, [0, 50], [80, 32]),
  };
  const titleStyle = {
    fontSize: useTransform(scrollY, [0, 50], ["28px", "18px"]),
    opacity: useTransform(scrollY, [0, 50], [1, 0.5]),
  };
  const subtitleStyle = {
    opacity: useTransform(scrollY, [0, 50], [1, 0]),
    height: useTransform(scrollY, [0, 35, 50], [20, 20, 0]),
    y: useTransform(scrollY, [0, 50], [6, 0]),
    rotateX: useTransform(scrollY, [0, 50], [0, -10]),
    ...rotateConfig,
  };

  const handleHeaderClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <StickyWrapper cursorType={"underline"}>
      <motion.header
        onClick={handleHeaderClick}
        style={headerStyle}
        className="fixed top-0 !cursor-pointer pt-[80px] w-[50vw] h-[190px] z-30 bg-base-black overflow-hidden shadow-md shadow-base-black"
      >
        <motion.small
          style={dateStyle}
          className="absolute block font-bold text-neutral-400"
        >
          {formattedDate}
        </motion.small>

        <motion.div
          style={headingsStyle}
          className="relative border-b border-neutral-900"
        >
          <motion.div style={titleStyle} className="text-hero font-semibold">
            {post.metadata.title}
          </motion.div>
          <motion.div
            style={subtitleStyle}
            className="text-highlight box-border text-neutral-400"
          >
            {post.metadata.subtitle}
          </motion.div>
        </motion.div>
      </motion.header>
    </StickyWrapper>
  );
};

export default ArticleHeader;
