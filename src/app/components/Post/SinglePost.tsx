"use client";
import moment from "moment";
import Image from "next/image";
import { useEffect, useState } from "react";
import { IoIosPerson } from "react-icons/io";
import { GoCommentDiscussion } from "react-icons/go";
import { PiStar, PiStarFill, PiHeart, PiHeartFill } from "react-icons/pi";
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
    <div className=" flex flex-col gap-6 w-full">
      <p className=" text-[34px] font-bold">{post?.title}</p>
      <div className="flex sm:items-center items-start  justify-between sm:flex-row flex-col">
        <div className="flex items-center gap-3">
          <div className="rounded-full bg-theme-tertiary flex items-center  justify-center h-[2.4rem] w-[2.4rem] text-white  text-[1.2rem] cursor-pointer">
            {post?.author?.username.substring(0, 1)}
          </div>
          <div className=" leading-6">
            <p className=" text-neutral-700 capitalize text-[14px] font-medium">
              {post?.author?.username}
            </p>
            <p className=" text-neutral-600 capitalize text-[14px] -mt-1">
              {moment(post?.updatedAt).format("MMM DD")}
            </p>
          </div>
        </div>
        <div className="flex items-center justify-between py-3 px-3  ">
          <div className="flex gap-7 items-center ">
            <Tooltip title="Like">
              <div
                id="like"
                className="relative text-[1.2rem] flex items-center text-neutral-500 hover:text-amber-500 cursor-pointer gap-1  ease-in-out duration-200"
                onClick={() => handleLikePost(post?._id)}
                onAnimationEnd={() => setWobble(0)}
                // wobble={wobble}
              >
                <TbStarFilled
                  id="star"
                  className=" text-amber-300 absolute z-[-1] opacity-0 "
                  wobble={wobble}
                  size={22}
                />
                {!!post?.likes.find((like) => like === id) ? (
                  <TbStarFilled className=" text-amber-500" size={22} />
                ) : (
                  <TbStar size={22} />
                )}
                {isLoading ? (
                  <>
                    {!!post?.likes.find((like) => like === id)
                      ? post?.likes?.length - 1
                      : post?.likes?.length + 1}
                  </>
                ) : (
                  <span>{post?.likes?.length || 0}</span>
                )}
              </div>
            </Tooltip>
            <div
              className="text-[1.1rem] flex items-center text-neutral-500 gap-1 hover:text-green-500 cursor-pointer"
              onClick={() => setOpenComment((prev) => !prev)}
            >
              <GoCommentDiscussion size={22} />
              <span>{post?.comments?.length || 0}</span>
            </div>

            <Tooltip title="Save">
              <div
                className="text-[1.2rem]  text-neutral-500 hover:text-blue-600 cursor-pointer"
                onClick={() => handleSavePost(post?._id)}
              >
                {!!profile?.savedPost.find((save) => save === post?._id) ? (
                  <PiHeartFill className=" text-rose-600" size={22} />
                ) : (
                  <PiHeart size={22} />
                )}
              </div>
            </Tooltip>
          </div>
        </div>
      </div>
      {post?.photo?.url && (
        <div className="flex w-full md:max-h-[600px] max-h-[500px] items-start justify-center">
          <Image
            src={`${post.photo.url}`}
            height={500}
            width={700}
            alt=""
            className="rounded w-full md:max-h-[600px] max-h-[500px] object-cover"
          />
        </div>
      )}

      {/* {isMounted() ? (
        <Quill
          readOnly={true}
          value={post.content}
          theme="bubble"
          className=" mb-4 border-none text-[1.3rem] ql-editor "
        />
      ) : null} */}

      <div className=" w-full">
        <QuillViewer content={post?.content} />
      </div>

      <CommentSection
        openComment={openComment}
        setCloseComment={() => setOpenComment(false)}
        post={post}
      />
    </div>
  );
};
export default SinglePost;
