"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useState } from "react";
import { useStickyRefs } from "../utils/useStickyRefs";

const Cursor = () => {
  const { stickyElements } = useStickyRefs();

  const useSmoothMouse = true;
  const STICKY_DISTANCE = [0, 0];

  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [isDefault, setIsDefault] = useState(true);
  const [elementStyle, setElementStyle] = useState({
    borderRadius: 0,
    backgroundColor: "#FAFAFA",
  });

  const mouse = {
    x: useMotionValue(-100),
    y: useMotionValue(-100),
  };

  const smoothOptions = { damping: 8, stiffness: 100, mass: 0.1 };
  const smoothMouse = {
    x: useSpring(mouse.x, smoothOptions),
    y: useSpring(mouse.y, smoothOptions),
  };

  const defaultCursorStyle = {
    left: useSmoothMouse ? smoothMouse.x : mouse.x,
    top: useSmoothMouse ? smoothMouse.y : mouse.y,
    width: 18,
    height: 18,
    border: "none",
    borderRadius: "0px",
    opacity: 1,
    padding: "0px",
    backgroundColor: "#FAFAFAff",
    mixBlendMode: "difference",
    display: "block",
    boxSizing: "content-box",
    transformOrigin: "center",
  };

  const [cursorStyle, setCursorStyle] = useState(defaultCursorStyle);

  const cursorVariants = {
    underline: {
      height: 1,
    },
    textpointer: {
      width: 2,
    },
    hover: {
      backgroundColor: "#2B2829",
      borderRadius: "100px",
      padding: "10px",
    },
    experienceCard: {
      height: 2,
      width: 10,
      borderRadius: 10,
    },
    hidden: {
      opacity: 0,
      display: "none",
    },
  };

  const cursorTransition = {
    duration: 0.2,
    width: { duration: 0.2 },
    height: { duration: 0.2 },
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
    if (isTouchDevice) return;

    const { clientX, clientY } = e;

    setCursorStyle(defaultCursorStyle);
    setIsHidden(false);

    // Find all hovered elements and select the one with the highest z-index
    let hoveredElement = null;
    stickyElements.forEach((elementRef) => {
      if (elementRef.current) {
        const { left, top, width, height } =
          elementRef.current.getBoundingClientRect();

        if (
          clientX >= left - STICKY_DISTANCE[0] &&
          clientX <= left + width + STICKY_DISTANCE[0] &&
          clientY >= top - STICKY_DISTANCE[1] &&
          clientY <= top + height + STICKY_DISTANCE[1]
        ) {
          if (
            !hoveredElement ||
            window.getComputedStyle(elementRef.current).zIndex >
              window.getComputedStyle(hoveredElement.current).zIndex
          ) {
            hoveredElement = elementRef;
          }
        }
      }
    });

    // Apply styles to cursor
    if (hoveredElement?.current) {
      // console.log(hoveredElement.current);
      setElementStyle(window.getComputedStyle(hoveredElement.current));
      setIsDefault(false);

      const className = hoveredElement.current.className;
      const { left, top, width, height } =
        hoveredElement.current.getBoundingClientRect();
      let cursorType = "default";

      if (className.includes("cursor-underline")) {
        cursorType = "underline";
      } else if (className.includes("cursor-hidden")) {
        setIsHidden(true);
        cursorType = "hidden";
      } else if (className.includes("cursor-textpointer")) {
        cursorType = "textpointer";
      } else if (className.includes("cursor-experience-card")) {
        cursorType = "experienceCard";
      } else if (className.includes("cursor-hover")) {
        cursorType = "hover";
      }

      // Center cursor to element
      const center = { x: left + width / 2, y: top + height / 2 };
      mouse.x.set(center.x);
      mouse.y.set(center.y);

      // Apply global cursor style
      setCursorStyle({
        ...defaultCursorStyle,
        width: width,
        height: height,
        zIndex: 100,
        borderRadius: elementStyle.borderRadius,
        ...cursorVariants[cursorType],
      });

      // Apply calculated styles
      switch (cursorType) {
        case "underline":
          setCursorStyle((prev) => ({
            ...prev,
            backgroundColor: elementStyle.color,
            width: width,
          }));
          mouse.y.set(top + height);
          break;

        case "textpointer":
          setCursorStyle((prev) => ({
            ...prev,
            height: elementStyle.fontSize,
          }));
          mouse.x.set(clientX);
          mouse.y.set(clientY);
          break;

        case "experienceCard":
          setCursorStyle((prev) => ({
            ...prev,
            opacity: elementStyle.opacity,
          }));
          mouse.x.set(left + width + 13);
          mouse.y.set(top + 8.5);
          break;

        default:
          break;
      }
    } else {
      setCursorStyle(defaultCursorStyle);
      mouse.x.set(clientX);
      mouse.y.set(clientY);
      setIsDefault(true);
    }
  };

  const handleMouseDown = () => {
    if (!isDefault) return;
    setCursorStyle((prev) => ({
      ...prev,
      width: 40,
      height: 40,
    }));
  };

  const handleMouseUp = () => {
    if (!isDefault) return;
    setCursorStyle({ ...defaultCursorStyle });
  };

  useEffect(() => {
    window.addEventListener("mousemove", manageMouseMove);
    window.addEventListener("click", manageMouseMove);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    return () => {
      window.removeEventListener("mousemove", manageMouseMove);
      window.removeEventListener("click", manageMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  });

  useEffect(() => {
    setIsTouchDevice(
      "ontouchstart" in window ||
        navigator.maxTouchPoints > 0 ||
        navigator.msMaxTouchPoints > 0
    );
  }, []);

  return (
    <>
      {!isTouchDevice && (
        <motion.div
          className="fixed pointer-events-none -translate-x-1/2 -translate-y-1/2 overflow-hidden box-border mix-blend-difference z-10"
          style={cursorStyle}
          animate={cursorStyle}
          transition={cursorTransition}
        />
      )}
    </>
  );
};

export default Cursor;
