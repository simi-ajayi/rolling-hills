"use client";
import { login } from "@/api/auth";
import { useFormik } from "formik";
import * as yup from "yup";
import React from "react";
import { useMutation } from "react-query";
import toast from "react-hot-toast";
import Button from "@/app/utils/Button";
import { useProfile } from "@/app/states/profile";
import Logo from "@/app/utils/Logo";

type LoginProps = {
  setType: (type: string) => void;
  setClose: () => void;
};

const schema = yup.object().shape({
  email: yup
    .string()
    .email("Invalid email!")
    .required("Please enter your email!"),
  password: yup.string().required("Please enter your password!").min(6),
});

const Login: React.FC<LoginProps> = ({ setType, setClose }) => {
  const { setProfile } = useProfile();
  const { mutate, isLoading } = useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      console.log("Login response:", data); // Debug log
      if (data.success) {
        const token = data?.token || data?.data?.token;
        const id = data?.id || data?.data?.id || data?.user?.id;
        
        if (token && id) {
          toast.success("Login Successful");
          setProfile(token, id);
          setClose();
          // Small delay to ensure state is saved before reload
          setTimeout(() => {
            if (typeof window !== "undefined") {
              window.location.reload();
            }
          }, 100);
        } else {
          console.error("Missing token or id in response:", { token, id, data });
          toast.error("Login failed: Missing authentication data");
        }
      } else {
        const msg = data.message || "Something went wrong";
        toast.error(msg);
      }
    },
    onError: (error: any) => {
      console.error("Login error:", error);
      toast.error(error?.response?.data?.message || "Login failed");
    },
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: schema,
    onSubmit: ({ email, password }) => {
      mutate({ email, password });
    },
  });
  const { errors, touched, handleSubmit, handleChange, values } = formik;

  return (
    <div className=" flex flex-col pb-5">
      <div className="flex w-full items-center justify-center mb-3 scale-90">
        <Logo direction="col" />
      </div>
      <h2 className=" text-center text-2xl font-bold ">Welcome Back</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3 mt-3">
        <div className="flex flex-col gap-1">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            placeholder="me@gmail.com"
            name="email"
            className={`${
              errors.email && touched.email && "border-b-red-500"
            }  border-b-2 border-b-theme-primary p-2 outline-none bg-theme-secondary/10`}
            value={values.email}
            onChange={handleChange}
          />
          {errors.email && touched.email && (
            <span className=" text-red-500 pt-2 block">{errors.email}</span>
          )}
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            placeholder="***********"
            name="password"
            value={values.password}
            onChange={handleChange}
            className={`${
              errors.password && touched.password && "border-b-red-500"
            }  border-b-2 border-b-theme-primary p-2 outline-none bg-theme-secondary/10`}
          />
          {errors.password && touched.password && (
            <span className=" text-red-500 pt-2 block">{errors.password}</span>
          )}
        </div>

        <p className=" mt-2 text-center">
          I don&apos;t have an account?{" "}
          <span
            className=" font-semibold text-theme-primary hover:underline cursor-pointer"
            onClick={() => setType("signup")}
          >
            Sign up
          </span>
        </p>

        <Button
          isLoading={isLoading}
          label="Login"
          type="submit"
          className="w-full mt-4 text-white rounded h-[54px] flex items-center justify-center bg-theme-tertiary"
        />
      </form>
    </div>
  );
};
export default Login;
