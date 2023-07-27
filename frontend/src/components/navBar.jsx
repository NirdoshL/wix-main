import { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import Logo from "../assets/mydvls.png";
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import { GlobalFooter } from "../pages/Global";

export function NavBar() {
  let Links = [
    { name: "HOME", link: "/home" },
    { name: "RESTAURANTS", link: "/restaurants" },
    { name: "MENUS", link: "/menus" },
    { name: "ABOUT", link: "/about" },
    { name: "CONTACT", link: "/contact" },
  ];
  const [open, setOpen] = useState(false);
  return (
    <>
      <div className="shadow-md w-full fixed top-0 left-0">
        <div className="md:flex items-center justify-between bg-white py-4 md:px-10 px-7 text-green-800">
          <div className="cursor-pointer flex items-center">
            <Link to={"/home"}>
              <img src={Logo} className="max-h-10 max-w-full" alt="..." />
            </Link>
          </div>

          <div
            onClick={() => setOpen(!open)}
            className="text-3xl absolute right-8 top-6 cursor-pointer md:hidden"
          >
            <HiOutlineMenuAlt3 name={open ? "close" : "menu"} />
          </div>

          <ul
            className={`md:flex md:items-center md:pb-0 pb-12 absolute md:static bg-white md:z-auto z-[-1] left-0 w-full md:w-auto md:pl-0 pl-9 transition-all duration-500 ease-in ${
              open ? "top-20 " : "top-[-490px]"
            }`}
          >
            {Links.map((link) => (
              <li key={link.name} className="md:ml-8 text-xl md:my-0 my-7">
                <Link
                  to={link.link}
                  className="text-green-800 hover:text-gray-400 duration-500"
                >
                  {link.name}
                </Link>
              </li>
            ))}
            <button
              className="bg-green-800 text-white font-[Poppins] py-2 px-6 rounded md:ml-8 hover:bg-green-500 
        duration-500"
            >
              SignIn
            </button>
          </ul>
        </div>
      </div>
      <div className="my-20 mx-5">
        <Outlet />
      </div>
      <GlobalFooter />
    </>
  );
}
