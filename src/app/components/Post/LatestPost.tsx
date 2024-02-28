import { Divider } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { BiNews } from "react-icons/bi";

type LatestPostProps = {
  posts: Post[] | undefined;
};

const LatestPost: React.FC<LatestPostProps> = ({ posts }) => {
  return (
    <div className="   rounded relative h-  w-full z-10 bg-white">
      {/* <div className=" text-xl p-4 font-semibold   flex justify-between">
        Latest News
        <BiNews className=" text-zinc-500" />
      </div> */}
      <div className=" grid grid-cols-1 sm:grid-cols-3 gap-4 p-4">
        {posts?.slice(0, 4).map((post) => (
          <div key={post?._id} className=" flex-col gap-2 flex w-full">
            <Link
              href={`/blogs/${post?._id}`}
              className=" flex  w-full relative md:min-h-[12rem] min-h-[10rem]  "
            >
              {post?.photo ? (
                <Image
                  src={post?.photo.url}
                  alt=""
                  fill
                  className=" object-cover h-full  w-full absolute"
                  loading="lazy"
                />
              ) : // <img
              //   src={`${post?.photo.url}`}
              //   alt=""
              //   className="object-cover rounded h-full w-full"
              // />
              null}
            </Link>

            <p className=" font-semibold text-sm">{post?.category}</p>
            <p className="text-xl font-semibold">{post?.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
export default LatestPost;
