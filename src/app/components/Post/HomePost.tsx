"use client";
import { MutableRefObject, useEffect, useRef, useState } from "react";
import { useQuery } from "react-query";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { PiArrowUp } from "react-icons/pi";
import Layout from "../Layout/Layout";
import PostLayout from "./PostLayout";
import { getAllPost } from "@/api/post";

type HomePostProps = {
  recentPost?: boolean;
};

const HomePost: React.FC<HomePostProps> = ({ recentPost = false }) => {
  const router = useRouter();
  //Keeps track of the params search and category
  const pathName = usePathname();
  const searchParams = useSearchParams();
  const pageValue = searchParams?.get("page");
  const scrollRef: MutableRefObject<null> = useRef(null);
  // {search, category}

  const [page, setPage] = useState(pageValue || 1);

  const { isLoading, data, refetch } = useQuery({
    queryFn: async () => {
      return await getAllPost({ ...Object.fromEntries(searchParams) });
    },
    queryKey: "Posts",
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    refetch();
  }, [searchParams, refetch]);

  const handlePagination = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value);
    const params = new URLSearchParams(searchParams ? searchParams.toString() : "");
    params.set("page", value.toString());
    router.replace(`${pathName}?${params}`);
  };

  const posts: Post[] = data?.posts;
  const pageNumber: number = data?.numOfPage;
  return (
    <Layout>
      <div id="#" className="" ref={scrollRef} />
      <div className="w-full ">
        <div className="mt-[6rem] layout-size mx-auto">
          <PostLayout
            isLoading={isLoading}
            posts={posts}
            recentPost={recentPost}
          />

          <div className="flex lg:w-[65%] w-full justify-center my-[3rem]">
            <Stack spacing={2}>
              <Pagination
                count={pageNumber}
                shape="rounded"
                onChange={handlePagination}
                page={Number(pageValue) ?? 1}
              />
            </Stack>
          </div>
        </div>
      </div>

      <a
        href="#"
        className=" z-50 rounded-full h-9 w-9 border border-zinc-300 flex items-center justify-center text-zinc-400 hover:border-zinc-600 hover:text-zinc-800 fixed bottom-4 left-4 cursor-pointer"
      >
        <PiArrowUp />
      </a>
    </Layout>
  );
};
export default HomePost;
