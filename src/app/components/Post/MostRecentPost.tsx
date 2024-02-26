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
    <div className="hero-carousel z-10 relative">
      <div className="lg:h-[70%] z-[-10] h-[60%] w-[50%]  absolute lg:bottom-12  -left-1/4 bg-transparent bg-[radial-gradient(#03055e2c_1px,#fff_1px)] bg-[size:20px_20px]"></div>

      <Carousel
        showThumbs={false}
        autoPlay
        infiniteLoop
        interval={15000}
        showArrows={false}
        showIndicators={false}
        showStatus={false}
      >
        {posts?.map((post) => (
          <div className="w-full flex flex-col gap-3 " key={post?._id}>
            <Link
              href={`/blogs/${post?._id}`}
              className="flex w-full  max-h-[500px] items-start relative"
            >
              {post?.photo ? (
                <Image
                  src={`${post?.photo.url}`}
                  height={500}
                  width={700}
                  alt=""
                  className="rounded w-full max-h-[500px] object-cover"
                />
              ) : null}
            </Link>
            <Link
              href={`/blogs/${post?._id}`}
              className=" md:px-0 px-4 text-left hover:text-blue-600 lg:text-[3.5rem] md:text-[3rem] text-[2.3rem] font-bold lg:leading-[4rem] leading-[3rem] "
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
