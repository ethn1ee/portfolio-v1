import LeftSidebar from "./components/leftSidebar";
import RightSidebar from "./components/rightSidebar";
import { PostDataProvider } from "./utils/postDataContext";
import { getPostData } from "./utils/postUtils";

const postData = getPostData();

export default function Layout({ children }) {
  return (
    <>
      <PostDataProvider value={postData}>
        <LeftSidebar />
        <div className="relative left-[20vw] pt-ml">{children}</div>
        <RightSidebar />
      </PostDataProvider>
    </>
  );
}
