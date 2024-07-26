import LeftSidebar from "./components/leftSidebar";
import RightSidebar from "./components/rightSidebar";
import { getPostData } from "./utils/postUtils";

const postData = getPostData();

export default function Layout({ children }) {
  return (
    <>
      <LeftSidebar postData={postData} />
      <div
        style={{ width: false ? "64vw" : "50vw" }}
        className="mx-[25vw] pt-ml"
      >
        {children}
      </div>
      <RightSidebar postData={postData} />
    </>
  );
}
