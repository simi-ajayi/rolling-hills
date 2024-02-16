import { useAuthModal } from "@/app/states/authModal";
import { useProfile } from "@/app/states/profile";
import { Menu, MenuItem } from "@mui/material";
import { usePathname, useRouter } from "next/navigation";
import React from "react";
import { BiHeart, BiSolidHeart } from "react-icons/bi";

type WishbuttonProps = {};

const Wishbutton: React.FC<WishbuttonProps> = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const pathname = usePathname();
  console.log({ pathname });
  const router = useRouter();
  const { setOpen } = useAuthModal();
  const { isAuthenticated } = useProfile();
  const open = Boolean(anchorEl);
  const handleClick = (event: any) => {
    if (isAuthenticated) {
      router.push("/saved");
    } else {
      setAnchorEl(event.currentTarget);
    }
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <button
        id="like-button"
        aria-controls={open ? "like-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        {pathname === "/saved" ? (
          <BiSolidHeart className=" text-rose-600" size={26} />
        ) : (
          <BiHeart size={26} />
        )}
      </button>
      <Menu
        id="like-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "like-button",
        }}
        sx={{
          "& .MuiPaper-root": {
            mt: ".7rem",
            padding: "3px",
          },
        }}
      >
        <MenuItem>
          <div className=" flex flex-col items-center gap-3">
            <BiSolidHeart className=" text-rose-600 " size={22} />
            <p className="text-center">
              Collect the products you love from <br /> Shopping articles, and
              we&apos;ll save <br /> them here for you.
            </p>
            <button
              onClick={() => {
                setOpen();
                handleClose();
              }}
              className=" bg-theme-primary text-white p-3 rounded w-full"
            >
              Sign in to get started
            </button>
          </div>
        </MenuItem>
      </Menu>
    </>
  );
};
export default Wishbutton;
