import React from "react";
import Image from "../assets/3d1.png";
import { useFormik } from "formik";
import { loginValidation } from "../validation/validate";
import { LoginUser } from "../function/userHandle";
import { Link } from "react-router-dom";

const initialValues = {
  name: "",
  email: "",
  password: "",
};

export function LoginForm() {
  const { values, errors, touched, handleBlur, handleSubmit, handleChange } =
    useFormik({
      initialValues,
      validationSchema: loginValidation,
      onSubmit: async (values, action) => {
        const { ...data } = values;
        await LoginUser(data);
        action.resetForm();
        window.location.reload();
      },
    });
  return (
    <form onSubmit={handleSubmit}>
      <div className=" flex items-center justify-center min-h-screen bg-white">
        <div className="flex flex-col m-6 space-y-8 bg-white shadow-2xl rounded-2xl md:flex-row md:space-y-0">
          <div className="flex flex-col justify-center p-8 md:p-14">
            <span className="mb-3 text-4xl text-green-600 font-bold">
              LogIn to MyDvls
            </span>
            <span className="font-light text-gray-400 mb-8">
              Please fill the form correctly.
            </span>
            <div className="py-4">
              <span className="mb-2 text-md">
                Email:
                <span className="mb-2 text-md text-red-600">*</span>
              </span>
              <input
                type="text"
                className="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
                name="email"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                id="email"
              />
              {errors.email && touched.email ? (
                <span className="font-light text-red-400 mb-8">
                  {errors.email}
                </span>
              ) : null}
            </div>
            <div className="py-4">
              <span className="mb-2 text-md">
                Password
                <span className="mb-2 text-md text-red-600">*</span>
              </span>
              <input
                autoComplete="false"
                type="password"
                name="password"
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
                id="password"
                className="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
              />
              {errors.password && touched.password ? (
                <span className="font-light text-red-400 mb-8">
                  {errors.password}
                </span>
              ) : null}
            </div>
            <button
              type="submit"
              className="w-full bg-green-600 text-white p-2 rounded-lg mb-6 hover:bg-white hover:text-black hover:border hover:border-gray-300"
            >
              Login
            </button>
            <p className="text-sm text-center font-titleFont font-medium">
              Don't have an Account?{" "}
              <Link to="/register">
                <span className="text-green-800 hover:text-green-600 duration-300">
                  Sign up
                </span>
              </Link>
            </p>
          </div>
          <div>
            <img
              src={Image}
              alt="img"
              className="w-[400px] h-full hidden rounded-r-2xl md:block object-cover"
            />
          </div>
        </div>
      </div>
    </form>
  );
}
