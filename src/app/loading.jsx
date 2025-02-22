import React from "react";

const Loading = () => {
  return (
    <div className="w-full h-[100vh] flex items-center justify-center fixed top-0 left-0 right-0 bottom-0 z-50">
      <div className="lds-spinner">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default Loading;
