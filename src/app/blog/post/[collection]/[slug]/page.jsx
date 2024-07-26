import { getPostByCollectionAndSlug } from "@/app/blog/utils/postUtils";

const Post = ({ params }) => {
  const collection = params.collection;
  const slug = params.slug;
  const post = getPostByCollectionAndSlug(collection, slug);

  const formattedDate = new Date(post.metadata.date).toLocaleDateString(
    "en-US",
    {
      year: "numeric",
      month: "short",
      day: "numeric",
    }
  );

  return (
    <main>
      <header>
        <small className="block font-bold text-neutral-400">{formattedDate}</small>
        <div className="text-hero font-semibold mt-sm">{post.metadata.title}</div>
        <div className="text-highlight mt-s">{post.metadata.subtitle}</div>
      </header>

      <article className="mt-l">
        {post.content}
      </article>
    </main>
  );
};

export default Post;
