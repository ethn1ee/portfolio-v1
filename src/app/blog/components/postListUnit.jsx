"use client";

import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
import { useStickyRefs } from "@/utils/useStickyRefs";
import Link from "next/link";

const navHoverStyle = {
  paddingLeft: 10,
  paddingRight: 10,
  color: "#fafafa",
  backgroundColor: "#2B282900",
};

const navActiveStyle = {
  paddingLeft: 10,
  paddingRight: 10,
  color: "#fafafa",
  backgroundColor: "#2B2829ff",
};

export const PostListUnit = ({ slug, collection, title }) => {
  const ref = useRef();
  const { addStickyElement, removeStickyElement } = useStickyRefs();
  const pathname = usePathname();
  const currentPostPath = pathname.replace("/blog/post/", "");

  useEffect(() => {
    addStickyElement(ref);
    return () => removeStickyElement(ref);
  }, [slug]);

  return (
    <Link href={`/blog/post/${collection}/${slug}`}>
      <motion.div
        ref={ref}
        whileHover={navHoverStyle}
        animate={`${collection}/${slug}` === currentPostPath ? navActiveStyle : {}}
        transition={{ duration: 0.2 }}
        className="flex py-m cursor-pointer text-neutral-400"
      >
        <p className="text-inherit">{title}</p>
      </motion.div>
    </Link>
  );
};

export const IntroductionUnit = () => {
  const pathName = usePathname();
  const introRef = useRef();
  const { addStickyElement, removeStickyElement } = useStickyRefs();

  useEffect(() => {
    addStickyElement(introRef);
    return () => {
      removeStickyElement(introRef);
    };
  }, []);

  return (
    <Link href="/blog">
      <motion.div
        ref={introRef}
        whileHover={navHoverStyle}
        animate={pathName === "/blog" ? navActiveStyle : {}}
        transition={{ duration: 0.2 }}
        className="flex py-m cursor-pointer text-neutral-400"
      >
        <p className="text-inherit">Introduction</p>
      </motion.div>
    </Link>
  );
};

export const GalleryUnit = () => {
  const pathName = usePathname();
  const galleryRef = useRef();
  const { addStickyElement, removeStickyElement } = useStickyRefs();

  useEffect(() => {
    addStickyElement(galleryRef);
    return () => {
      removeStickyElement(galleryRef);
    };
  }, []);

  return (
    <Link href="/blog/gallery">
      <motion.div
        ref={galleryRef}
        whileHover={navHoverStyle}
        animate={pathName === "/blog/gallery" ? navActiveStyle : {}}
        transition={{ duration: 0.2 }}
        className="flex py-m cursor-pointer text-neutral-400"
      >
        <p className="text-inherit">Gallery</p>
      </motion.div>
    </Link>
  );
};
