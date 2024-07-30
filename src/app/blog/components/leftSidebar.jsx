"use client";

import { useContext } from "react";
import { GalleryUnit, IntroductionUnit, PostListUnit } from "./postListUnit";
import { PostDataContext } from "../utils/postDataContext";

const LeftSidebar = () => {
  const postData = useContext(PostDataContext);

  return (
    <aside className="w-[16vw] h-[calc(100vh-60px)] fixed pt-ml">
      {/* COLLECTION LIST */}
      <div className="flex flex-col gap-l">
        {/* INTRO TO BLOG */}
        <div className="h-fit w-full">
          <small className="font-bold uppercase select-none">Welcome!</small>
          <div className="flex flex-col mt-sm">
            {/* INTRODUCTION */}
            <IntroductionUnit />
            {/* GALLERY */}
            <GalleryUnit />
          </div>
        </div>

        {/* COLLECTIONS */}
        {postData.map((collection, index) => (
          <CollectionListUnit collection={collection} key={index} />
        ))}
      </div>
    </aside>
  );
};

const CollectionListUnit = ({ collection }) => {
  return (
    <div className="h-fit w-full">
      <small className="font-bold uppercase select-none">
        {collection.name}
      </small>
      <div className="flex flex-col mt-sm">
        {collection.posts.map((post, index) => (
          <PostListUnit
            slug={post.metadata.slug}
            collection={collection.name}
            title={post.metadata.title}
            key={index}
          />
        ))}
      </div>
    </div>
  );
};

export default LeftSidebar;
