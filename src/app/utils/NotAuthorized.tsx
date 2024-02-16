import React from "react";
import { PiXBold } from "react-icons/pi";
import Empty from "./Empty";

const NotAuthorized = () => {
  return (
    <div className="w-full flex justify-center flex-col items-center h-[70vh]">
      <div className="flex gap-3 items-center">
        <p className=" text-xl">Not Authorized</p>
        <div className="w-8 h-8 bg-rose-300/70 rounded-full flex items-center justify-center text-rose-400">
          <PiXBold />
        </div>
      </div>
      <Empty />
    </div>
  );
};

export default NotAuthorized;
