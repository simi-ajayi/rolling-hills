import { getTopPost } from "@/api/post";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useQuery } from "react-query";
import TopPostLoader from "../Loader/TopPostLoader";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

type MostRecentPostProps = {};

const MostRecentPost: React.FC<MostRecentPostProps> = () => {
  const { isLoading, data } = useQuery({
    queryFn: getTopPost,
    queryKey: "Top",
  });

  const posts: Post[] = data?.post;
  if (isLoading) {
    return <TopPostLoader />;
  }
  return (
    <div className=" w-full border-b border-gray-300 pb-5 ">
      <Carousel
        showThumbs={false}
        autoPlay
        infiniteLoop
        interval={15000}
        showArrows={false}
        showIndicators={false}
        showStatus={false}
        className="carousel"
      >
        {posts?.map((post) => (
          <div className="w-full flex flex-col gap-3 h-fit " key={post?._id}>
            <Link
              href={`/blogs/${post?._id}`}
              className="flex w-full  max-h-[500px] items-start relative"
            >
              {post?.photo ? (
                <Image
                  src={`${post?.photo.url}`}
                  height={500}
                  width={600}
                  alt=""
                  className="rounded w-full max-h-[500px] object-cover"
                />
              ) : null}
            </Link>
            <Link
              href={`/blogs/${post?._id}`}
              className=" md:px-0 px-4 text-center  hover:text-blue-600 lg:text-[3rem] md:text-[2.5rem] text-[2rem] font-bold lg:leading-[4rem] leading-[3rem] "
            >
              {post?.title}
            </Link>
          </div>
        ))}
      </Carousel>
    </div>
  );
};
export default MostRecentPost;
