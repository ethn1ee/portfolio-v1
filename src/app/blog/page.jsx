"use client";

import { useEffect, useRef } from "react";
import PostCard from "./components/postCard";
import { useStickyRefs } from "@/utils/useStickyRefs";
import { motion } from "framer-motion";

const Blog = () => {
  const allPostButtonRef = useRef(null);

  const { addStickyElement, removeStickyElement } = useStickyRefs();

  useEffect(() => {
    addStickyElement(allPostButtonRef);
    return () => removeStickyElement(allPostButtonRef);
  }, []);

  return (
    <main>
      <h3 className="font-semibold">
        Welcome to my blog ☕️ This is where I document my latest explorations.
      </h3>

      {/* RECENT POSTS */}
      <div className="flex items-center justify-between mt-[10vh]">
        <div className="text-feature">Recent Posts</div>
        <motion.p
          ref={allPostButtonRef}
          whileTap={{ scale: 0.8 }}
          className="cursor-underline font-bold text-neutral-400 cursor-pointer"
        >
          See all
        </motion.p>
      </div>
      <div className="flex flex-wrap gap-l mt-l">
        {/* {posts.map((post) => (
          <PostCard key={post.metadata.title} post={post} />
        ))} */}
      </div>

      {/* BLOG OVERVIEW */}
    </main>
  );
};

export default Blog;
