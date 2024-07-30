import dynamic from "next/dynamic";

const StickyWrapper = dynamic(() => import("@/components/stickyWrapper"), {
  ssr: false,
});

const CustomImg = ({ src, alt }) => {
  return <img src={src} alt={alt} className="relative z-10 rounded-md border border-neutral-1000" />;
};

export default CustomImg;
