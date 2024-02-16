import React from "react";

const TopPostLoader = () => {
  return (
    <div className="w-full flex flex-col gap-3 mb-10">
      <div className="w-full md:h-[300px] h-[200px] bg-gray-200 animate-pulse rounded-lg" />
      <div className="w-[70%] h-[1rem]  bg-gray-200  rounded-full animate-pulse " />
      <div className="w-[50%] h-[1rem]  bg-gray-200  rounded-full animate-pulse " />
    </div>
  );
};

export default TopPostLoader;
