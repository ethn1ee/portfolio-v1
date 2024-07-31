"use client";

import { useContext, useEffect, useRef } from "react";
import PostCard from "./components/postCard";
import { animate, motion, stagger } from "framer-motion";
import { PostDataContext } from "./utils/postDataContext";
import StickyWrapper from "@/components/stickyWrapper";
import { customEase } from "@/utils/anim";
import Link from "next/link";

const Blog = () => {
  const postData = useContext(PostDataContext);

  const staggerText = stagger(0.2);

  useEffect(() => {
    animate(
      ".stagger-section",
      { opacity: [0, 1] },
      { delay: staggerText, ease: customEase, duration: 0.5 }
    );
  }, []);

  const recentPostsRef = useRef();

  return (
    <main className="w-[64vw]">
      <header className="stagger-section">
        <h3 className="font-medium">
          Welcome to my blog ☕️ This is where I document my latest
          explorations.
        </h3>
      </header>

      {/* RECENT POSTS */}
      <section className="stagger-section mt-[10vh]">
        <div className="flex items-center justify-between">
          <div className="text-feature">Recent Posts</div>
          <Link href="/blog/gallery">
            <StickyWrapper cursorType={"underline"}>
              <motion.p
                whileHover={{ opacity: 0.8 }}
                whileTap={{ scale: 0.8 }}
                className="font-bold text-neutral-400 h-6 cursor-pointer"
              >
                See all
              </motion.p>
            </StickyWrapper>
          </Link>
        </div>
        <div ref={recentPostsRef} className="grid grid-cols-3 mt-l gap-sm">
          {postData.map((collection) =>
            collection.posts.map((post) => (
              <PostCard key={post.metadata.slug} post={post} parentRef={recentPostsRef} />
            ))
          )}
        </div>
      </section>

      {/* BLOG OVERVIEW */}
      <section className="stagger-section"></section>
    </main>
  );
};

export default Blog;
