"use client";

import { createContext, useState } from "react";
import LeftSidebar from "./components/leftSidebar";
import RightSidebar from "./components/rightSidebar";
import Content from "./components/content";
import { posts } from "@/data/blog";

export const CurrentPostContext = createContext();

const Blog = () => {
  const [currentPost, setCurrentPost] = useState("introduction");

  return (
    <main>
      <CurrentPostContext.Provider value={{ currentPost, setCurrentPost }}>
        <LeftSidebar />
        {currentPost && <RightSidebar />}
        <Content />
      </CurrentPostContext.Provider>
    </main>
  );
};

export default Blog;
