import React from "react";
import PostList from "./PostList";
import BlogLoader from "../Loader/BlogLoader";
import MostRecentPost from "./MostRecentPost";
import Empty from "@/app/utils/Empty";

import DoYouKnow from "./DoYouKnow";

type PostLayoutProps = {
  posts: Post[] | undefined;
  isLoading: boolean;
  recentPost?: boolean;
};

export const categories = [
  "Programming",
  "Data Science",
  "Technology",
  "Self Improvement",
  "Productivity",
  "Writing",
  "Relationship",
  "Machine Learning",
  "Politics",
  "Science",
  "Nature",
  "Comedy",
  "UI/UX",
  "Music",
  "Photography",
  "Career Advice",
  "Paranting",
  "AI",
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
    <div className="w-full max-md:gap-[4rem] gap-[2rem]  min-h-[60vh] flex flex-col-reverse lg:flex-row mb-[2rem] ">
      <div className=" flex-[1.2] border-r-gray-100 lg:border-r lg:pr-[3rem] flex flex-col gap-10">
        {recentPost && <MostRecentPost />}

        <div className="w-full z-10">{content}</div>
      </div>
      <div className="flex backdrop-blur-md flex-col gap-4 flex-[.4] w-full mt-5 ">
        <DoYouKnow />
      </div>
    </div>
  );
};
export default PostLayout;
