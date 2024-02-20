import React, { useEffect, useState } from "react";
import Modal from "./Modal";
import { FcIdea } from "react-icons/fc";
import { BiX } from "react-icons/bi";
import { useMutation, useQuery } from "react-query";
import { createTips, getTips } from "@/api/tips";
import toast from "react-hot-toast";

type TipsProps = {
  isOpen: boolean;
  setClose: () => void;
};

const Tips: React.FC<TipsProps> = ({ isOpen, setClose }) => {
  const { data, isLoading, refetch } = useQuery({
    queryKey: "tips",
    queryFn: getTips,
  });

  const { mutateAsync, isLoading: generating } = useMutation({
    mutationFn: createTips,
    onSuccess: () => {
      refetch();
      toast.success("Tip Created");
    },
  });
  const [tips, setTips] = useState("");

  useEffect(() => {
    if (data) {
      setTips(data?.tips?.tipText);
    }
  }, [data]);

  const handleSaveTips = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = {
      tipText: tips,
    };
    await mutateAsync({ data });
  };
  return (
    <Modal isOpen={isOpen} setClose={setClose}>
      <div className="flex w-full justify-between items-center">
        <p className="flex gap-1 items-center">
          Tips Generator <FcIdea />
        </p>
        <BiX size={26} onClick={setClose} />
      </div>
      <form onSubmit={handleSaveTips}>
        <div className="w-full outline-none border border-indigo-400 rounded-md mt-3 p-2 flex flex-col items-end">
          {isLoading ? (
            <div className="w-full flex flex-col gap-1">
              <div className="w-[100%] h-[1rem]  bg-gray-200  rounded-full animate-pulse " />
              <div className="w-[100%] h-[1rem]  bg-gray-200  rounded-full animate-pulse " />
              <div className="w-[70%] h-[1rem]  bg-gray-200  rounded-full animate-pulse " />
              <div className="w-[60%] h-[1rem]  bg-gray-200  rounded-full animate-pulse " />
              <div className="w-[50%] h-[1rem]  bg-gray-200  rounded-full animate-pulse " />
            </div>
          ) : (
            <textarea
              value={tips}
              onChange={(e) => setTips(e.target.value)}
              className="outline-none resize-none w-full min-h-[150px]"
            ></textarea>
          )}

          {/* <button
          type="button"
          className=" bg-indigo-600 text-white px-3 py-2 rounded"
        >
          Generate
        </button> */}
        </div>
        <div className="flex justify-end mt-3">
          <button
            type="submit"
            className=" bg-indigo-600 text-white w-[100px] h-[40px] px-3 rounded"
          >
            {generating ? (
              <div className="spinner scale-[.3] mx-auto px" />
            ) : (
              "Save Tips"
            )}
          </button>
        </div>
      </form>
    </Modal>
  );
};
export default Tips;
