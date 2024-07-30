"use client";

import {
  AnimatePresence,
  motion,
  useMotionValue,
  useSpring,
} from "framer-motion";
import { useEffect, useState } from "react";
import { useStickyRefs } from "../utils/useStickyRefs";

const Cursor = () => {
  const { stickyElements } = useStickyRefs();

  const useSmoothMouse = true;

  const [isTouchDevice, setIsTouchDevice] = useState(false);

  const [isHovered, setIsHovered] = useState(false);
  const [isHidden, setIsHidden] = useState(false);

  const [elementStyle, setElementStyle] = useState({
    borderRadius: 0,
    backgroundColor: "#FAFAFA",
  });

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
  const stickyDistance = [0, 0];
  const cursorVariants = {
    underline: {
      height: 1,
    },
    textpointer: {
      width: 2,
    },
    hover: {
      backgroundColor: "#FAFAFA22",
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
    setIsHovered(false);
    setIsHidden(false);

    stickyElements.forEach((elementRef) => {
      if (elementRef.current) {
        const { left, top, width, height } =
          elementRef.current.getBoundingClientRect();

        if (
          clientX >= left - stickyDistance[0] &&
          clientX <= left + width + stickyDistance[0] &&
          clientY >= top - stickyDistance[1] &&
          clientY <= top + height + stickyDistance[1]
        ) {
          setElementStyle(window.getComputedStyle(elementRef.current));
          setIsHovered(true);

          let cursorType = "default";

          if (elementRef.current.className.includes("cursor-underline")) {
            cursorType = "underline";
          } else if (elementRef.current.className.includes("cursor-hidden")) {
            setIsHidden(true);
            cursorType = "hidden";
          } else if (
            elementRef.current.className.includes("cursor-textpointer")
          ) {
            cursorType = "textpointer";
          } else if (
            elementRef.current.className.includes("cursor-experience-card")
          ) {
            cursorType = "experienceCard";
          } else if (elementRef.current.className.includes("cursor-hover")) {
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
            borderRadius: elementStyle.borderRadius,
            ...cursorVariants[cursorType],
          });

          // Apply calculated styles
          switch (cursorType) {
            case "underline":
              setCursorStyle((prev) => ({
                ...prev,
                backgroundColor: elementStyle.color,
                width: width + 8,
              }));
              mouse.y.set(top + height + 4);
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
        }
      }
    });

    if (!isHovered) {
      setCursorStyle(defaultCursorStyle);
      mouse.x.set(clientX);
      mouse.y.set(clientY);
    }
  };

  useEffect(() => {
    window.addEventListener("mousemove", manageMouseMove);
    window.addEventListener("click", manageMouseMove);
    return () => {
      window.removeEventListener("mousemove", manageMouseMove);
      window.removeEventListener("click", manageMouseMove);
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
    <AnimatePresence>
      {!isTouchDevice && (
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}>
          <motion.div
            className="fixed pointer-events-none -translate-x-1/2 -translate-y-1/2 overflow-hidden box-border mix-blend-difference z-10"
            style={cursorStyle}
            initial={cursorStyle}
            animate={cursorStyle}
            transition={cursorTransition}
          ></motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Cursor;
