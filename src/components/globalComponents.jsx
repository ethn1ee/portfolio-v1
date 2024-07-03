"use client";

import Cursor from "./cursor";
import NavBar from "./navBar";

const GlobalComponents = () => {
  return (
    <>
      <div className="w-screen px-ml fixed top-0 left-0 h-auto z-40">
        <NavBar />
      </div>
      <div className="mix-blend-difference fixed z-50">
        <Cursor />
      </div>
    </>
  );
};

export default GlobalComponents;
