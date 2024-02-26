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
    <div className="  border  rounded relative  w-full z-10 bg-white">
      <div className=" text-xl p-4 font-semibold   flex justify-between">
        Latest News
        <BiNews className=" text-zinc-500" />
      </div>
      <Divider />
      <div className="flex gap-4 p-4">
        {posts?.map((post) => (
          <Link
            key={post?._id}
            href={`/blogs/${post?._id}`}
            className=" col-span-2 md:h-[10rem] sm:h-[8rem] w-full h-[7rem] relative"
          >
            {post?.photo ? (
              <Image
                src={post?.photo.url}
                alt=""
                fill
                className=" object-cover rounded h-full w-full absolute"
                loading="lazy"
              />
            ) : // <img
            //   src={`${post?.photo.url}`}
            //   alt=""
            //   className="object-cover rounded h-full w-full"
            // />
            null}
          </Link>
        ))}
      </div>
    </div>
  );
};
export default LatestPost;
