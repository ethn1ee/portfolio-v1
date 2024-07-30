import getFormattedDate from "@/app/blog/utils/getFormattedDate";
import "./article.scss";
import StyleCodeBlocks from "./components/codeBlock";
import {
  getPostByCollectionAndSlug,
  getPostData,
} from "@/app/blog/utils/postUtils";

const Post = ({ params }) => {
  const collection = params.collection;
  const slug = params.slug;
  const postData = getPostData();
  const post = getPostByCollectionAndSlug(collection, slug);
  const formattedDate = getFormattedDate(post.metadata.date);

  return (
    <main className="w-[50vw]">
      <header>
        <small className="block font-bold text-neutral-400">
          {formattedDate}
        </small>
        <div className="text-hero font-semibold mt-sm">
          {post.metadata.title}
        </div>
        <div className="text-highlight mt-s">{post.metadata.subtitle}</div>
      </header>

      {/* <StyleCodeBlocks> */}
        <article
          className={`mt-l markdown-body`}
          dangerouslySetInnerHTML={{ __html: post.contentHTML }}
        ></article>
      {/* </StyleCodeBlocks> */}
    </main>
  );
};

export const generateStaticParams = async () => {
  const postData = getPostData();

  // const paths = postData
  //   .map((collection) => {
  //     return collection.posts.map((post) => {
  //       return { params: { collection: collection.name, slug: post.metadata.slug } };
  //     });
  //   })
  //   .flat();

  // return {
  //   paths,
  //   fallback: false,
  // };

  const params = postData
    .map((collection) => {
      return collection.posts.map((post) => {
        return { collection: collection.name, slug: post.metadata.slug };
      });
    })
    .flat();

  return params;
};
export default Post;
