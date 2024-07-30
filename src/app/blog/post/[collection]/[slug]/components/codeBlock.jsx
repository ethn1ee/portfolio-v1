"use client";

import { useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom/client";
import { motion } from "framer-motion";
import { customEase } from "@/utils/anim";
import SyntaxHighlighter from "react-syntax-highlighter";
import { stackoverflowDark } from "react-syntax-highlighter/dist/esm/styles/hljs";
import Lottie from "lottie-react";
import copyAnimation from "./Documents.json";
import checkAnimation from "./Approve.json";

const StyleCodeBlocks = ({ children }) => {
  const articleRef = useRef();

  useEffect(() => {
    if (typeof window !== "undefined" && articleRef.current) {
      const preElements = articleRef.current.querySelectorAll("pre");

      preElements.forEach((pre) => {
        // Check if the label already exists
        if (
          !pre.previousElementSibling ||
          !pre.previousElementSibling.classList.contains("code-header")
        ) {
          const code = pre.querySelector("code");
          const className = code.className;
          const language = className.replace("language-", "");

          const wrapper = document.createElement("div");
          wrapper.classList.add("code-block");
          const root = ReactDOM.createRoot(wrapper);
          root.render(<CodeBlock language={language} code={code.innerText} />);

          pre.parentNode.replaceChild(wrapper, pre);
        }
      });
    }
  }, []);

  return <div ref={articleRef}>{children}</div>;
};

const CodeBlock = ({ language, code }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative z-10 backdrop-blur-xl border border-neutral-900 rounded-md overflow-x-auto"
    >
      <CodeHeader language={language} code={code} isBlockHovered={isHovered} />
      <SyntaxHighlighter
        className="!px-m !py-m !bg-transparent"
        language={language}
        style={stackoverflowDark}
        showLineNumbers
        lineNumberStyle={{ color: "#2b2829" }}
      >
        {code}
      </SyntaxHighlighter>
    </motion.div>
  );
};

const CodeHeader = ({ language, code, isBlockHovered }) => {
  const [isHovered, setIsHovered] = useState(false);
  const copyRef = useRef();
  const checkRef = useRef();
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = () => {
    setIsCopied(true);
    navigator.clipboard.writeText(code);
    setTimeout(() => setIsCopied(false), 3000);
  };

  useEffect(() => {
    copyRef.current.setSpeed(2);
    if (isHovered) {
      copyRef.current.play();
    } else {
      copyRef.current.stop();
    }
  }, [isHovered, copyRef]);

  useEffect(() => {
    checkRef.current.setSpeed(2);
    if (isCopied) {
      checkRef.current.play();
    } else {
      checkRef.current.stop();
    }
  }, [isCopied, checkRef]);

  return (
    <div className="w-full flex justify-between items-center px-m py-xs bg-neutral-1000 border-b border-neutral-900">
      {/* LANGUAGE */}
      <small className="text-xs !text-neutral-400 select-none">
        {language}
      </small>

      {/* COPY BUTTON */}
      <motion.button
        animate={{ opacity: isBlockHovered || isCopied ? 1 : 0 }}
        whileHover={{ opacity: 0.8, transition: { duration: 0 } }}
        whileTap={{ scale: 0.5 }}
        onClick={handleCopy}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="!text-xs !text-neutral-400 w-5 h-5 overflow-hidden relative -right-1"
      >
        <motion.div
          animate={{ scale: isCopied ? 1 : 0 }}
          transition={{ duration: 0.3, ease: customEase }}
          className="absolute top-[2px] right-0"
        >
          <Lottie
            animationData={checkAnimation}
            loop={false}
            style={{ width: 16, height: 16 }}
            lottieRef={checkRef}
          />
        </motion.div>
        <motion.div
          animate={{ scale: isCopied ? 0 : 1 }}
          transition={{ duration: 0.3, ease: customEase }}
          className="absolute top-[2px] right-0"
        >
          <Lottie
            animationData={copyAnimation}
            loop={false}
            style={{ width: 16, height: 16 }}
            lottieRef={copyRef}
          />
        </motion.div>
      </motion.button>
    </div>
  );
};

export default StyleCodeBlocks;
