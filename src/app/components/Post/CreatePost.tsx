/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useEffect, useRef, useState } from "react";
import "react-quill/dist/quill.snow.css";
import Quill from "react-quill";
import { categories } from "./PostLayout";
import { FcPicture } from "react-icons/fc";
import Button from "@/app/utils/Button";
import { toast } from "react-hot-toast";
import { useMutation, useQueryClient } from "react-query";
import { createPost } from "@/api/post";
import { useProfile } from "@/app/states/profile";
import { useAuthModal } from "@/app/states/authModal";
import { useRouter } from "next/navigation";
import { useIsMounted } from "@/hooks/useMounted";
import QuillEditor from "../Quill/QuillEditor";
import { AiOutlinePicture } from "react-icons/ai";
import { BiListCheck, BiTrendingUp } from "react-icons/bi";
import Preview from "../modal/Preview";
import useProfileData from "@/hooks/useProfileData";
import NotAuthorized from "@/app/utils/NotAuthorized";

type CreatePostProps = {};

const CreatePost: React.FC<CreatePostProps> = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [photo, setPhoto] = useState("");
  const [category, setCategory] = useState("");
  const router = useRouter();
  const inputRef: React.MutableRefObject<null> = useRef(null);
  const { isAuthenticated } = useProfile();
  const { setOpen } = useAuthModal();
  const [previewOpen, setPreviewOpen] = useState(false);
  const queryClient = useQueryClient();

  const { profile } = useProfileData();
  const { mutate, isLoading } = useMutation({
    mutationFn: createPost,
    onSuccess: (data) => {
      if (data.success) {
        toast.success("Blog Create Successfully");
        queryClient.refetchQueries("Posts");
        router.push(`/edit/${data.post._id}`);
      } else {
        toast("Error, Something went wrong");
      }
    },
  });

  // useEffect(() => {
  //   if (inputRef.current) {
  //     inputRef?.current?.focus();
  //   }
  // }, []);

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

  const data: any = {
    title,
    content,
    photo,
    category,
  };

  const handleSubmitPost = ({ publish = false }: { publish: boolean }) => {
    if (!isAuthenticated) {
      setOpen();
      return;
    }
    if (!title || !content || !category || !photo) {
      toast.error("Enter all fields, and select a Blog photo");
      return;
    }
    if (publish) {
      data.published = true;
    }
    mutate(data);
  };

  const handleShowPreview = () => {
    if (!title || !content || !category || !photo) {
      toast.error("Enter all fields, and select a Blog photo");
      return;
    }
    setPreviewOpen(true);
  };

  return (
    <div className="mt-[5rem]">
      {isAuthenticated ? (
        <>
          <Preview
            open={previewOpen}
            setClose={() => setPreviewOpen(false)}
            post={data}
          />
          <div className="w-full">
            <div className=" bg-amber-600 p-1 ">
              <p className="text-center text-white text-sm   flex items-center gap-1 justify-center">
                Draft Post{" "}
                <span>
                  <BiTrendingUp />
                </span>
              </p>
            </div>
            <div className=" bg-zinc-100 w-full p-3 px-4 flex sm:flex-row flex-col items-center md:justify-between justify-center gap-2 mb-[2rem]">
              <div>
                <Button
                  isLoading={isLoading}
                  label="Save"
                  type="button"
                  className="w-[130px] text-theme-tertiary rounded h-[54px] flex items-center justify-center border border-theme-tertiary"
                  action={() => handleSubmitPost({ publish: false })}
                />
              </div>
              <div className="flex gap-2">
                <button
                  onClick={handleShowPreview}
                  className="w-[130px] gap-1 text-theme-tertiary rounded h-[54px] flex items-center justify-center border border-theme-tertiary"
                >
                  Preview <BiListCheck size={22} />
                </button>
                <Button
                  isLoading={isLoading}
                  label="Publish"
                  type="button"
                  className="w-[130px] text-white rounded h-[54px] flex items-center justify-center bg-theme-tertiary"
                  action={() => handleSubmitPost({ publish: true })}
                />
              </div>
            </div>
          </div>
          <div className=" lg:w-[80%] w-[90%] mx-auto flex lg:flex-row gap-6 flex-col-reverse mb-6">
            <div className=" lg:w-[65%] w-full flex flex-col gap-4 ">
              <div className="flex flex-col gap-3">
                <textarea
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Enter Title"
                  className=" placeholder:text-gray-300 text-2xl font-bold border border-zinc-300 resize-none outline-none p-3 "
                  ref={inputRef}
                ></textarea>

                <select
                  className="py-2 px-3 outline-none border border-zinc-300 bg-gray-100 text-sm w-fit rounded"
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
                className=" w-full h-[300px] bg-theme-light/40 rounded flex flex-col gap-2 items-center justify-center cursor-pointer hover:bg-theme-light"
              >
                {photo ? (
                  <img
                    src={photo}
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
export default CreatePost;
