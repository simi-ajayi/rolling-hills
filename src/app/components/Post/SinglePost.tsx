"use client";
import moment from "moment";
import Image from "next/image";
import { useEffect, useState } from "react";
import { IoIosPerson } from "react-icons/io";
import { GoCommentDiscussion } from "react-icons/go";
import {
  PiStar,
  PiStarFill,
  PiHeart,
  PiHeartFill,
  PiBookmark,
  PiBookmarkFill,
} from "react-icons/pi";
import { TbStarFilled, TbStar } from "react-icons/tb";
import "react-quill/dist/quill.bubble.css";
import { useProfile } from "@/app/states/profile";
import { useMutation, useQueryClient } from "react-query";
import { likePost } from "@/api/post";
import { useAuthModal } from "@/app/states/authModal";
import CommentSection from "./Comment/CommentSection";
import { useIsMounted } from "@/hooks/useMounted";
import QuillViewer from "../Quill/QuillViewer";
import { savePost } from "../../../api/post";
import useProfileData from "@/hooks/useProfileData";
import { Tooltip } from "@mui/material";
import TrendingPost from "./TrendingPost";
import { HiOutlineClock } from "react-icons/hi";

type SinglePostProps = {
  post: Post;
};

const SinglePost: React.FC<SinglePostProps> = ({ post }) => {
  const { id, isAuthenticated } = useProfile();
  const { setOpen } = useAuthModal();
  const [openComment, setOpenComment] = useState(false);
  const [wobble, setWobble] = useState(0);
  const { profile } = useProfileData();
  const queryClient = useQueryClient();

  // like post api
  const { mutate, isLoading } = useMutation({
    mutationFn: likePost,

    onSuccess: (data: any) => {
      if (data.success) {
        queryClient.refetchQueries("Single-Post");
      }
    },
  });
  const { mutate: saveMutation, isLoading: saving } = useMutation({
    mutationFn: savePost,

    onSuccess: (data: any) => {
      if (data.success) {
        queryClient.refetchQueries("Profile");
      }
    },
  });
  const handleLikePost = (id: string) => {
    const postId = id;
    if (!!post?.likes.find((like) => like === id)) {
      setWobble(0);
    } else {
      setWobble(1);
    }
    if (isAuthenticated) {
      mutate({ postId });
    } else {
      setOpen();
    }
  };
  const handleSavePost = (id: string) => {
    const postId = id;
    if (isAuthenticated) {
      saveMutation({ postId });
    } else {
      setOpen();
    }
  };

  // useEffect(() => {
  //   const likeButton = document.getElementById("like");

  //   likeButton?.addEventListener("click", (e) => {
  //     // likeButton.add
  //     likeButton.classList.add("-rotate-12 -translate-y-2");

  //     setTimeout(() => {
  //       likeButton.classList.remove("-rotate-12 -translate-y-2");
  //     }, 3000);
  //   });
  // }, []);
  return (
    <div className="grid grid-cols-1 xl:grid-cols-[1fr,0.5fr] gap-8 max-w-7xl mx-auto">
      {/* Main Content */}
      <article className="flex flex-col gap-8 w-full">
        {/* Header Section */}
        <div className="space-y-6">
          {/* Title */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight bg-gradient-to-r from-theme-primary via-theme-tertiary to-theme-primary bg-clip-text text-transparent">
            {post?.title}
          </h1>

          {/* Author & Meta Info */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-6 border-b border-gray-200">
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="rounded-full bg-gradient-to-br from-theme-primary to-theme-tertiary flex items-center justify-center h-12 w-12 text-white text-lg font-bold shadow-lg ring-2 ring-white">
                  {post?.author?.username.substring(0, 1).toUpperCase()}
                </div>
                <div className="absolute -bottom-1 -right-1 h-4 w-4 bg-green-500 rounded-full border-2 border-white"></div>
              </div>
              <div className="flex flex-col">
                <p className="text-theme-tertiary capitalize text-base font-semibold">
                  {post?.author?.username}
                </p>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <HiOutlineClock className="text-gray-400" size={14} />
                  <time className="capitalize">
                    {moment(post?.updatedAt).format("MMMM DD, YYYY")}
                  </time>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-4">
              <Tooltip title="Like" arrow>
                <button
                  id="like"
                  className="group relative flex items-center gap-2 px-4 py-2 rounded-full bg-gray-50 hover:bg-rose-50 border border-gray-200 hover:border-rose-200 transition-all duration-300 ease-out"
                  onClick={() => handleLikePost(post?._id)}
                  onAnimationEnd={() => setWobble(0)}
                >
                  <PiHeartFill
                    id="star"
                    className="text-rose-400 absolute z-[-1] opacity-0"
                    wobble={wobble}
                    size={20}
                  />
                  {!!post?.likes.find((like) => like === id) ? (
                    <PiHeartFill className="text-rose-500 transition-transform group-hover:scale-110" size={20} />
                  ) : (
                    <PiHeart className="text-gray-500 group-hover:text-rose-500 transition-all" size={20} />
                  )}
                  <span className="text-sm font-medium text-gray-700 group-hover:text-rose-600">
                    {isLoading ? (
                      <>
                        {!!post?.likes.find((like) => like === id)
                          ? post?.likes?.length - 1
                          : post?.likes?.length + 1}
                      </>
                    ) : (
                      post?.likes?.length || 0
                    )}
                  </span>
                </button>
              </Tooltip>

              <Tooltip title="Comments" arrow>
                <button
                  className="group flex items-center gap-2 px-4 py-2 rounded-full bg-gray-50 hover:bg-blue-50 border border-gray-200 hover:border-blue-200 transition-all duration-300"
                  onClick={() => setOpenComment((prev) => !prev)}
                >
                  <GoCommentDiscussion className="text-gray-500 group-hover:text-blue-600 transition-all" size={20} />
                  <span className="text-sm font-medium text-gray-700 group-hover:text-blue-600">
                    {post?.comments?.length || 0}
                  </span>
                </button>
              </Tooltip>

              <Tooltip title="Save" arrow>
                <button
                  className="group p-2 rounded-full bg-gray-50 hover:bg-blue-50 border border-gray-200 hover:border-blue-200 transition-all duration-300"
                  onClick={() => handleSavePost(post?._id)}
                >
                  {!!profile?.savedPost.find((save) => save === post?._id) ? (
                    <PiBookmarkFill className="text-blue-600 transition-transform group-hover:scale-110" size={22} />
                  ) : (
                    <PiBookmark className="text-gray-500 group-hover:text-blue-600 transition-all" size={22} />
                  )}
                </button>
              </Tooltip>
            </div>
          </div>
        </div>

        {/* Featured Image */}
        {post?.photo?.url && (
          <div className="relative w-full overflow-hidden rounded-2xl shadow-2xl bg-gradient-to-br from-gray-100 to-gray-200">
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent z-10"></div>
            <Image
              src={`${post.photo.url}`}
              height={600}
              width={1200}
              alt={post?.title || "Blog post image"}
              className="w-full h-auto object-cover transition-transform duration-700 hover:scale-105"
              priority
            />
          </div>
        )}

        {/* Content */}
        <div className="prose prose-lg max-w-none w-full">
          <div className="bg-white rounded-xl p-6 md:p-8 shadow-sm border border-gray-100">
            <QuillViewer content={post?.content} />
          </div>
        </div>

        {/* Comment Section */}
        <CommentSection
          openComment={openComment}
          setCloseComment={() => setOpenComment(false)}
          post={post}
        />
      </article>

      {/* Sidebar */}
      <aside className="flex w-full xl:sticky xl:top-24 xl:self-start">
        <TrendingPost />
      </aside>
    </div>
  );
};
export default SinglePost;
