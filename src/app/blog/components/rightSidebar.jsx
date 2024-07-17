"use client";

import { useContext, useRef, useEffect } from "react";
import { CurrentPostContext } from "../page";
import { useStickyRefs } from "@/utils/useStickyRefs";
import { AnimatePresence, motion } from "framer-motion";
import anim, { customEase } from "@/utils/anim";

const RightSidebar = () => {
  const { currentPost } = useContext(CurrentPostContext);

  const slideInVariant = {
    initial: { x: 50, opacity: 0 },
    animate: { x: 0, opacity: 1 },
    exit: { x: 50, opacity: 0 },
    transition: { duration: 0.3, ease: customEase },
  };

  return (
    <AnimatePresence mode="wait">
      {typeof currentPost !== "string" && (
        <motion.div
          {...anim(slideInVariant)}
          key={currentPost.metadata.title}
          className="w-[16vw] h-[calc(100vh-60px)] fixed right-ml pt-ml"
        >
          {/* TAGS */}
          <div>
            <small className="font-bold">TAGS</small>
            <div className="mt-sm flex flex-wrap gap-sm">
              {currentPost.tags.map((tag, index) => (
                <Tag key={index} tag={tag} />
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const Tag = ({ tag }) => {
  const tagRef = useRef();

  const { addStickyElement, removeStickyElement } = useStickyRefs();

  useEffect(() => {
    addStickyElement(tagRef);

    return () => removeStickyElement(tagRef);
  }, [tag]);

  return (
    <motion.div
      ref={tagRef}
      whileHover={{ backgroundColor: "#0A0A0B" }}
      className="flex items-center justify-center py-s px-sm bg-neutral-900 shrink-0 select-none w-fit"
    >
      <p className="font-medium">{tag}</p>
    </motion.div>
  );
};

export default RightSidebar;
