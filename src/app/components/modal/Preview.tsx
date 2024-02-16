import { Modal } from "@mui/material";
import React from "react";
import { BiX } from "react-icons/bi";
import PreviewPost from "../Post/PreviewPost";

type PreviewProps = {
  open: boolean;
  setClose: () => void;
  post: { title: string; content: string; photo: string; category: string };
};

const Preview: React.FC<PreviewProps> = ({ open, setClose, post }) => {
  return (
    <Modal
      open={open}
      onClose={setClose}
      className="flex items-center justify-center"
    >
      <div className="md:w-[1030px] w-full overflow-y-auto max-h-[90vh] bg-white rounded p-5">
        <div className="w-full flex items-start justify-between">
          <p className=" font-semibold text-xl">Preview</p>
          <BiX
            size={26}
            onClick={setClose}
            className=" hover:text-red-600 cursor-pointer"
          />
        </div>

        <div className=" overflow-y-auto h-full mt-4">
          <PreviewPost post={post} />
        </div>
      </div>
    </Modal>
  );
};
export default Preview;
