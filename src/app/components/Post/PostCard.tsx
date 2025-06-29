/* eslint-disable @next/next/no-img-element */
import { GoDotFill } from "react-icons/go";
import moment from "moment";
import React from "react";
import { LiaEdit } from "react-icons/lia";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import useProfileData from "@/hooks/useProfileData";
import QuillViewer from "../Quill/QuillViewer";

type PostCardProps = {
  post: Post;
  publish?: boolean;
  trending?: boolean;
};

const PostCard: React.FC<PostCardProps> = ({ post, publish, trending }) => {
  const navigate = useRouter();
  const { profile } = useProfileData();

  const handleRouteToEdit = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    navigate.push(`/edit/${post?._id}`);
  };
  // const handleRouteToBlog = (e: React.MouseEvent<HTMLDivElement>) => {
  //   e.stopPropagation();
  //   navigate.push(`/blogs/${post?._id}`);
  // };
  return (
    <div className="w-full grid grid-cols-[0.5fr,1fr]   gap-5">
      <Link
        href={`/blogs/${post?._id}`}
        className="md:min-h-[11rem] sm:min-h-[9rem]  h-[6rem]"
      >
        {post?.photo ? (
          <Image
            src={post?.photo.url}
            alt=""
            height={600}
            width={450}
            className=" object-cover rounded h-full"
            loading="lazy"
          />
        ) : // <img
        //   src={`${post?.photo.url}`}
        //   alt=""
        //   className="object-cover rounded h-full w-full"
        // />
        null}
      </Link>
      <div className=" flex flex-col gap-[0.34rem]   w-full ">
        <div className="flex flex-col gap-1">
          {!trending && (
            <div className="flex flex-wrap sm:gap-2 gap-1 items-center">
              <p className="rounded-full  text-sm">{post?.category}</p>
              <GoDotFill className=" text-gray-600 text-[.5rem]" />
              <p className=" text-sm text-neutral-600">
                {moment(post?.createdAt).fromNow()}
              </p>

              {profile?._id === post?.author._id && (
                <div
                  onClick={(e) => handleRouteToEdit(e)}
                  className=" cursor-pointer hover:text-theme-tertiary bg-blue-300 flex justify-center items-center p-1 rounded-full"
                >
                  <LiaEdit className="text-[1.2rem]" />
                </div>
              )}
            </div>
          )}
          <Link
            href={`/blogs/${post?._id}`}
            className=" md:text-[1.6rem] text-[1rem] font-bold tracking-tight  hover:text-blue-600"
          >
            {post?.title}
          </Link>
          <QuillViewer content={post?.content.substring(0, 130)} />
        </div>

        {!trending && (
          <p className=" text-neutral-700 text-sm tracking-wide md:block hidden">
            written by{" "}
            <span className=" capitalize">{post?.author?.username}</span>
          </p>
        )}

        {publish && (
          <>
            {post?.published ? (
              <p className=" py-[3px] px-2 bg-emerald-500 text-sm text-white w-fit  rounded-md">
                Published
              </p>
            ) : (
              <p className=" py-[3px] px-2 bg-amber-500 rounded-md text-sm text-white w-fit">
                Not Published
              </p>
            )}
          </>
        )}
      </div>
    </div>
  );
};
export default PostCard;
