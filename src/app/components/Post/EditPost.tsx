/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useEffect, useState } from "react";
import "react-quill/dist/quill.snow.css";
import Quill from "react-quill";
import { categories } from "./PostLayout";
import Button from "@/app/utils/Button";
import { toast } from "react-hot-toast";
import { useMutation } from "react-query";
import { deletePost, editPost } from "@/api/post";
import { useRouter } from "next/navigation";
import { useProfile } from "@/app/states/profile";
import { useAuthModal } from "@/app/states/authModal";
import QuillEditor from "../Quill/QuillEditor";
import { AiOutlinePicture } from "react-icons/ai";
import Preview from "../modal/Preview";
import { BiListCheck, BiTrendingUp } from "react-icons/bi";
import { useQueryClient } from "react-query";
import { PiDotBold } from "react-icons/pi";
import useProfileData from "@/hooks/useProfileData";
import NotAuthorized from "@/app/utils/NotAuthorized";

type EditPostProps = {
  post: Post;
};

const EditPost: React.FC<EditPostProps> = ({ post }) => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [photo, setPhoto] = useState("");
  const [category, setCategory] = useState("");
  const { isAuthenticated } = useProfile();
  const [previewOpen, setPreviewOpen] = useState(false);
  const { setOpen } = useAuthModal();
  const { profile } = useProfileData();
  const [save, setSave] = useState(false);
  const [isPublish, setisPublish] = useState(false);

  useEffect(() => {
    if (post) {
      setTitle(post.title);
      setContent(post.content);
      setPhoto(post.photo?.url || "");
      setCategory(post.category);
    }
  }, [post]);
  const { mutate, isLoading } = useMutation({
    mutationFn: editPost,
    onSuccess: (data: any) => {
      if (data.success) {
        toast.success("Blog Edited Successfully");
        queryClient.refetchQueries("Post");
        queryClient.refetchQueries("Posts");
      } else {
        toast("Error, Something went wrong");
      }
    },
  });

  const { mutate: deletMutation, isLoading: isDeleting } = useMutation({
    mutationFn: deletePost,
    onSuccess: (data: any) => {
      if (data.success) {
        toast.success("Blog Deleted Successfully");
        queryClient.refetchQueries("Posts");
        router.back();
      } else {
        toast("Error, Something went wrong");
      }
    },
    onSettled: () => {
      setisPublish(false);
      setSave(false);
    },
  });

  const handleSelectImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e?.target?.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        if (reader.readyState === 2) {
          setPhoto(e.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmitPost = () => {
    if (!isAuthenticated) {
      setOpen();
      return;
    }
    if (!title || !content || !categories || !photo) {
      toast.error("Enter all fields, and select a Blog photo");
      return;
    }
    const data = {
      title,
      content,
      photo,
      category,
    };

    setSave(true);
    mutate({ id: post._id, data });
  };

  const handlePublishBlog = () => {
    if (!title || !content || !categories || !photo) {
      toast.error("Enter all fields, and select a Blog photo");
      return;
    }
    const data: any = {
      title,
      content,
      photo,
      category,
    };
    data.published = post?.published === true ? false : true;
    setisPublish(true);
    mutate({ id: post._id, data });
  };

  const handleDeletePost = () => {
    if (!isAuthenticated) {
      setOpen();
      return;
    }
    deletMutation({ id: post._id });
  };

  const hasValueChange = () => {
    const serverPost = {
      title: post?.title,
      content: post?.content,
      photo: post?.photo?.url,
      category: post?.category,
    };
    const clientPost = {
      title: title,
      content: content,
      photo: photo,
      category: category,
    };

    const serverString = JSON.stringify(serverPost);
    const clientString = JSON.stringify(clientPost);

    return serverString === clientString;
  };

  const data = {
    title: title,
    content: content,
    photo: photo,
    category: category,
  };
  const handleShowPreview = () => {
    if (!title || !content || !categories || !photo) {
      toast.error("Enter all fields, and select a Blog photo");
      return;
    }
    setPreviewOpen(true);
  };

  return (
    <div className="mt-[5rem]">
      {profile?.role === "admin" ? (
        <>
          <Preview
            open={previewOpen}
            setClose={() => setPreviewOpen(false)}
            post={data}
          />
          <div className="w-full">
            <div
              className={` ${
                post?.published ? "bg-emerald-600" : "bg-amber-600"
              } p-1 `}
            >
              <p className="text-center text-white text-sm   flex items-center gap-1 justify-center font-semibold">
                {!post?.published ? " Draft Post" : " Live Post"}
                <span>
                  {!post?.published ? (
                    <BiTrendingUp />
                  ) : (
                    <PiDotBold size={23} className="text-white" />
                  )}
                </span>
              </p>
            </div>
            <div className=" bg-zinc-100 w-full p-3 px-4 flex justify-between gap-2 mb-[2rem]">
              <div>
                <div className="flex gap-2">
                  <Button
                    isLoading={isLoading && save}
                    label="Save"
                    type="button"
                    className="w-[130px] text-theme-tertiary rounded h-[54px] flex items-center justify-center border border-theme-tertiary"
                    action={handleSubmitPost}
                  />
                  <Button
                    isLoading={isDeleting}
                    label="Delete"
                    type="button"
                    action={handleDeletePost}
                    className="w-[130px] text-white rounded h-[54px] flex items-center justify-center bg-rose-600"
                  />
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={handleShowPreview}
                  className="w-[130px] gap-1 text-theme-tertiary rounded h-[54px] flex items-center justify-center border border-theme-tertiary"
                >
                  Preview <BiListCheck size={22} />
                </button>
                <Button
                  isLoading={isLoading && isPublish}
                  label={post?.published ? "Un-Publish" : "Publish"}
                  type="button"
                  className="w-[130px] text-white rounded h-[54px] flex items-center justify-center bg-theme-tertiary"
                  action={handlePublishBlog}
                />
              </div>
            </div>
          </div>
          <div className="  lg:w-[80%] w-[90%] mx-auto flex lg:flex-row gap-6 flex-col-reverse mb-6">
            <div className=" lg:w-[65%] w-full flex flex-col gap-4 ">
              <div className="flex flex-col gap-3">
                <textarea
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Enter Title"
                  className=" placeholder:text-gray-300 text-3xl font-bold border border-zinc-300 resize-none outline-none p-3 h-full "
                ></textarea>

                <select
                  className="py-2 px-3 outline-none bg-gray-100 text-sm w-fit rounded-full"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <option value="" className="bg-white py-1">
                    Select Blog Category
                  </option>
                  {categories.map((category) => (
                    <option
                      value={category}
                      key={category}
                      className="bg-white py-1"
                    >
                      {category}
                    </option>
                  ))}
                </select>
              </div>

              {/* {isMounted() ? (
          <Quill
            modules={modules}
            onChange={setContent}
            value={content}
            theme="snow"
            formats={formats}
            className="md:min-h-[40vh] h-[400px] flex-1 mb-4 border-none"
            placeholder="What is on your mind"
          />
        ) : null} */}
              <QuillEditor setContent={setContent} content={content} />
            </div>

            <div className="lg:w-[35%] w-full">
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleSelectImage}
                id="photo"
              />
              <p className="mb-2 font-semibold">
                Thumbnails <span className=" text-rose-500">*</span>
              </p>
              <label
                htmlFor="photo"
                className=" w-full md:h-[300px] h-[240px] bg-theme-light/40 rounded flex flex-col gap-2 items-center justify-center cursor-pointer hover:bg-theme-light"
              >
                {photo ? (
                  <img
                    src={`${photo}`}
                    alt="preview"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <>
                    <AiOutlinePicture className=" text-[2rem]" />
                    <p className=" font-semibold">Click to upload</p>
                  </>
                )}
              </label>
            </div>
          </div>
        </>
      ) : (
        <NotAuthorized />
      )}
    </div>
  );
};
export default EditPost;
