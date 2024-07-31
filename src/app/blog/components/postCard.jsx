"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { customEase } from "@/utils/anim";
import Link from "next/link";
import getFormattedDate from "../utils/getFormattedDate";

const PostCard = ({ post, parentRef }) => {
  const [parentWidth, setParentWidth] = useState(0);
  const updateParentWidth = () => {
    const parentElement = parentRef.current;
    if (parentElement) {
      setParentWidth(parentElement.offsetWidth);
      setThumbnailWidth((parentWidth - 20) / 3 - 12);
    }
  };
  const thumbnailAspectRatio = 16 / 9;
  const [thumbnailWidth, setThumbnailWidth] = useState(0);
  const formattedDate = getFormattedDate(post.metadata.date);

  useEffect(() => {
    updateParentWidth();
    window.addEventListener("resize", updateParentWidth);
    return () => window.removeEventListener("resize", updateParentWidth);
  });

  return (
    <Link
      href={`/blog/post/${post.metadata.collection}/${post.metadata.slug}`}
      className="w-fit h-fit"
    >
      <motion.div
        style={{ outline: "1px solid #2b282900" }}
        whileHover={{
          scale: 1.03,
          outline: "1px solid #2b2829ff",
        }}
        transition={{ duration: 0.2, ease: customEase }}
        className="rounded-md cursor-pointer backdrop-blur-xl relative z-20 p-s"
      >
        {/* THUMBNAIL */}
        <div
          style={{
            width: thumbnailWidth,
            height: thumbnailWidth / thumbnailAspectRatio,
          }}
          className="bg-neutral-900 rounded-md overflow-hidden relative"
        >
          <Image src={post.metadata.thumbnail} alt="" fill />
        </div>

        {/* METADATA */}
        <small className="block font-bold mt-m text-neutral-400">
          {formattedDate}
        </small>
        <div className="text-highlight font-semibold mt-sm">
          {post.metadata.title}
        </div>
        <div className="flex flex-wrap gap-s mt-sm">
          {post.metadata.tags.map((tag) => (
            <MiniTag tag={tag} key={tag} />
          ))}
        </div>
      </motion.div>
    </Link>
  );
};

const MiniTag = ({ tag }) => {
  return (
    <small className="text-xs w-fit h-fit bg-base-black border-[1px] rounded-md border-neutral-900 py-xs px-s">
      {tag}
    </small>
  );
};

export default PostCard;
