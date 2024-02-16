import React, { useState } from "react";
import PostList from "./PostList";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import BlogLoader from "../Loader/BlogLoader";
import MostRecentPost from "./MostRecentPost";
import Empty from "@/app/utils/Empty";
import Link from "next/link";

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
  const [more, setMore] = useState(false);
  const searchParams = useSearchParams();
  const pathName = usePathname();
  const router = useRouter();

  const categoryValue = searchParams?.get("category");

  const categoryNavigation = (category: string) => {
    const params = new URLSearchParams(searchParams);
    params.set("category", category);
    router.replace(`${pathName}?${params}`);
  };

  const clearCategory = () => {
    const params = new URLSearchParams(searchParams);
    params.delete("category");
    router.replace(`${pathName}?${params}`);
  };

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

        {content}
      </div>
      <div className="flex flex-col gap-4 flex-[.6] lg:pl-[3rem]">
        <p className=" font-semibold">Discover more of what matters to you</p>
        <div className=" flex gap-3 flex-wrap">
          {categories.slice(0, more ? categories.length : 8).map((category) => (
            <Link
              href={`/blogs?category=${category.replace(" ", "+")}`}
              key={category}
              className={`p-1 px-3 rounded-full bg-gray-100 ${
                categoryValue === category
                  ? "bg-theme-primary text-white hover:bg-theme-tertiary "
                  : "hover:bg-gray-200"
              }  text-sm cursor-pointer`}
            >
              {category}
            </Link>
          ))}

          <p
            className="text-theme-tertiary cursor-pointer text-sm ml-2"
            onClick={clearCategory}
          >
            clear
          </p>
        </div>
        <p
          className="pl-2 text-theme-tertiary text-sm cursor-pointer "
          onClick={() => setMore(!more)}
        >
          See more topic
        </p>
      </div>
    </div>
  );
};
export default PostLayout;
