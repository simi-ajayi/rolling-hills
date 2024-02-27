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
    <div className="  border  rounded relative h-  w-full z-10 bg-white">
      <div className=" text-xl p-4 font-semibold   flex justify-between">
        Latest News
        <BiNews className=" text-zinc-500" />
      </div>
      <Divider />
      <div className="flex gap-4 p-4">
        {posts?.slice(0, 3).map((post) => (
          <div key={post?._id} className=" flex-col gap-1 w-full">
            <Link
              href={`/blogs/${post?._id}`}
              className=" flex  w-full  relative  md:min-h-[10rem] sm:min-h-[8rem] min-h-[7rem] "
            >
              {post?.photo ? (
                <Image
                  src={post?.photo.url}
                  alt=""
                  fill
                  className=" object-cover rounded h-full  w-full absolute"
                  loading="lazy"
                />
              ) : // <img
              //   src={`${post?.photo.url}`}
              //   alt=""
              //   className="object-cover rounded h-full w-full"
              // />
              null}
            </Link>
            <p className=" truncate text-xl font-semibold">{post?.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
export default LatestPost;
