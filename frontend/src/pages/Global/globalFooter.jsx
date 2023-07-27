import React from "react";
import { FaInstagram, FaTwitter, FaLinkedin, FaTiktok } from "react-icons/fa";
import { ToastContainer } from "react-toastify";
import Mydevls from "../../assets/mydvls.png";

export function GlobalFooter() {
  return (
    <>
      <div className="bg-gray-50 h-1/2 w-full flex md:flex-row flex-col justify-around items-start p-20 text-green-500">
        <div className="p-5 ">
          <ul>
            <p className="text-gray-800 font-bold text-3xl pb-6">
              Delta<span className="text-green-800">V</span>Logics
            </p>
            <div className="flex gap-6 pb-5">
              <FaInstagram className="text-2xl cursor-pointer hover:text-yellow-600" />
              <FaTwitter className="text-2xl cursor-pointer hover:text-blue-600" />
              <FaLinkedin className="text-2xl cursor-pointer hover:text-blue-600" />
              <FaTiktok className="text-2xl cursor-pointer hover:text-red-600" />
            </div>
          </ul>
        </div>
        <div className="p-5">
          <ul>
            <p className="text-green-800 font-bold text-2xl pb-4">Product</p>
            <li className="text-green-500 text-md pb-2 font-semibold hover:text-blue-600 cursor-pointer">
              Restaurant
            </li>
            <li className="text-green-500 text-md pb-2 font-semibold hover:text-blue-600 cursor-pointer">
              Menu
            </li>
          </ul>
        </div>
        <div className="p-5">
          <ul>
            <p className="text-green-800 font-bold text-2xl pb-4">Company</p>
            <li className="text-green-500 text-md pb-2 font-semibold hover:text-blue-600 cursor-pointer">
              About
            </li>
            <li className="text-green-500 text-md pb-2 font-semibold hover:text-blue-600 cursor-pointer">
              Contact
            </li>
          </ul>
        </div>
        <div className="p-5">
          <ul>
            <p className="text-green-800 font-bold text-2xl pb-4">Support</p>
            <li className="text-green-500 text-md pb-2 font-semibold hover:text-blue-600 cursor-pointer">
              Contact
            </li>
            <li className="text-green-500 text-md pb-2 font-semibold hover:text-blue-600 cursor-pointer">
              Support Portals
            </li>
          </ul>
        </div>
      </div>
      <div className="flex flex-row justify-center items-center text-center  p-5 bg-gray-50">
        <h1 className=" text-gray-800 font-semibold flex flex-row">
          © 2023-2027 All rights reserved by{" "}
          <span>
            <img className="h-8 w-8" src={Mydevls} alt="company" />
          </span>
        </h1>
      </div>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
}
