"use client";
import { getPost } from "@/api/post";
import Layout from "@/app/components/Layout/Layout";
import SingleBlogLoader from "@/app/components/Loader/SingleBlogLoader";
import SinglePost from "@/app/components/Post/SinglePost";
import React, { useEffect } from "react";
import { useQuery } from "react-query";

type BlogItemProps = {};

const BlogItem: React.FC<BlogItemProps> = ({ params }: any) => {
  const id = params.id;
  const { data, isLoading, isFetching, refetch } = useQuery({
    queryKey: ["Single-Post", id],
    queryFn: async () => {
      return await getPost(id);
    },
    enabled: !!id,
    refetchOnWindowFocus: false,
  });

  const post: Post = data?.post;

  let content: any;
  if (isLoading || isFetching) {
    content = (
      <div className="mt-24 lg:w-[60%] md:w-[75%] w-[90%] mx-auto">
        <SingleBlogLoader />
      </div>
    );
  } else {
    content = (
      <div className="mt-24 max-w-[1600px] mx-auto px-4 md:px-6 lg:px-8 py-8">
        <SinglePost post={post} />
      </div>
    );
  }
  return <Layout>{content}</Layout>;
};
export default BlogItem;
