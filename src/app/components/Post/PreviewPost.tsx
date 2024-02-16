import moment from "moment";
import Image from "next/image";
import React from "react";
import { GoCommentDiscussion } from "react-icons/go";
import { PiHandsClappingLight, PiStar } from "react-icons/pi";
import QuillViewer from "../Quill/QuillViewer";
import useProfileData from "@/hooks/useProfileData";

type PreviewPostProps = {
  post: { title: string; content: string; photo: string; category: string };
};

const PreviewPost: React.FC<PreviewPostProps> = ({ post }) => {
  const { profile } = useProfileData();
  return (
    <div className=" flex flex-col gap-6 w-full">
      {" "}
      <p className=" text-[34px] font-bold">{post?.title}</p>
      <div className="flex sm:items-center items-start justify-between sm:flex-row flex-col">
        <div className="flex items-center gap-3">
          <div className="rounded-full bg-theme-tertiary flex items-center  justify-center h-[2.4rem] w-[2.4rem] text-white  text-[1.2rem] cursor-pointer">
            {profile?.username.substring(0, 1)}
          </div>
          <div className=" leading-6">
            <p className=" text-neutral-700 capitalize text-[14px] font-medium">
              {profile?.username}
            </p>
            <p className=" text-neutral-600 capitalize text-[14px] -mt-1">
              {moment(Date.now()).format("MMM DD")}
            </p>
          </div>
        </div>
        <div className="flex items-center justify-between py-3 px-3  ">
          <div className="flex gap-7 items-center ">
            <div className="text-[1.2rem] flex items-center text-neutral-500 hover:text-pink-500 cursor-pointer gap-1">
              <PiStar />
            </div>
            <div className="text-[1.1rem] flex items-center text-neutral-500 gap-1 hover:text-green-500 cursor-pointer">
              <GoCommentDiscussion />
            </div>
          </div>
        </div>
      </div>
      <div className="flex w-full max-h-[600px] items-start justify-center">
        <Image
          src={`${post.photo}`}
          height={500}
          width={700}
          alt=""
          className="rounded w-full max-h-[600px] object-cover"
        />
      </div>
      {/* {isMounted() ? (
      <Quill
        readOnly={true}
        value={post.content}
        theme="bubble"
        className=" mb-4 border-none text-[1.3rem] ql-editor "
      />
    ) : null} */}
      <div className=" w-full">
        <QuillViewer content={post.content} />
      </div>
    </div>
  );
};
export default PreviewPost;
