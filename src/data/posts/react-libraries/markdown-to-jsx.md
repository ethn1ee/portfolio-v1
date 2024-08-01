---
title: "Markdown to JSX"
subtitle: "Converting a markdown file into a customizable react component"
thumbnail: "/blog-thumbnails/markdown-to-jsx.png"
tags: ["React", "Next.js", "Mardown"]
---

# 1. Set up markdown-to-jsx

Converting markdown into HTML can be challenging when adding custom React components. However, the `markdown-to-jsx` library simplifies this process by converting markdown files into JSX format and allowing easy customization with custom components.

Install [markdown-to-jsx](https://www.npmjs.com/package/markdown-to-jsx) from npm.

```zsh
npm i markdown-to-jsx
```

Import `Markdown` component, a [HOC](https://legacy.reactjs.org/docs/higher-order-components.html) for easy React use. We can feed the markdown content as a direct child and the rest is taken care of automatically.

```JSX
import Markdown from "markdown-to-jsx";

const mdToJSX = () => {
  const markdown = `
    # Hello, World!
    [Link to GitHub](https://github.com/)
  `;

  return (
    <Markdown>
      {markdown}
    </Markdown>
  )
}

export default mdToJSX;
```

# 2. Add Custom Components

We can add options to the `Markdown` component to have various controls such as overriding default HTML tags. In this example, we replace `<a>` tag with our custom React component `<CustomA>` that utilizes Next.js `Link` component and Framer Motion animation for hover effect.

```JSX
import Markdown from "markdown-to-jsx";
import CustomA from "./customA";

const mdToJSX = () => {
  const markdown = `
    # Hello, World!
    [Link to GitHub](https://github.com/)
  `;

  const mdOptions = {
    overrides: {
      a: CustomA,
    },
  }

  return (
    <Markdown options={mdOptions}>
      {markdown}
    </Markdown>
  )
}

export default mdToJSX;

```

# 3. Edit Custom Component

The `CustomA` component takes `href` and `children` as props. We extract the text from `children` and pass it to the `Link` component. The `motion` component wraps the text to add a hover effect.

```JSX
// customA.jsx

"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const CustomA = ({ children, href }) => {
  const text = children[0];

  return (
    <Link href={href} target="_blank" rel="noopener noreferrer">
      <motion.span
        whileHover={{ opacity: 0.8 }}
        className="cursor-pointer inline-block w-fit h-[21px] !text-primary-400"
      >
        {text}
      </motion.span>
    </Link>
  );
};

export default CustomA;
```
