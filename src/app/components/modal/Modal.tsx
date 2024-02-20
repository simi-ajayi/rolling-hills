"use client";
import React, { ReactNode } from "react";
import { Modal as MuiModal } from "@mui/material";
import { useRouter } from "next/navigation";
import Login from "../Auth/Login";

type ModalProps = {
  children: ReactNode;
  isOpen: boolean;
  setClose: () => void;
};

const Modal: React.FC<ModalProps> = ({ children, isOpen, setClose }) => {
  return (
    <MuiModal open={isOpen} onClose={setClose}>
      <div className="  sm:w-[500px] w-full bg-white relative top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] outline-none rounded">
        <div className="p-4">{children}</div>
      </div>
    </MuiModal>
  );
};

export default Modal;
