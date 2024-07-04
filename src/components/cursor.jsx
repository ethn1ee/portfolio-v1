"use client";

import { motion, transform, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useState } from "react";
import { useStickyRefs } from "./useStickyRefs";

const Cursor = () => {
  const { stickyElements } = useStickyRefs();

  const useSmoothMouse = true;

  const [isHovered, setIsHovered] = useState(false);

  const [isOutline, setIsOutline] = useState(false);
  const [isUnderline, setIsUnderline] = useState(false);
  const [isHidden, setIsHidden] = useState(false);

  const mouse = {
    x: useMotionValue(0),
    y: useMotionValue(0),
  };

  const smoothOptions = { damping: 8, stiffness: 100, mass: 0.1 };
  const smoothMouse = {
    x: useSpring(mouse.x, smoothOptions),
    y: useSpring(mouse.y, smoothOptions),
  };

  const defaultCursorStyle = {
    width: 12,
    height: 12,
    opacity: 1,
    borderRadius: 4,
    left: useSmoothMouse ? smoothMouse.x : mouse.x,
    top: useSmoothMouse ? smoothMouse.y : mouse.y,
    backgroundColor: "#FAFAFAff",
    border: "0px solid #FAFAFAff",
    display: "block",
  };

  const [cursorStyle, setCursorStyle] = useState(defaultCursorStyle);
  const stickyDistance = [0, 0];
  const cursorVariants = {
    outline: {
      padding: 8,
      backgroundColor: "#FAFAFA00",
      border: "1px solid #FAFAFA33",
    },
    underline: {
      height: 1,
    },
    hidden: {
      opacity: 0,
      display: "none",
    },
  };

  const cursorTransition = {
    duration: 0.2,
    width: { duration: isOutline ? 0 : 0.2 },
    height: { duration: isOutline ? 0 : 0.2 },
    backgroundColor: {
      duration: isOutline ? 0 : 0.2,
      delay: isOutline ? 0 : 0.2,
    },
    border: {
      duration: 0,
      delay: 0.2,
    },
    display: {
      duration: 0,
      delay: 0,
    },
    opacity: {
      duration: isHidden ? 0 : 0.2,
      delay: isHidden ? 0 : 0.2,
    },
  };

  const manageMouseMove = (e) => {
    const { clientX, clientY } = e;

    setCursorStyle(defaultCursorStyle);
    setIsHovered(false);
    setIsOutline(false);
    setIsUnderline(false);
    setIsHidden(false);

    stickyElements.forEach((elementRef) => {
      if (elementRef.current) {
        const { left, top, width, height } =
          elementRef.current.getBoundingClientRect();
        const style = window.getComputedStyle(elementRef.current);
        const borderRadius = style.borderRadius;

        if (
          clientX >= left - stickyDistance[0] &&
          clientX <= left + width + stickyDistance[0] &&
          clientY >= top - stickyDistance[1] &&
          clientY <= top + height + stickyDistance[1]
        ) {
          setIsHovered(true);

          if (elementRef.current.className.includes("cursor-outline"))
            setIsOutline(true);
          else if (elementRef.current.className.includes("cursor-underline"))
            setIsUnderline(true);
          else if (elementRef.current.className.includes("cursor-hidden"))
            setIsHidden(true);

          setCursorStyle({
            ...defaultCursorStyle,
            width: width,
            height: height,
            borderRadius: borderRadius,
          });

          const center = { x: left + width / 2, y: top + height / 2 };

          if (isOutline) {
            setCursorStyle((prev) => ({
              ...prev,
              ...cursorVariants.outline,
              width: width + cursorVariants.outline.padding * 2,
              height: height + cursorVariants.outline.padding * 2,
            }));
            mouse.x.set(center.x);
            mouse.y.set(center.y);
          } else if (isUnderline) {
            setCursorStyle((prev) => ({
              ...prev,
              ...cursorVariants.underline,
              backgroundColor: style.color,
              width: width + 8,
            }));
            mouse.x.set(center.x);
            mouse.y.set(top + height + 4);
          } else if (isHidden) {
            setCursorStyle((prev) => ({
              ...prev,
              ...cursorVariants.hidden,
            }));
            mouse.x.set(center.x);
            mouse.y.set(center.y);
          } else {
            mouse.x.set(center.x);
            mouse.y.set(center.y);
          }
        }
      }
    });

    if (!isHovered) {
      setCursorStyle(defaultCursorStyle);
      mouse.x.set(clientX);
      mouse.y.set(clientY);
    }

    const isTouchDevice =
      "ontouchstart" in window ||
      navigator.maxTouchPoints > 0 ||
      navigator.msMaxTouchPoints > 0;

    if (isTouchDevice) {
      setCursorStyle(cursorVariants.hidden);
    }
  };

  useEffect(() => {
    window.addEventListener("mousemove", manageMouseMove);
    return () => {
      window.removeEventListener("mousemove", manageMouseMove);
    };
  });

  return (
    <motion.div
      className="fixed pointer-events-none mix-blend-difference -translate-x-1/2 -translate-y-1/2"
      style={cursorStyle}
      animate={cursorStyle}
      transition={cursorTransition}
    />
  );
};

export default Cursor;
