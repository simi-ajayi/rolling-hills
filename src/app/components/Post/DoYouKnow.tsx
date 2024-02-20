import { getTips } from "@/api/tips";
import React from "react";
import { FcIdea } from "react-icons/fc";
import { useQuery } from "react-query";

const DoYouKnow = () => {
  const { data, isLoading, refetch } = useQuery({
    queryKey: "tips",
    queryFn: getTips,
  });
  return (
    <div className="relative z-30 border    backdrop-blur-md   border-zinc-200  w-full min-h-[100px] rounded-md flex flex-col items-center">
      <div className="h-full min-w-full opacity-50 bg-red-400  absolute -z-20 left-2 -bottom-2 rounded-md"></div>
      <div className="h-full min-w-full bg-indigo-400  backdrop-blur-lg  absolute -z-20  rounded-md"></div>

      <div className="p-3 relative z-10  bg-gradient-to-t from-indigo-700 via-indigo-500 to-blue-500 -skew-x-12 rounded-lg w-[70%] -translate-y-5 flex justify-center">
        <div className="  skew-x-12 flex items-center gap-3 w-full justify-center">
          <p className=" text-sm uppercase text-white text-center  ">
            Do you know?
          </p>
        </div>
        <FcIdea size={35} className="skew-x-12  absolute -right-3 -top-4 " />
      </div>

      {/* <div className="h-full min-w-full bg-gradient-to-r from-indigo-700/20 via-indigo-500/30 to-blue-500/20  absolute -z-[10] blur-md opacity-40  "></div> */}
      <div className=" px-1 text-center text-white z-30 tracking-wide w-full h-full caption-top   -translate-y-3 ">
        {!data?.tips?.tipText
          ? " Nigeria won her indepence in the year 1996, we were ruled by the colonial master"
          : data?.tips?.tipText}
      </div>
    </div>
  );
};

export default DoYouKnow;
