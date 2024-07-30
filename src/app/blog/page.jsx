"use client";

import { useContext, useEffect, useRef } from "react";
import PostCard from "./components/postCard";
import { useStickyRefs } from "@/utils/useStickyRefs";
import { motion } from "framer-motion";
import { PostDataContext } from "./utils/postDataContext";
const Blog = () => {
  const postData = useContext(PostDataContext);
  const allPostButtonRef = useRef(null);
  const { addStickyElement, removeStickyElement } = useStickyRefs();

  useEffect(() => {
    addStickyElement(allPostButtonRef);
    return () => removeStickyElement(allPostButtonRef);
  }, []);

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
          <motion.p
            ref={allPostButtonRef}
            whileTap={{ scale: 0.8 }}
            className="cursor-underline font-bold text-neutral-400 cursor-pointer"
          >
            See all
          </motion.p>
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
