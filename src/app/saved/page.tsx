"use client";
import React, { ReactNode } from "react";
import Layout from "../components/Layout/Layout";
import PostList from "../components/Post/PostList";
import BlogLoader from "../components/Loader/BlogLoader";
import { useQuery } from "react-query";
import { getSavedPost } from "@/api/post";
import Empty from "../utils/Empty";

const Saved = () => {
  const { data, isLoading } = useQuery({
    queryFn: getSavedPost,
    queryKey: "Saved-Post",
  });
  let content: ReactNode;
  const savedPost: Post[] = data?.post;
  if (isLoading) {
    content = <BlogLoader />;
  } else {
    content = <PostList posts={savedPost} />;
  }

  if (!isLoading && savedPost?.length === 0) {
    content = <Empty />;
  }
  return (
    <Layout>
      <div className="mt-[6rem]  md:w-[80%] w-[90%]  mx-auto flex justify-center">
        {content}
      </div>
    </Layout>
  );
};

export default Saved;
