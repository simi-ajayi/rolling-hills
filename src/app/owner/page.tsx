"use client";
import React from "react";
import Layout from "../components/Layout/Layout";
import PostLayout from "../components/Post/PostLayout";
import { useQuery } from "react-query";
import { getOwnerPost } from "../../api/post";
import { AiOutlineSearch } from "react-icons/ai";
import PostCard from "../components/Post/PostCard";

type OwnerProps = {};

const Owner: React.FC<OwnerProps> = () => {
  const { isLoading, data } = useQuery({
    queryFn: getOwnerPost,
    queryKey: ["Posts"],
  });

  const posts: Post[] = data?.posts;
  return (
    <Layout>
      <div className="mt-[6rem]  md:w-[80%] w-[90%]  mx-auto">
        <div className="grid  gap-y-4 lg:grid-cols-2 md:grid-cols-1 grid-cols-1">
          {posts?.map((post) => (
            <PostCard post={post} key={post?._id} publish />
          ))}
        </div>
      </div>
    </Layout>
  );
};
export default Owner;
