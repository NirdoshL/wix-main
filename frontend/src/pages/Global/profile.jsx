import React from "react";
import Image from "../../assets/3d1.png";
import { GetStore } from "../../config/store";
import { BsFillFilePersonFill, BsPersonBoundingBox } from "react-icons/bs";
import { MdMarkEmailRead, MdVerifiedUser } from "react-icons/md";

export function Profile() {
  const user = GetStore("user");
  return (
    <div className="font-sans antialiased text-gray-900 leading-normal tracking-wider bg-cover">
      <div className="text-3xl font-semibold ml-2 pb-6">Profile</div>
      <div className="max-w-4xl flex items-center h-auto lg:h-screen flex-wrap mx-auto my-32 lg:my-0">
        <div
          id="profile"
          className="w-full lg:w-3/5 rounded-lg lg:rounded-l-lg lg:rounded-r-none shadow-2xl bg-white opacity-75 mx-6 lg:mx-0"
        >
          <div className="p-4 md:p-12 text-center lg:text-left">
            <h1 className="text-3xl font-bold pt-8 lg:pt-0">
              {user ? user.user.name : null}
              <sub className="h-2 w-2">
                {user ? (
                  user.user.isAuthenticated ? (
                    <MdVerifiedUser className="fill-current text-green-500 mr-4" />
                  ) : null
                ) : null}
              </sub>
            </h1>
            <div className="mx-auto lg:mx-0 w-4/5 pt-3 border-b-2 border-green-500 opacity-25"></div>
            <p className="pt-4 text-base font-bold flex items-center justify-center lg:justify-start">
              <BsPersonBoundingBox className="fill-current text-green-700 mr-4" />
              Your Role: {user ? user.user.role : null}
            </p>
            <p className="pt-2 text-gray-600 text-xs lg:text-sm flex items-center justify-center lg:justify-start">
              <BsFillFilePersonFill className="fill-current text-green-700 mr-4" />{" "}
              Your Name: {user.user.name}
            </p>
            <p className="pt-2 text-gray-600 text-xs lg:text-sm flex items-center justify-center lg:justify-start">
              <MdMarkEmailRead className="fill-current text-green-700 mr-4" />{" "}
              Your Email: {user.user.email}
            </p>
          </div>
        </div>

        <div className="w-full lg:w-1/5">
          <img
            alt="Profile"
            src={Image}
            className="rounded-none lg:rounded-lg hidden lg:block"
          />
        </div>
      </div>
    </div>
  );
}
