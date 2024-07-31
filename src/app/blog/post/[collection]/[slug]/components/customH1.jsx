import dynamic from "next/dynamic";

const StickyWrapper = dynamic(() => import("@/components/stickyWrapper"), {
  ssr: false,
});

const CustomH1 = ({ children }) => {
  return (
    <StickyWrapper cursorType="underline">
      <h1>{children}</h1>
    </StickyWrapper>
  );
};

export default CustomH1;
