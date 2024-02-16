import { signup } from "@/api/auth";
import React from "react";
import { toast } from "react-hot-toast";
import { useMutation } from "react-query";
import { useFormik } from "formik";
import * as yup from "yup";
import Button from "@/app/utils/Button";
import Logo from "@/app/utils/Logo";

type SignupProps = {
  setType: (type: string) => void;
};

const schema = yup.object().shape({
  email: yup
    .string()
    .email("Invalid email!")
    .required("Please enter your email!"),
  password: yup.string().required("Please enter your password!").min(6),
  username: yup.string().required("Please enter your username!"),
});

const Signup: React.FC<SignupProps> = ({ setType }) => {
  const { mutate, isLoading } = useMutation({
    mutationFn: signup,
    onSuccess: (data: any) => {
      console.log(data);
      if (data.success) {
        toast.success("Sign Up Successful");
        setType("login");
      } else {
        const msg = data.message || "Something went wrong";
        toast.error(msg);
      }
    },
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      username: "",
    },
    validationSchema: schema,
    onSubmit: ({ email, password, username }) => {
      mutate({ email, password, username });
    },
  });
  const { errors, touched, handleSubmit, handleChange, values } = formik;
  return (
    <div className=" flex flex-col pb-5">
      <div className="flex w-full items-center justify-center mb-3 scale-90">
        <Logo direction="col" />
      </div>
      <h2 className="text-center text-2xl font-bold  capitalize">
        Let&apos;s create an account
      </h2>
      <form className="flex flex-col gap-3 mt-3" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-1">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            placeholder="me@gmail.com"
            className={`${
              errors.email && touched.email && "border-b-red-500"
            }  border-b-2 border-b-theme-primary p-2 outline-none bg-theme-secondary/10`}
            name="email"
            value={values.email}
            onChange={handleChange}
          />
          {errors.email && touched.email && (
            <span className=" text-red-500 pt-2 block">{errors.email}</span>
          )}
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="username">Username</label>
          <input
            type="username"
            placeholder="John Doe"
            name="username"
            className={`${
              errors.username && touched.username && "border-b-red-500"
            }  border-b-2 border-b-theme-primary p-2 outline-none bg-theme-secondary/10`}
            value={values.username}
            onChange={handleChange}
          />
          {errors.username && touched.username && (
            <span className=" text-red-500 pt-2 block">{errors.username}</span>
          )}
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            placeholder="password@#%!"
            className={`${
              errors.password && touched.password && "border-b-red-500"
            }  border-b-2 border-b-theme-primary p-2 outline-none bg-theme-secondary/10`}
            name="password"
            value={values.password}
            onChange={handleChange}
          />
          {errors.password && touched.password && (
            <span className=" text-red-500 pt-2 block">{errors.password}</span>
          )}
        </div>

        <p className="mt-2 text-center">
          I already have an account?.{" "}
          <span
            className=" font-semibold text-theme-primary hover:underline cursor-pointer"
            onClick={() => setType("login")}
          >
            Login
          </span>
        </p>
        <Button
          isLoading={isLoading}
          label="Register"
          type="submit"
          className="w-full mt-4 text-white rounded h-[54px] flex items-center justify-center bg-theme-tertiary"
        />
      </form>
    </div>
  );
};
export default Signup;
