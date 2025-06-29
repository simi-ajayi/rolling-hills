import Image from "next/image";
import React from "react";

const Logo = ({ direction = "row" }: { direction?: "row" | "col" }) => {
  return (
    <div
      className={`  flex ${
        direction === "col" ? "flex-col" : "sm:flex-row flex-col"
      }  gap-1 items-center font-bold`}
    >
      <Image alt="rollinghills logo" src={"/logo.svg"} height={30} width={30} />
      {/* <p className={direction === "col" ? "-mt-7 " : "max-sm:-mt-7"}>
        Creative Ideation Hub
      </p> */}
    </div>
  );
};

export default Logo;
