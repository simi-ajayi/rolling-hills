import { getTopPost } from "@/api/post";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useQuery } from "react-query";
import TopPostLoader from "../Loader/TopPostLoader";

type MostRecentPostProps = {};

const MostRecentPost: React.FC<MostRecentPostProps> = () => {
  const { isLoading, data } = useQuery({
    queryFn: getTopPost,
    queryKey: "Top",
  });

  const post = data?.post;
  if (isLoading) {
    return <TopPostLoader />;
  }
  return (
    <Link
      href={`/blogs/${post?._id}`}
      className="w-full flex flex-col gap-3 mb-10"
    >
      <div className="flex w-full max-h-[500px] items-start justify-center">
        {post?.photo ? (
          <Image
            src={`${post?.photo.url}`}
            height={500}
            width={700}
            alt=""
            className="rounded w-full max-h-[500px] object-cover"
          />
        ) : null}
      </div>
      <p className=" md:px-0 px-4 hover:text-blue-600 lg:text-[3.5rem] md:text-[3rem] text-[2.3rem] font-bold lg:leading-[4rem] leading-[3rem] ">
        {post?.title}
      </p>
    </Link>
  );
};
export default MostRecentPost;
