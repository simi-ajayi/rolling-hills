import React from "react";
import PostList from "./PostList";
import PostCard from "./PostCard";
import { BiTrendingUp } from "react-icons/bi";
import { useQuery } from "react-query";
import { getTrendingPost } from "@/api/post";
import { Divider } from "@mui/material";
import Image from "next/image";
import Link from "next/link";

const TrendingPost = () => {
  const { data, isLoading } = useQuery({
    queryFn: getTrendingPost,
    queryKey: "trending",
  });

  const posts: Post[] | undefined = data?.posts;

  if (isLoading) {
    return (
      <div className="border w-full rounded relative bg-white  ">
        <div className=" h-full w-full absolute bg-zinc-300 animate-pulse z-[-1] rounded   -right-3 -bottom-3"></div>
        <p className=" text-xl font-semibold mb-3 flex  p-4 gap-2 items-center justify-between w-full h-[3rem] bg-zinc-200 animate-pulse"></p>
        <div className=" flex flex-col p-4 gap-3 w-full h-[400px] bg-zinc-300 animate-pulse"></div>
      </div>
    );
  }
  return (
    <div className="border rounded relative bg-white sm:min-w-[450px] w-full">
      {/* <div className=" h-full w-full absolute opacity-50 bg-emerald-400 z-[-1] rounded   -right-3 -bottom-3"></div> */}
      <p className=" text-xl font-semibold mb-3 flex p-4 gap-2 items-center justify-between w-full">
        Trending News
      </p>
      <Divider />
      <div className=" flex flex-col p-4 gap-3">
        {posts?.map((post, key) => (
          <div key={post?._id} className="grid grid-cols-2 gap-3">
            <div>
              <Image
                src={post?.photo?.url}
                alt={post?.title}
                height={600}
                width={450}
                className=" md:min-h-[12rem] object-cover"
              />
            </div>
            <Link href={`/blogs/${post?._id}`}>
              <p className=" md:text-xl sm:text-lg  font-semibold hover:text-blue-600 cursor-pointer hover:underline">
                {post?.title?.substring(0, 200)}
              </p>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrendingPost;
