"use client";

import { useContext, useEffect, useRef } from "react";
import PostCard from "./components/postCard";
import { motion } from "framer-motion";
import { PostDataContext } from "./utils/postDataContext";
import StickyWrapper from "@/components/stickyWrapper";
const Blog = () => {
  const postData = useContext(PostDataContext);

  return (
    <main className="w-[64vw]">
      <header>
        <h3 className="font-medium">
          Welcome to my blog ☕️ This is where I document my latest
          explorations.
        </h3>
      </header>

      {/* RECENT POSTS */}
      <section className="mt-[10vh]">
        <div className="flex items-center justify-between">
          <div className="text-feature">Recent Posts</div>
          <StickyWrapper cursorType={"underline"}>
            <motion.p
              whileTap={{ scale: 0.8 }}
              className="font-bold text-neutral-400 cursor-pointer"
            >
              See all
            </motion.p>
          </StickyWrapper>
        </div>
        <div id="recent-posts" className="grid grid-cols-3 mt-l gap-sm">
          {postData.map((collection) =>
            collection.posts.map((post) => (
              <PostCard key={post.metadata.slug} post={post} />
            ))
          )}
        </div>
      </section>

      {/* BLOG OVERVIEW */}
    </main>
  );
};

export default Blog;
