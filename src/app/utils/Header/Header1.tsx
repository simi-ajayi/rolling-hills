"use client";
import Auth from "@/app/components/modal/Auth";
import { useAuthModal } from "@/app/states/authModal";
import { useProfile } from "@/app/states/profile";
import React, { useState } from "react";
import { PiBrain } from "react-icons/pi";
import { IoIosPerson } from "react-icons/io";
import Link from "next/link";
import { Menu, MenuItem } from "@mui/material";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { BiHeart, BiMenu, BiSearch } from "react-icons/bi";
import Wishbutton from "./Wishbutton";
import { useQuery } from "react-query";
import { getUser } from "@/api/user";
import useProfileData from "@/hooks/useProfileData";
import { AiOutlineSearch } from "react-icons/ai";
import Image from "next/image";
import Logo from "../Logo";
import { categories } from "@/app/components/Post/PostLayout";
import { FcIdea } from "react-icons/fc";
import Tips from "@/app/components/modal/Tips";

type Header1Props = {};

const Header1: React.FC<Header1Props> = () => {
  const { isOpen, setClose, setOpen } = useAuthModal();
  const { isAuthenticated, logoutUser } = useProfile();
  const { isLoading, profile } = useProfileData();
  const [openTip, setOpenTip] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [search, setSearch] = useState("");
  const [type, setType] = useState("signup");
  const router = useRouter();
  const pathName = usePathname();
  const searchParams = useSearchParams();
  const searchValue = searchParams?.get("search");

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    logoutUser();
    handleClose();
  };

  const handleBlogSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const params = new URLSearchParams(searchParams);
    if (search) {
      params.set("search", search);
    } else {
      params.delete("search");
    }
    router.replace(`/blogs/?${params}`);
  };

  return (
    <>
      <Tips isOpen={openTip} setClose={() => setOpenTip(false)} />
      <Auth open={isOpen} setClose={setClose} setType={setType} type={type} />
      <div className="w-full min-h-[80px] border flex items-center justify-center fixed top-0 left-0 right-0 z-40 bg-white overflow-x-hidden">
        <div className="lg:w-[80%]  w-[90%] flex items-center justify-between">
          <div className="flex items-center gap-2">
            {/* <BiMenu size={22} /> */}
            <Link href={"/"}>
              <Logo />
            </Link>
          </div>

          <div>
            <ul className="flex items-center justify-evenly gap-5">
              <li className="flex items-center justify-center">
                <button onClick={() => setIsSearching((prev) => !prev)}>
                  <BiSearch size={24} />
                </button>
              </li>
              <li className=" hover:underline cursor-pointer  hidden md:block">
                <Wishbutton />
              </li>
              {!isAuthenticated ? (
                <>
                  <li
                    className=" text-white px-3 py-2 text-center bg-theme-tertiary hover:bg-theme-primary rounded-md cursor-pointer "
                    onClick={() => {
                      setOpen();
                      setType("login");
                    }}
                  >
                    Sign In
                  </li>
                </>
              ) : (
                <>
                  {/* <li className=" hover:underline cursor-pointer hidden md:block">
                    <Link href={"/owner"}>My Blogs</Link>
                  </li> */}
                  <li>
                    {isLoading ? (
                      <div className="rounded-full bg-zinc-400 animate-pulse flex items-center justify-center h-[2.4rem] w-[2.4rem] text-white  text-[1.2rem] cursor-pointer" />
                    ) : (
                      <button
                        id="basic-button"
                        aria-controls={open ? "basic-menu" : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? "true" : undefined}
                        onClick={handleClick}
                        className="rounded-full bg-theme-tertiary flex items-center justify-center h-[2.4rem] w-[2.4rem] text-white  text-[1.2rem] cursor-pointer"
                      >
                        {profile?.username.substring(0, 1)}
                      </button>
                    )}
                  </li>
                </>
              )}
              {isSearching && (
                <li>
                  <form
                    onSubmit={handleBlogSearch}
                    className=" flex items-center gap-1 sm:w-fit w-full  relative"
                  >
                    <input
                      type="text"
                      placeholder="Search RollingHills"
                      defaultValue={searchValue ?? ""}
                      onChange={(e) => setSearch(e.target.value)}
                      className=" border placeholder:text-zinc-400 border-zinc-400 p-2   rounded outline-none w-full "
                    />
                  </form>
                </li>
              )}

              <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                  "aria-labelledby": "basic-button",
                }}
                sx={{
                  "& .MuiPaper-root": {
                    mt: ".7rem",
                    padding: "3px",
                    width: "150px",
                  },
                }}
              >
                {profile?.role === "admin" ? (
                  <>
                    <MenuItem
                      onClick={() => {
                        handleClose();
                        router.push("/create");
                      }}
                      sx={{
                        ":hover": {
                          bgcolor: "#03045e",
                          color: "#fff",
                          borderRadius: "3px",
                        },
                      }}
                    >
                      New Post
                    </MenuItem>
                    <MenuItem
                      onClick={() => {
                        handleClose();
                        router.push("/owner");
                      }}
                      sx={{
                        ":hover": {
                          bgcolor: "#03045e",
                          color: "#fff",
                          borderRadius: "3px",
                        },
                      }}
                    >
                      My Post
                    </MenuItem>
                    <MenuItem
                      onClick={() => {
                        handleClose();
                        setOpenTip(true);
                      }}
                      sx={{
                        ":hover": {
                          bgcolor: "#03045e",
                          color: "#fff",
                          borderRadius: "3px",
                        },
                      }}
                    >
                      New Tips <FcIdea className="ml-1" />
                    </MenuItem>
                  </>
                ) : null}
                <MenuItem
                  onClick={handleLogout}
                  sx={{
                    ":hover": {
                      bgcolor: "#03045e",
                      color: "#fff",
                      borderRadius: "3px",
                    },
                  }}
                >
                  Logout
                </MenuItem>
              </Menu>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};
export default Header1;
