"use client";

import StickyWrapper from "@/components/stickyWrapper";
import { useEffect, useRef, useState } from "react";

const CustomH1 = ({ children }) => {
  const originRef = useRef(null);
  const ref = useRef(null);

  const [headerHeight, setHeaderHeight] = useState(0);

  const handleScroll = () => {
    const headerElement = document.getElementById("article-header");
    if (headerElement) {
      setHeaderHeight(headerElement.clientHeight);
    }

    if (originRef.current && ref.current) {
      const top = originRef.current.getBoundingClientRect().top;
      if (top < 0) {
        ref.current.style.position = "fixed";
        ref.current.style.top = headerHeight + "px";
      } else {
        ref.current.style.position = "absolute";
        ref.current.style.top = "0px";
      }
    }
  };

  const handleClick = () => {
    if (originRef.current) {
      originRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  useEffect(() => {
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [headerHeight]);

  return (
    <div className="relative w-[50vw] h-[54px] mt-xl z-20">
      {/* SPACER */}
      <div
        ref={originRef}
        style={{
          top: -headerHeight,
          height: headerHeight,
        }}
        className="absolute"
      />

      {/* H1 */}

      <h1
        ref={ref}
        onClick={handleClick}
        className="text-highlight cursor-pointer w-[50vw] h-[54px] py-sm text-base-white font-semibold border-b border-neutral-900 bg-base-black"
      >
        {children}
        <StickyWrapper cursorType="underline">
          <span className="absolute top-0 left-0 w-[50vw] h-[54px]" />
        </StickyWrapper>
      </h1>
    </div>
  );
};

export default CustomH1;
