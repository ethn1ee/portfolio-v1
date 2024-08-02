import dynamic from "next/dynamic";

const StickyWrapper = dynamic(() => import("@/components/stickyWrapper"), {
  ssr: false,
});

const CustomP = ({ children }) => {
  return (
    <StickyWrapper cursorType="textpointer">
      <p className="relative z-0">{children}</p>
    </StickyWrapper>
  );
};

export default CustomP;
