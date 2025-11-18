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
import { useMutation, useQueryClient } from "react-query";
import { deletePost } from "@/api/post";
import { toast } from "react-hot-toast";
import { PiTrash } from "react-icons/pi";
import { useProfile } from "@/app/states/profile";

type PostCardProps = {
  post: Post;
  publish?: boolean;
  trending?: boolean;
};

const PostCard: React.FC<PostCardProps> = ({ post, publish, trending }) => {
  const navigate = useRouter();
  const { profile } = useProfileData();
  const { id: userId } = useProfile();
  const queryClient = useQueryClient();

  const { mutate: deleteMutation, isLoading: isDeleting } = useMutation({
    mutationFn: deletePost,
    onSuccess: (data: any) => {
      if (data.success) {
        toast.success("Post deleted successfully");
        queryClient.refetchQueries("Posts");
      } else {
        toast.error(data.message || "Failed to delete post");
      }
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || "Failed to delete post");
    },
  });

  const handleRouteToEdit = (e: React.MouseEvent<HTMLButtonElement | HTMLDivElement>) => {
    e.stopPropagation();
    navigate.push(`/edit/${post?._id}`);
  };

  const handleDelete = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    if (window.confirm("Are you sure you want to delete this post?")) {
      deleteMutation({ id: post?._id });
    }
  };

  // Check ownership - compare user ID from profile or from auth store
  const { id: userId } = useProfile();
  const isOwner = 
    profile?._id === post?.author?._id || 
    profile?.id === post?.author?._id ||
    userId === post?.author?._id ||
    String(userId) === String(post?.author?._id);
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

              {isOwner && (
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleRouteToEdit}
                    className="cursor-pointer hover:text-theme-tertiary hover:bg-blue-400 bg-blue-300 flex justify-center items-center p-1.5 rounded-full transition-colors"
                    title="Edit post"
                  >
                    <LiaEdit className="text-[1.2rem]" />
                  </button>
                  <button
                    onClick={handleDelete}
                    disabled={isDeleting}
                    className="cursor-pointer hover:text-red-600 hover:bg-red-200 bg-red-100 flex justify-center items-center p-1.5 rounded-full transition-colors disabled:opacity-50"
                    title="Delete post"
                  >
                    <PiTrash className="text-[1.2rem]" />
                  </button>
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
