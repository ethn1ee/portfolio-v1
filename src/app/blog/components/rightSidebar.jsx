"use client";

import { useContext, useRef, useEffect, useState } from "react";
import { useStickyRefs } from "@/utils/useStickyRefs";
import { AnimatePresence, motion } from "framer-motion";
import anim, { customEase } from "@/utils/anim";
import { usePathname } from "next/navigation";

const RightSidebar = ({ postData }) => {
  const pathname = usePathname();
  const isPost = pathname.includes("/blog/post/");
  let collectionName, slug;
  const [currentPost, setCurrentPost] = useState(null);

  useEffect(() => {
    if (isPost) {
      collectionName = pathname.split("/")[3];
      slug = pathname.split("/")[4];
      setCurrentPost(
        postData
          .find((collection) => collection.name === collectionName)
          .posts.find((post) => post.metadata.slug === slug)
      );
    } else {
      setCurrentPost(null);
    }
  }, []);

  const slideInVariant = {
    initial: { x: 50, opacity: 0 },
    animate: { x: 0, opacity: 1 },
    exit: { x: 50, opacity: 0 },
    transition: { duration: 0.3, ease: customEase },
  };

  return (
    <AnimatePresence mode="wait">
      {isPost && (
        <motion.div
          {...anim(slideInVariant)}
          key={pathname}
          className="w-[16vw] h-[calc(100vh-60px)] fixed right-ml top-[60px] pt-ml"
        >
          {/* TAGS */}
          <div>
            <small className="font-bold">TAGS</small>
            <div className="mt-sm flex flex-wrap gap-sm">
              {currentPost?.metadata.tags.map((tag) => (
                <Tag key={tag} tag={tag} />
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
