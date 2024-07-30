import dynamic from "next/dynamic";

const StickyWrapper = dynamic(() => import("@/components/stickyWrapper"), {
  ssr: false,
});

const CustomP = ({ children }) => {
  return (
    <StickyWrapper cursorType="textpointer">
      <p>{children}</p>
    </StickyWrapper>
  );
};

export default CustomP;
