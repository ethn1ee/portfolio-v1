"use client";

import Markdown from "markdown-to-jsx";

const mdToReact = ({markdown}) => {
  return <Markdown>{markdown}</Markdown>;
};

export default mdToReact;