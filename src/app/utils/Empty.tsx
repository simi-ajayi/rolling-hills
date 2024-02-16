/* eslint-disable @next/next/no-img-element */
import Image from "next/image";
import React from "react";

type EmptyProps = {};

const Empty: React.FC<EmptyProps> = () => {
  return (
    <div className="">
      <Image
        src={"/Empty.jpg"}
        alt=""
        width={500}
        height={500}
        className=" object-cover opacity-70 "
      />
    </div>
  );
};
export default Empty;
