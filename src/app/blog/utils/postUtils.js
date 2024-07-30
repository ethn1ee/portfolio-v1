import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

const postsDirectory = path.join(process.cwd(), "src/data/posts");

export const getAllSlugs = (dir = postsDirectory) => {
  let slugs = [];
  const files = fs.readdirSync(dir);

  files.forEach((file) => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      slugs = slugs.concat(getAllSlugs(filePath));
    } else if (file.endsWith(".md")) {
      const relativePath = path.relative(dir, filePath);
      const slug = path.join(relativePath.replace(/\.md$/, ""));
      slugs.push(slug);
    }
  });

  return slugs;
};

export const getCollectionNames = () => {
  const files = fs.readdirSync(postsDirectory);
  const collections = [];

  files.forEach((file) => {
    const filePath = path.join(postsDirectory, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      collections.push(file);
    }
  });

  return collections;
};

export const getSlugsByCollection = (collection) => {
  const dir = path.join(postsDirectory, collection);

  return getAllSlugs(dir);
};

export const getPostByCollectionAndSlug = (collection, slug) => {
  const fullPath = path.join(postsDirectory, collection, slug + ".md");
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const stat = fs.statSync(fullPath);
  const creationDate = stat.birthtime;
  const { data, content } = matter(fileContents);
  // const processedContent = remark().use(html).processSync(content).toString();

  return {
    metadata: {
      collection,
      slug,
      date: creationDate,
      ...data,
    },
    content,
  };
};

export const getPostData = () => {
  const collections = getCollectionNames();
  const postData = collections.map((collection) => {
    return {
      name: collection,
      posts: getSlugsByCollection(collection).map((slug) => {
        return getPostByCollectionAndSlug(collection, slug);
      }),
    };
  });

  return postData;
};
