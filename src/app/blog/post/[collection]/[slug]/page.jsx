import getFormattedDate from "@/app/blog/utils/getFormattedDate";
import "./article.scss";
import {
  getPostByCollectionAndSlug,
  getPostData,
} from "@/app/blog/utils/postUtils";

import React from "react";
import Markdown from "markdown-to-jsx";
import CodeBlock from "./components/codeBlock";

const postData = getPostData();

const Post = ({ params }) => {
  const collection = params.collection;
  const slug = params.slug;
  const post = getPostByCollectionAndSlug(collection, slug);
  const formattedDate = getFormattedDate(post.metadata.date);

  return (
    <main className="w-[50vw]">
      <header>
        <small className="block font-bold text-neutral-400">
          {formattedDate}
        </small>
        <div className="text-hero font-semibold mt-sm">
          {post.metadata.title}
        </div>
        <div className="text-highlight mt-s">{post.metadata.subtitle}</div>
      </header>

      <article className={`mt-l markdown-body pb-xl`}>
        <Markdown
          options={{
            overrides: {
              pre: CodeBlock,
            },
          }}
        >
          {post.content}
        </Markdown>
      </article>
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
