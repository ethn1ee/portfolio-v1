"use client";

import { useEffect, useState, useContext } from "react";

import { AnimatePresence, motion } from "framer-motion";
import anim, { customEase } from "@/utils/anim";
import { usePathname } from "next/navigation";
import { getPost, PostDataContext } from "../utils/postDataContext";
import StickyWrapper from "@/components/stickyWrapper";

const RightSidebar = () => {
  const postData = useContext(PostDataContext);
  const pathname = usePathname();
  const isPost = pathname.includes("/blog/post/");
  let collectionName, slug;
  const [currentPost, setCurrentPost] = useState(null);

  useEffect(() => {
    if (isPost) {
      collectionName = pathname.split("/")[3];
      slug = pathname.split("/")[4];
      setCurrentPost(getPost(postData, collectionName, slug));
    } else {
      setCurrentPost(null);
    }
  }, [pathname, isPost, postData]);

  const slideInVariant = {
    initial: { x: 50, opacity: 0 },
    animate: { x: 0, opacity: 1 },
    exit: { x: 50, opacity: 0 },
    transition: { duration: 0.3, ease: customEase },
  };

  return (
    <AnimatePresence mode="wait">
      {isPost && currentPost && (
        <motion.aside
          {...anim(slideInVariant)}
          key={pathname}
          className="w-[16vw] h-[calc(100vh-60px)] fixed right-ml top-[60px] pt-ml"
        >
          {/* TAGS */}
          <div>
            <small className="font-bold">TAGS</small>
            <div className="mt-sm flex flex-wrap gap-sm">
              {currentPost.metadata.tags.map((tag) => (
                <Tag key={tag} item={tag} />
              ))}
            </div>
          </div>
        </motion.aside>
      )}
    </AnimatePresence>
  );
};

const Tag = ({ item }) => {
  return (
    <StickyWrapper>
      <motion.small
        whileHover={{ color: "#fafafa", borderColor: "#2b282900" }}
        className="flex items-center justify-center py-s px-sm text-neutral-200 shrink-0 cursor-pointer w-fit bg-base-black relative z-20 backdrop-blur-xl border border-neutral-900 rounded-md"
      >
        {item}
      </motion.small>
    </StickyWrapper>
  );
};

export default RightSidebar;
