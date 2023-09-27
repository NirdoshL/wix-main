import { MdClose } from "react-icons/md";
import { useSelector } from "react-redux";
import logo from "../../assets/mydvls.png";
import { HiMenuAlt2 } from "react-icons/hi";
import { GetStore } from "../../config/store";
import logoLight from "../../assets/mydvls.png";
import React, { useEffect, useState } from "react";
import { LogOutUser } from "../../function/userHandle";
import { Link, NavLink, useLocation } from "react-router-dom";
import { navBarList, profile } from "../../config/headerLinks";
import { FaUser, FaCaretDown, FaShoppingCart } from "react-icons/fa";

export function UserNav() {
  const user = GetStore("user");
  const location = useLocation();
  const [sidenav, setSidenav] = useState(false);
  const [showMenu, setShowMenu] = useState(true);
  const [showUser, setShowUser] = useState(false);
  const products = useSelector((state) => state.productReducer.products);
  useEffect(() => {
    let ResponsiveMenu = () => {
      if (window.innerWidth < 667) {
        setShowMenu(false);
      } else {
        setShowMenu(true);
      }
    };
    ResponsiveMenu();
    window.addEventListener("resize", ResponsiveMenu);
  }, []);

  return (
    <div className="w-full h-20 bg-white sticky top-0 z-50 border-b-[1px] border-b-gray-200">
      <nav className="h-full px-4 max-w-container mx-auto relative">
        <div className="flex items-center justify-between h-full">
          <Link to="/">
            <div>
              <img alt="logo" className="w-20 object-cover" src={logo} />
            </div>
          </Link>
          <div className="flex ml-auto mr-4 gap-4 mt-2 lg:mt-0 items-center pr-6 cursor-pointer relative">
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
          <div>
            {showMenu && (
              <ul className="flex items-center w-auto z-50 p-0 gap-2">
                <>
                  {navBarList.map(({ title, link }) => (
                    <NavLink
                      key={title}
                      className="flex font-normal hover:font-bold w-20 h-6 justify-center items-center px-12 text-base text-[#767676] hover:text-[#262626] md:border-r-[2px] border-r-gray-300 hoverEffect last:border-r-0"
                      to={link}
                      state={{ data: location.pathname.split("/")[1] }}
                    >
                      <li>{title}</li>
                    </NavLink>
                  ))}
                </>
              </ul>
            )}
            <HiMenuAlt2
              onClick={() => setSidenav(!sidenav)}
              className="inline-block md:hidden cursor-pointer w-8 h-6 absolute top-6 right-4"
            />
            {sidenav && (
              <div className="fixed top-0 left-0 w-full h-screen bg-black text-gray-200 bg-opacity-95 z-50">
                <div className="w-[80%] h-full relative">
                  <div className="w-full h-full bg-primeColor p-6">
                    <img
                      className="w-28 mb-6"
                      src={logoLight}
                      alt="logoLight"
                    />
                    <ul className="text-gray-200 flex flex-col gap-2">
                      {navBarList.map((item) => (
                        <li
                          className="font-normal hover:font-bold items-center text-lg text-gray-200 hover:text-white md:border-r-[2px] border-r-gray-300 hoverEffect last:border-r-0"
                          key={item._id}
                        >
                          <NavLink
                            to={item.link}
                            state={{ data: location.pathname.split("/")[1] }}
                            onClick={() => setSidenav(false)}
                          >
                            {item.title}
                          </NavLink>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <span
                    onClick={() => setSidenav(false)}
                    className="w-8 h-8 border-[1px] border-gray-300 absolute top-2 -right-10 text-gray-300 text-2xl flex justify-center items-center cursor-pointer hover:border-red-500 hover:text-red-500 duration-300"
                  >
                    <MdClose />
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
}
