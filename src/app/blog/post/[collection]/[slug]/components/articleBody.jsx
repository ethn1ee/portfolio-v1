"use client";

import { motion } from "framer-motion";
import anim, { customEase } from "@/utils/anim";
import Markdown from "markdown-to-jsx";

import CustomPre from "./customPre";
import CustomA from "./customA";
import CustomP from "./customP";
import CustomH1 from "./customH1";
import { useEffect, useState } from "react";

const ArticleBody = ({ post }) => {
  const mdOptions = {
    overrides: {
      pre: CustomPre,
      a: CustomA,
      p: CustomP,
      h1: CustomH1,
    },
    forceBlock: false,
    wrapper: "article",
  };

  const opacityVariant = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    transition: { duration: 1, ease: customEase },
  };

  const [thumbnailHeight, setThumbnailHeight] = useState(0);

  useEffect(() => {
    setThumbnailHeight(((window.innerWidth * 0.5 + 40) * 9) / 16);
  }, []);

  return (
    <motion.div {...anim(opacityVariant)}>
      <Markdown
        style={{ marginTop: thumbnailHeight + 10 }}
        className="markdown-body pb-[20vh]"
        options={mdOptions}
      >
        {post.content}
      </Markdown>
    </motion.div>
  );
};

export default ArticleBody;
