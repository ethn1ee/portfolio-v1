import { unified } from "unified";
import markdown from "remark-parse";
import remarkReact from "remark-react";
import React from "react";
import SyntaxHighlighter from "react-syntax-highlighter";
import { stackoverflowDark } from "react-syntax-highlighter/dist/esm/styles/hljs";

export const styleCodeBlocks = (markdownText) => {
  return unified()
    .use(markdown)
    .use(remarkReact, {
      createElement: React.createElement,
      // remarkReactComponents: {
      //   pre: (props) => <pre {...props} />,
      // },
    })
    .processSync(markdownText).result;
};

const PreBlock = ({ children }) => {
  console.log(children[0]);
  // const language = className ? className.replace("language-", "") : "text";
  return (
    <>
      {/* <SyntaxHighlighter language={"python"} style={stackoverflowDark}> */}
      {children}
      {/* </SyntaxHighlighter> */}
    </>
  );
};

const CodeBlock = ({ children, className }) => {
  const language = className ? className.replace("language-", "") : "text";
  return (
    <div className="code-container">
      <SyntaxHighlighter language={language} style={stackoverflowDark}>
        {children}
      </SyntaxHighlighter>
    </div>
  );
};
