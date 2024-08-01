"use client";

import { motion } from "framer-motion";
import anim, { customEase } from "@/utils/anim";
import Markdown from "markdown-to-jsx";

import CustomPre from "./customPre";
import CustomA from "./customA";
import CustomP from "./customP";
import CustomH1 from "./customH1";

const ArticleBody = ({ post }) => {
  const mdOptions = {
    overrides: {
      pre: CustomPre,
      a: CustomA,
      p: CustomP,
      h1: CustomH1,
    },
  };

  const opacityVariant = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    transition: { duration: 1, ease: customEase },
  };

  return (
    <motion.article
      {...anim(opacityVariant)}
      className="mt-[32vw] markdown-body pb-[20vh]"
    >
      <Markdown options={mdOptions}>{post.content}</Markdown>
    </motion.article>
  );
};

export default ArticleBody;
