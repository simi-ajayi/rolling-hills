import Image from "next/image";
import React from "react";

const Logo = ({ direction = "row" }: { direction?: "row" | "col" }) => {
  return (
    <div
      className={`  flex ${
        direction === "col" ? "flex-col" : "sm:flex-row flex-col"
      }  gap-1 items-center sm:text-[1.6rem] text-[1.4rem] font-bold`}
    >
      <Image
        alt="rollinghills logo"
        src={"/rollinghills.png"}
        height={50}
        width={60}
      />
      <p className={direction === "col" ? "-mt-7 " : "max-sm:-mt-7"}>
        Rolling<span className=" text-emerald-600">Hills</span>
      </p>
    </div>
  );
};

export default Logo;
