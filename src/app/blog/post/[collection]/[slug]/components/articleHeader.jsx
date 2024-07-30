import getFormattedDate from "@/app/blog/utils/getFormattedDate";

const ArticleHeader = ({ post }) => {
  const formattedDate = getFormattedDate(post.metadata.date);

  return (
    <header>
      <small className="block font-bold text-neutral-400">
        {formattedDate}
      </small>
      <div className="text-hero font-semibold mt-sm">{post.metadata.title}</div>
      <div className="text-highlight mt-s">{post.metadata.subtitle}</div>
    </header>
  );
};

export default ArticleHeader;
