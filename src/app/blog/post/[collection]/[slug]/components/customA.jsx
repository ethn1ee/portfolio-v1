import dynamic from "next/dynamic";
import Link from "next/link";

const StickyWrapper = dynamic(() => import("@/components/stickyWrapper"), {
  ssr: false,
});

const CustomA = ({ children, href }) => {
  const text = children[0];

  return (
    <StickyWrapper cursorType="underline">
      <Link
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="cursor-pointer inline-block w-fit h-[20px]"
      >{text}</Link>
    </StickyWrapper>
  );
};

export default CustomA;
