"use client";
import { MutableRefObject, useEffect, useRef, useState } from "react";
import Layout from "../components/Layout/Layout";
import PostLayout from "../components/Post/PostLayout";
import { useQuery } from "react-query";
import { getAllPost } from "../../api/post";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { PiArrowUp } from "react-icons/pi";
import HomePost from "../components/Post/HomePost";

type BlogProps = {};

const Blogs: React.FC<BlogProps> = () => {
  return <HomePost />;
};
export default Blogs;
