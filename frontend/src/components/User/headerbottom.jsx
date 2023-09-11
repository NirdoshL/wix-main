import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { GetStore } from "../../config/store";
import { LogOutUser } from "../../function/userHandle";
import { FaUser, FaCaretDown, FaShoppingCart } from "react-icons/fa";

export function HeaderBottom() {
  const user = GetStore("user");
  const profile = [
    {
      title: "Log In",
      link: "/",
    },
    {
      title: "Register",
      link: "/register",
    },
  ];

  const products = useSelector((state) => state.productReducer.products);

  const [showUser, setShowUser] = useState(false);

  return (
    <div className="w-full bg-[#F5F5F3] relative">
      <div className="max-w-container mx-auto">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between w-full px-4 pb-4 lg:pb-0 h-full lg:h-24">
          <div className="flex ml-auto  gap-4 mt-2 lg:mt-0 items-center pr-6 cursor-pointer relative">
            <div onClick={() => setShowUser(!showUser)} className="flex">
              <FaUser />
              <FaCaretDown />
            </div>
            {showUser && (
              <ul className="absolute top-6 left-0 z-50 bg-gray-800 w-44 text-[#767676] h-auto p-4 pb-6">
                {!user &&
                  profile.map((item, index) => (
                    <Link key={index} to={item.link}>
                      <li className="text-gray-400 px-4 py-1 border-b-[1px] border-b-gray-400 hover:border-b-white hover:text-white duration-300 cursor-pointer">
                        {item.title}
                      </li>
                    </Link>
                  ))}
                {user && (
                  <>
                    <Link to={"/profile"}>
                      <li className="text-gray-400 px-4 py-1 border-b-[1px] border-b-gray-400 hover:border-b-white hover:text-white duration-300 cursor-pointer">
                        Profile
                      </li>
                    </Link>
                    <button onClick={() => LogOutUser()}>
                      <li className="text-gray-400 px-4 py-1 border-b-[1px] border-b-gray-400 hover:border-b-white hover:text-white duration-300 cursor-pointer">
                        Log Out
                      </li>
                    </button>
                  </>
                )}
              </ul>
            )}
            <Link to="/cart" preventScrollReset={true}>
              <div className="relative">
                <FaShoppingCart />
                <span className="absolute font-titleFont top-3 -right-2 text-xs w-4 h-4 flex items-center justify-center rounded-full bg-primeColor text-red-500">
                  {products.length > 0 ? products.length : 0}
                </span>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
