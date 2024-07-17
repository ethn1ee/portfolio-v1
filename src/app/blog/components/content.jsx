"use client";

import { useContext } from "react";
import { CurrentPostContext } from "../page";
import Introduction from "./introduction";
import Gallery from "./gallery";

const Content = () => {
  const { currentPost } = useContext(CurrentPostContext);

  return (
    <div
      style={{ width: typeof currentPost === "string" ? "64vw" : "50vw" }}
      className="mx-[25vw]"
    >
      {typeof currentPost === "string" ? (
        currentPost === "introduction" ? (
          <Introduction />
        ) : (
          <Gallery />
        )
      ) : (
        <h3 className="font-semibold">{currentPost.metadata.title}</h3>
      )}
    </div>
  );
};

export default Content;
