"use client";
import Heading from "./utils/Heading";
import Header from "./utils/Header/Header1";
import { Toaster } from "react-hot-toast";
import { useQuery } from "react-query";
import Hero from "./utils/Hero";
import PostLayout from "./components/Post/PostLayout";
import { getAllPost } from "../api/post";
import MostRecentPost from "./components/Post/MostRecentPost";
import Layout from "./components/Layout/Layout";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { PiArrowUp } from "react-icons/pi";
import { MutableRefObject, useEffect, useRef, useState } from "react";
import { Pagination, Stack } from "@mui/material";
import HomePost from "./components/Post/HomePost";

export default function Home() {
  return <HomePost recentPost={true} />;
}
