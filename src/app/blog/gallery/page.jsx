"use client";

import { useContext, useEffect, useRef, useState } from "react";
import { PostDataContext } from "../utils/postDataContext";
import PostCard from "../components/postCard";
import Tag from "@/components/tag";
import { getAllTags } from "../utils/postUtilsClient";
import { animate, stagger } from "framer-motion";
import { customEase } from "@/utils/anim";

const Gallery = () => {
  const postData = useContext(PostDataContext);
  const galleryRef = useRef();

  const allPosts = postData.flatMap((collection) => collection.posts);
  allPosts.sort((a, b) => b.metadata.date - a.metadata.date);

  const allTags = getAllTags(postData);
  allTags.sort();
  allTags.unshift("All");

  const [filter, setFilter] = useState("All");
  const [filteredPosts, setFilteredPosts] = useState(allPosts);

  const handleTagClick = (tag) => {
    setFilter(tag);

    if (tag === "All") {
      setFilteredPosts(allPosts);
    } else {
      setFilteredPosts(
        allPosts.filter((post) => post.metadata.tags.includes(tag))
      );
    }
  };

  const staggerText = stagger(0.2);

  useEffect(() => {
    animate(
      ".stagger-section",
      { opacity: [0, 1] },
      { delay: staggerText, ease: customEase, duration: 0.5 }
    );
  }, []);

  return (
    <main className="w-[64vw] stagger-section">
      <header>
        <h3>All Posts</h3>

        {/* TAGS */}
        <div className="flex mt-xl gap-sm">
          {allTags.map((tag) => (
            <div
              onClick={() => handleTagClick(tag)}
              key={tag}
              className="cursor-pointer"
            >
              <Tag item={tag} highlight={tag === filter} />
            </div>
          ))}
        </div>
      </header>

      {/* POSTS */}
      <section className="stagger-section">
        <div ref={galleryRef} className="grid grid-cols-3 mt-xl gap-sm">
          {filteredPosts.map((post) => (
            <PostCard
              key={post.metadata.slug}
              post={post}
              parentRef={galleryRef}
            />
          ))}
        </div>
      </section>
    </main>
  );
};

export default Gallery;
