import React from "react";
import PostList from "./PostList";
import BlogLoader from "../Loader/BlogLoader";
import MostRecentPost from "./MostRecentPost";
import Empty from "@/app/utils/Empty";

import DoYouKnow from "./DoYouKnow";
import TrendingPost from "./TrendingPost";
import LatestPost from "./LatestPost";

type PostLayoutProps = {
  posts: Post[] | undefined;
  isLoading: boolean;
  recentPost?: boolean;
};

export const categories = [
  "Politics",
  "Technology",
  "Sports",
  "Entertainment",
  "Health",
  "Business",
  "Science",
  "Education",
  "Lifestyle",
  "World News",
  "Opinion",
  "Weather",
];

const PostLayout: React.FC<PostLayoutProps> = ({
  posts,
  isLoading,
  recentPost,
}) => {
  let content: any;
  if (isLoading) {
    content = <BlogLoader />;
  } else {
    content = <PostList posts={posts} />;
  }

  if (posts?.length === 0 && !isLoading) {
    content = (
      <div className=" flex justify-center w-full">
        <Empty />
      </div>
    );
  }
  return (
    <div className="w-full max-w-[1600px] mx-auto ">
      {recentPost && <MostRecentPost />}
      <div className="w-full  max-md:gap-[2rem] gap-[2rem] pt-10 min-h-[60vh] grid grid-cols-1 xl:grid-cols-[1fr,0.5fr] mb-[2rem] ">
        <div className="w-full  border-r-gray-100 xl:border-r lg:pr-[3rem] flex flex-col gap-[5rem] relative">
          {!isLoading && <LatestPost posts={posts} />}
          <div className=" xl:hidden flex w-full">
            <DoYouKnow />
          </div>
          <div className=" xl:hidden flex w-full">
            <TrendingPost />
          </div>

          <div className="w-full z-10 ">{content}</div>
        </div>
        <div className="xl:flex  flex-col gap-[4rem]  w-full hidden  ">
          <TrendingPost />
          <DoYouKnow />
        </div>
      </div>
    </div>
  );
};
export default PostLayout;
