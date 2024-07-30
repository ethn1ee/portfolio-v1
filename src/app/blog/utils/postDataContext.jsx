"use client";

import { createContext, useContext } from "react";

export const PostDataContext = createContext(null);

export const PostDataProvider = ({ children, value }) => {
  return (
    <PostDataContext.Provider value={value}>
      {children}
    </PostDataContext.Provider>
  );
};

export const getPost = (postData, collectionName, slug) => {
  const post = postData
    .find((collection) => collection.name === collectionName)
    .posts.find((post) => post.metadata.slug === slug);

  return post;
};
