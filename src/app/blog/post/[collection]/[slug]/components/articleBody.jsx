"use client";

import { Outfit } from "next/font/google";
import Markdown from "markdown-to-jsx";
import CustomPre from "./customPre";
import CustomA from "./customA";
import { motion, AnimatePresence } from "framer-motion";
import anim, { customEase } from "@/utils/anim";
import CustomP from "./customP";

const outfit = Outfit({
  subsets: ["latin"],
});

const ArticleBody = ({ post }) => {
  const opacityVariant = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    transition: { duration: 1, ease: customEase },
  };

  return (
    <motion.article
      {...anim(opacityVariant)}
      className={`${outfit.className} mt-l markdown-body pb-[20vh]`}
    >
      <Markdown
        options={{
          overrides: {
            pre: CustomPre,
            a: (props) => <CustomA {...props} />,
            p: CustomP,
          },
        }}
      >
        {post.content}
      </Markdown>
    </motion.article>
  );
};

export default ArticleBody;
