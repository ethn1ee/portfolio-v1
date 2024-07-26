import Image from "next/image";

const PostCard = ({ post }) => {
  return (
    <div className="w-fit h-fit">
      {/* THUMBNAIL */}
      <div className="w-[300px] h-[169px] bg-neutral-900 rounded-[10px]">
        <Image src={post.metadata.thumbnail} alt="" />
      </div>
      <small className="block font-bold mt-sm text-neutral-400">
        {post.metadata.date}
      </small>
      <div className="text-highlight font-semibold mt-sm">
        {post.metadata.title}
      </div>
      <small className="block mt-s">{post.metadata.subtitle}</small>
    </div>
  );
};

export default PostCard;
