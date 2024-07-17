"use client";

import { useRef, useEffect, useContext, useState } from "react";
import { collections, posts } from "@/data/blog";
import { motion } from "framer-motion";
import { useStickyRefs } from "@/utils/useStickyRefs";
import { CurrentPostContext } from "../page";

const navHoverStyle = {
  paddingLeft: 10,
  paddingRight: 10,
  color: "#fafafa",
  backgroundColor: "#2B282900",
};

const navActiveStyle = {
  paddingLeft: 10,
  paddingRight: 10,
  color: "#fafafa",
  backgroundColor: "#2B2829ff",
};

const LeftSidebar = () => {
  const { currentPost, setCurrentPost } = useContext(CurrentPostContext);

  const introRef = useRef();
  const galleryRef = useRef();

  const { addStickyElement, removeStickyElement } = useStickyRefs();

  useEffect(() => {
    addStickyElement(introRef);
    addStickyElement(galleryRef);
    return () => {
      removeStickyElement(introRef);
      removeStickyElement(galleryRef);
    };
  }, []);

  return (
    <div className="w-[16vw] h-[calc(100vh-60px)] fixed pt-ml">
      {/* COLLECTION LIST */}
      <div className="flex flex-col gap-l">
        {/* INTRO TO BLOG */}
        <div className="h-fit w-full">
          <small className="font-bold uppercase select-none">Welcome!</small>

          <div className="flex flex-col mt-sm">
            {/* INTRODUCTION */}
            <motion.div
              ref={introRef}
              onClick={() => {
                setCurrentPost("introduction");
              }}
              whileHover={navHoverStyle}
              animate={currentPost === "introduction" ? navActiveStyle : {}}
              transition={{ duration: 0.2 }}
              className="flex py-m cursor-pointer text-neutral-400"
            >
              <p className="text-inherit">Introduction</p>
            </motion.div>

            {/* GALLERY */}
            <motion.div
              ref={galleryRef}
              onClick={() => {
                setCurrentPost("gallery");
              }}
              whileHover={navHoverStyle}
              animate={currentPost === "gallery" ? navActiveStyle : {}}
              transition={{ duration: 0.2 }}
              className="flex py-m cursor-pointer text-neutral-400"
            >
              <p className="text-inherit">Gallery</p>
            </motion.div>
          </div>
        </div>

        {/* COLLECTIONS */}
        {collections.map((collection, index) => (
          <CollectionListUnit collection={collection} key={index} />
        ))}
      </div>
    </div>
  );
};

const CollectionListUnit = ({ collection }) => {
  return (
    <div className="h-fit w-full">
      <small className="font-bold uppercase select-none">{collection}</small>
      <div className="flex flex-col mt-sm">
        {posts
          .filter((post) => post.collection === collection)
          .map((post, index) => (
            <PostListUnit post={post} key={index} />
          ))}
      </div>
    </div>
  );
};

const PostListUnit = ({ post }) => {
  const { currentPost, setCurrentPost } = useContext(CurrentPostContext);

  const ref = useRef();

  const { addStickyElement, removeStickyElement } = useStickyRefs();

  useEffect(() => {
    addStickyElement(ref);
    return () => removeStickyElement(ref);
  }, [post]);

  return (
    <motion.div
      ref={ref}
      onClick={() => setCurrentPost(post)}
      whileHover={navHoverStyle}
      animate={
        typeof currentPost !== "string" &&
        currentPost.metadata.title === post.metadata.title
          ? navActiveStyle
          : {}
      }
      transition={{ duration: 0.2 }}
      className="flex py-m cursor-pointer text-neutral-400"
    >
      <p className="text-inherit">{post.metadata.title}</p>
    </motion.div>
  );
};

export default LeftSidebar;
