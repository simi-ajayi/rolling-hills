import React from "react";
import PostList from "./PostList";
import PostCard from "./PostCard";
import { BiTrendingUp } from "react-icons/bi";
import { useQuery } from "react-query";
import { getTrendingPost } from "@/api/post";
import { Divider } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import DoYouKnow from "./DoYouKnow";

const TrendingPost = () => {
  const { data, isLoading } = useQuery({
    queryFn: getTrendingPost,
    queryKey: "trending",
  });

  const posts: Post[] | undefined = data?.posts;

  if (isLoading) {
    return (
      <div className="w-full rounded-2xl relative bg-white shadow-lg border border-gray-100 overflow-hidden">
        <div className="h-full w-full absolute bg-gradient-to-br from-gray-100 to-gray-200 animate-pulse z-[-1] rounded-2xl -right-2 -bottom-2"></div>
        <div className="h-16 bg-gradient-to-r from-gray-200 to-gray-300 animate-pulse"></div>
        <div className="flex flex-col p-6 gap-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex gap-4">
              <div className="w-32 h-24 bg-gray-200 rounded-lg animate-pulse"></div>
              <div className="flex-1 space-y-2">
                <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4 animate-pulse"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
  return (
    <div className="w-full rounded-2xl bg-white shadow-lg border border-gray-100 overflow-hidden sticky top-24">
      <div className="bg-gradient-to-r from-theme-primary to-theme-tertiary p-4">
        <div className="flex items-center gap-2">
          <BiTrendingUp className="text-white" size={24} />
          <h2 className="text-xl font-bold text-white">Trending News</h2>
        </div>
      </div>
      <Divider />
      <div className="flex flex-col p-4 gap-4">
        {posts?.map((post, key) => (
          <Link 
            key={post?._id} 
            href={`/blogs/${post?._id}`}
            className="group grid grid-cols-[120px,1fr] gap-4 p-3 rounded-xl hover:bg-gray-50 transition-all duration-300 border border-transparent hover:border-gray-200"
          >
            <div className="relative overflow-hidden rounded-lg aspect-[4/3] bg-gradient-to-br from-gray-100 to-gray-200">
              <Image
                src={post?.photo?.url}
                alt={post?.title}
                height={120}
                width={120}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
            </div>
            <div className="flex flex-col justify-center">
              <h3 className="text-sm md:text-base font-semibold text-gray-900 group-hover:text-theme-primary transition-colors line-clamp-3 leading-snug">
                {post?.title?.substring(0, 100)}
                {post?.title?.length > 100 && "..."}
              </h3>
            </div>
          </Link>
        ))}
      </div>
          <DoYouKnow/>

    </div>
  );
};

export default TrendingPost;
