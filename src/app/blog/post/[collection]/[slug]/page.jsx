import "./article.scss";
import {
  getPostByCollectionAndSlug,
  getPostData,
} from "@/app/blog/utils/postUtils";

import React from "react";

import ArticleHeader from "./components/articleHeader";
import ArticleBody from "./components/articleBody";

const postData = getPostData();

const Post = ({ params }) => {
  const collection = params.collection;
  const slug = params.slug;
  const post = getPostByCollectionAndSlug(collection, slug);

  return (
    <main className="w-[50vw]">
      <ArticleHeader post={post} />
      <ArticleBody post={post} />
    </main>
  );
};

export const generateStaticParams = async () => {
  const params = postData
    .map((collection) => {
      return collection.posts.map((post) => {
        return { collection: collection.name, slug: post.metadata.slug };
      });
    })
    .flat();

  return params;
};
export default Post;
