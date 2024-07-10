"use client";

import {
  AnimatePresence,
  motion,
  transform,
  useMotionValue,
  useSpring,
} from "framer-motion";
import { useEffect, useState } from "react";
import { useStickyRefs } from "./useStickyRefs";
import { customEase } from "./anim";

const Cursor = () => {
  const { stickyElements } = useStickyRefs();

  const useSmoothMouse = true;

  const [isHovered, setIsHovered] = useState(false);

  const [isUnderline, setIsUnderline] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [isTextClip, setIsTextClip] = useState(false);

  const [elementStyle, setElementStyle] = useState({
    borderRadius: 0,
    backgroundColor: "#FAFAFA",
  });
  const [textContent, setTextContent] = useState("");

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
    borderRadius: 0,
    left: useSmoothMouse ? smoothMouse.x : mouse.x,
    top: useSmoothMouse ? smoothMouse.y : mouse.y,
    backgroundColor: "#FAFAFA",
    border: "none",
    display: "block",

    initial: { scale: 1 },
    animate: { scale: 0.1, transition: { duration: 1 } },
    exit: { scale: 1, transition: { duration: 1 } },
  };

  const [cursorStyle, setCursorStyle] = useState(defaultCursorStyle);
  const stickyDistance = [0, 0];
  const cursorVariants = {
    underline: {
      height: 1,
    },
    textclip: {
      backgroundClip: "text",
      WebkitBackgroundClip: "text",
      backgroundColor: "#FAFAFAff",
    },
    textpointer: {
      width: "2px",
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
    backgroundColor: {
      duration: 0.5,
      delay: 0,
    },
    border: {
      duration: 0.2,
      delay: 0,
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
    setIsUnderline(false);
    setIsHidden(false);
    setIsTextClip(false);

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
            setIsUnderline(true);
            cursorType = "underline";
          } else if (elementRef.current.className.includes("cursor-hidden")) {
            setIsHidden(true);
            cursorType = "hidden";
          } else if (elementRef.current.className.includes("cursor-textclip")) {
            setIsTextClip(true);
            cursorType = "textclip";
          } else if (
            elementRef.current.className.includes("cursor-textpointer")
          ) {
            cursorType = "textpointer";
          }

          setCursorStyle({
            ...defaultCursorStyle,
            width: width,
            height: height,
            borderRadius: elementStyle.borderRadius,
          });

          // TODO: Make cursorTransition a state as well

          const center = { x: left + width / 2, y: top + height / 2 };

          setCursorStyle((prev) => ({
            ...prev,
            ...cursorVariants[cursorType],
          }));

          mouse.x.set(center.x);
          mouse.y.set(center.y);

          switch (cursorType) {
            case "underline":
              setCursorStyle((prev) => ({
                ...prev,
                backgroundColor: elementStyle.color,
                width: width + 8,
              }));
              mouse.y.set(top + height + 4);
              break;

            case "textclip":
              setCursorStyle((prev) => ({
                ...prev,
              }));
              setTextContent(elementRef.current.textContent);
              mouse.x.set(center.x);
              mouse.y.set(center.y);
              break;

            case "textpointer":
              setCursorStyle((prev) => ({
                ...prev,
                height: elementStyle.fontSize,
              }));
              mouse.x.set(clientX);
              mouse.y.set(clientY);

            default:
              setCursorStyle((prev) => ({
                ...prev,
                backgroundColor: "#FAFAFAff",
                border: "0px solid #FAFAFA00",
              }));
              break;
          }

          // if (isOutline) {
          //   setCursorStyle((prev) => ({
          //     ...prev,
          //     ...cursorVariants.outline,
          //     width: width + cursorVariants.outline.padding * 2,
          //     height: height + cursorVariants.outline.padding * 2,
          //   }));
          //   mouse.x.set(center.x);
          //   mouse.y.set(center.y);
          // } else if (isUnderline) {
          //   setCursorStyle((prev) => ({
          //     ...prev,
          //     ...cursorVariants.underline,
          //     backgroundColor: elementStyle.color,
          //     width: width + 8,
          //   }));
          //   mouse.x.set(center.x);
          //   mouse.y.set(top + height + 4);
          // } else if (isHidden) {
          //   setCursorStyle((prev) => ({
          //     ...prev,
          //     ...cursorVariants.hidden,
          //   }));
          //   mouse.x.set(center.x);
          //   mouse.y.set(center.y);
          // } else if (isTextClip) {
          //   setCursorStyle((prev) => ({
          //     ...prev,
          //     ...cursorVariants.textclip,
          //   }));
          //   setTextContent(elementRef.current.textContent);
          //   mouse.x.set(center.x);
          //   mouse.y.set(center.y);
          // } else {
          //   mouse.x.set(center.x);
          //   mouse.y.set(center.y);
          // }
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
      className="fixed pointer-events-none -translate-x-1/2 -translate-y-1/2 overflow-hidden box-border"
      style={cursorStyle}
      initial={cursorStyle}
      animate={cursorStyle}
      transition={cursorTransition}
    >
      {isTextClip && (
        <motion.div
          style={{
            fontSize: elementStyle.fontSize || "16px",
            fontWeight: elementStyle.fontWeight || "400",
          }}
          transition={{ duration: 0.2, ease: customEase }}
          className="flex items-center overflow-hidden h-full w-full text-transparent"
        >
          {textContent}
        </motion.div>
      )}
    </motion.div>
  );
};

export default Cursor;
