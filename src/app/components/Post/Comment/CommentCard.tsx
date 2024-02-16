import moment from "moment";
import React from "react";
import { IoIosPerson } from "react-icons/io";

type CommentCardProps = {
  comment: Comment;
};

const CommentCard: React.FC<CommentCardProps> = ({ comment }) => {
  return (
    <div>
      <div className="flex items-center gap-3">
        <div className="rounded-full bg-theme-tertiary flex items-center justify-center h-[2.4rem] w-[2.4rem] text-white  text-[1.2rem] cursor-pointer">
          {comment?.user?.username?.substring(0, 1)}
        </div>
        <div className=" leading-6">
          <p className="  capitalize text-[14px] font-medium">
            {comment?.user?.username}
          </p>
          <p className=" text-neutral-600 capitalize text-[14px] -mt-1">
            {moment(comment?.createdAt).toNow()}
          </p>
        </div>
      </div>
      <p className="mt-1 text-[14px]">{comment?.comment}</p>
    </div>
  );
};
export default CommentCard;
