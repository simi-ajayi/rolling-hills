import { getTips } from "@/api/tips";
import React from "react";
import { FcIdea } from "react-icons/fc";
import { useQuery } from "react-query";

const DoYouKnow = () => {
  const { data, isLoading, refetch } = useQuery({
    queryKey: "tips",
    queryFn: getTips,
  });

  if (isLoading) {
    return (
      <div className="relative z-30   w-full min-h-[100px] rounded-md flex flex-col items-center">
        <div className="h-full min-w-full bg-zinc-200 animate-pulse  backdrop-blur-lg  absolute -z-20  rounded-md"></div>

        <div className="p-3 relative z-10  bg-zinc-200 -skew-x-12   rounded-lg w-[70%] -translate-y-5 flex justify-center">
          <div className="  skew-x-12 flex items-center gap-3 w-full justify-center">
            <div className="h-5 bg-transparent text-sm uppercase text-white text-center  "></div>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="relative z-30     backdrop-blur-md   border-zinc-200  w-full min-h-[100px] rounded-md flex flex-col items-center">
      <div className="h-full min-w-full opacity-50 bg-emerald-400  absolute -z-20 left-2 -bottom-2 rounded-md"></div>
      <div className="h-full min-w-full bg-indigo-400  backdrop-blur-lg  absolute -z-20  rounded-md"></div>

      <div className="relative  rounded-lg w-[70%] -translate-y-5  h-[60px]">
        <div className=" h-full w-[80%] bg-indigo-400 rounded-t absolute -skew-x-12 left-0 z-[-1]" />
        <div className=" h-full w-[80%] bg-indigo-400 rounded-t absolute skew-x-12 right-0 z-[-1]" />
        <p className=" text-sm uppercase text-white text-center translate-y-3 left-[50%] flex items-center gap-2 justify-center ">
          Do you know?
          <FcIdea size={25} className="" />
        </p>
      </div>
      {/* <div className="p-3 relative z-10  bg-gradient-to-t from-indigo-700 via-indigo-500 to-blue-500 -skew-x-12 rounded-lg w-[70%] -translate-y-5 flex justify-center">
        <div className="  skew-x-12 flex items-center gap-3 w-full justify-center">
          <p className=" text-sm uppercase text-white text-center  ">
            Do you know?
          </p>
        </div>
        <FcIdea size={35} className="skew-x-12  absolute -right-3 -top-4 " />
      </div> */}

      {/* <div className="h-full min-w-full bg-gradient-to-r from-indigo-700/20 via-indigo-500/30 to-blue-500/20  absolute -z-[10] blur-md opacity-40  "></div> */}
      <div className=" px-1 text-center text-white z-30 tracking-wide w-full h-full caption-top   -translate-y-3 ">
        {!data?.tips?.tipText
          ? " Nigeria gain her indepence in 1st October 1960, we were ruled by the colonial master"
          : data?.tips?.tipText}
      </div>
    </div>
  );
};

export default DoYouKnow;
