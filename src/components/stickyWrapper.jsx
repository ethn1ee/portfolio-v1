"use client";

import { useStickyRefs } from "@/utils/useStickyRefs";
import { cloneElement, useEffect, useRef } from "react";

export const StickyWrapper = ({ children, cursorType, hideCursor = false }) => {
  const { addStickyElement, removeStickyElement } = useStickyRefs();
  const ref = useRef();

  useEffect(() => {
    addStickyElement(ref);
    return () => removeStickyElement(ref);
  }, []);

  return cloneElement(children, {
    ref,
    className: `cursor-${cursorType} ${hideCursor && "cursor-none"} ${
      children.props?.className || ""
    }`,
  });
};

export default StickyWrapper;
