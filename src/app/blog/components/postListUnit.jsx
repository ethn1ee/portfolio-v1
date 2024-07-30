"use client";

import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";
import StickyWrapper from "@/components/stickyWrapper";

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
  backgroundColor: "#151314",
};

export const PostListUnit = ({ slug, collection, title }) => {
  const pathname = usePathname();
  const currentPostPath = pathname.replace("/blog/post/", "");

  return (
    <Link href={`/blog/post/${collection}/${slug}`}>
      <StickyWrapper>
        <motion.div
          whileHover={navHoverStyle}
          animate={
            `${collection}/${slug}` === currentPostPath ? navActiveStyle : {}
          }
          transition={{ duration: 0.2 }}
          className="flex py-m cursor-pointer text-neutral-400"
        >
          <p className="text-inherit">{title}</p>
        </motion.div>
      </StickyWrapper>
    </Link>
  );
};

export const PageListUnit = ({ pageName }) => {
  const pathName = usePathname();
  const pagePath = "/blog/" + (pageName === "introduction" ? "" : pageName);

  const capitalizeString = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  return (
    <Link href={pagePath}>
      <StickyWrapper>
        <motion.div
          whileHover={navHoverStyle}
          animate={pathName === pagePath ? navActiveStyle : {}}
          transition={{ duration: 0.2 }}
          className="flex py-m cursor-pointer text-neutral-400"
        >
          <p className="text-inherit">{capitalizeString(pageName)}</p>
        </motion.div>
      </StickyWrapper>
    </Link>
  );
};
