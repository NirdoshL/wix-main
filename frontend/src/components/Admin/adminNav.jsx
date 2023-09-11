import { useState } from "react";
import { Link } from "react-router-dom";
import Logo from "../../assets/mydvls.png";
import profile from "../../assets/3d1.png";
import { GetStore } from "../../config/store";
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import { LogOutUser } from "../../function/userHandle";

export function AdminNavBar() {
  //links visible in Nav Bar
  // const Links = [{ name: "HOME", link: "/admin/order" }];

  //handles menu hamberger menu for mobile view & nav item for others
  const [open, setOpen] = useState(false);
  //handles profile
  const [popen, setPOpen] = useState(false);
  //gives user details from localstorage
  const name = GetStore("user").user.name;
  // control the pop-up when clicked in avatar
  const showProfile = () => {
    setPOpen(!popen);
  };
  return (
    <>
      <div className="shadow-md w-full fixed top-0 left-0">
        <div className="md:flex items-center justify-between bg-white py-4 md:px-10 px-7 text-green-800">
          {
            //right hand side of nav bar
          }
          <div className="cursor-pointer flex items-center">
            <Link to={"/admin/order"}>
              <img src={Logo} className="max-h-10 max-w-full" alt="..." />
            </Link>
            <h1 className="ml-10 text-green-900 text-lg font-bold">
              Admin DashBoard
            </h1>
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
            {/* {Links.map((link) => (
              <li key={link.name} className="md:ml-8 text-xl md:my-0 my-7">
                <Link
                  to={link.link}
                  className="text-green-800 hover:text-gray-400 duration-500"
                >
                  {link.name}
                </Link>
              </li>
            ))} */}

            <div
              className="flex items-center gap-[15px] relative ml-5"
              onClick={showProfile}
            >
              <p className="overflow-ellipse">{name}</p>
              <div className="h-[30px] w-[30px] rounded-full bg-white cursor-pointer flex items-center justify-center relative z-40">
                <img src={profile} alt="" />
              </div>
              {
                //Pop UP profile
              }
              {popen && (
                <div className="bg-white border h-[120px] w-[150px] absolute bottom-[-135px] z-20 right-0 pt-[15px] pl-[15px] space-y-[10px]">
                  <Link to={"/admin/profile"}>
                    <p className="cursor-pointer hover:text-[green] font-semibold">
                      Profile
                    </p>
                  </Link>
                  <p className="cursor-pointer hover:text-[green] font-semibold">
                    Settings
                  </p>
                  <button onClick={() => LogOutUser()}>
                    <p className="cursor-pointer hover:text-[green] font-semibold">
                      Log out
                    </p>
                  </button>
                </div>
              )}
            </div>
          </ul>
        </div>
      </div>
    </>
  );
}
