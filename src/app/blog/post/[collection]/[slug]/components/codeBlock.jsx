import SyntaxHighlighter from "react-syntax-highlighter";
import { stackoverflowDark } from "react-syntax-highlighter/dist/esm/styles/hljs";
import CodeHeader from "./codeHeader";

const CodeBlock = ({ children }) => {
  const language = children.props.className.replace("lang-", "");
  const code = children.props.children;

  return (
    <div className="relative z-10 backdrop-blur-xl border border-neutral-900 rounded-md overflow-x-auto">
      <CodeHeader language={language} code={code} />
      <SyntaxHighlighter
        className="!px-m !py-m !bg-transparent"
        language={language}
        style={stackoverflowDark}
        showLineNumbers
        lineNumberStyle={{ color: "#2b2829" }}
      >
        {code}
      </SyntaxHighlighter>
    </div>
  );
};

export default CodeBlock;
