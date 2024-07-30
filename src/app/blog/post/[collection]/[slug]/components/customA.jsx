import dynamic from "next/dynamic";

const StickyWrapper = dynamic(() => import("@/components/stickyWrapper"), {
  ssr: false,
});

const CustomA = ({ children }) => {
  const text = children[0];

  return (
    <StickyWrapper cursorType="underline">
      <a className="cursor-pointer inline-block w-fit h-[20px]">{text}</a>
    </StickyWrapper>
  );
};

export default CustomA;
