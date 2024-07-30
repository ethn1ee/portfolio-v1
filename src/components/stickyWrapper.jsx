"use client";

import { useStickyRefs } from "@/utils/useStickyRefs";
import { cloneElement, useEffect, useRef } from "react";

export const StickyWrapper = ({ children, cursorType }) => {
  const { addStickyElement, removeStickyElement } = useStickyRefs();
  const ref = useRef();

  useEffect(() => {
    addStickyElement(ref);
    return () => removeStickyElement(ref);
  }, []);

  return cloneElement(children, {
    ref,
    className: `cursor-${cursorType} ${children.props.className || ''}`
  });
};

export default StickyWrapper;
