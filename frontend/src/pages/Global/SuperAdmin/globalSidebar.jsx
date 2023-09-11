import React, { useState } from "react";
import { PiNotebookBold } from "react-icons/pi";
import { FaPeopleGroup } from "react-icons/fa6";
import { TbReportAnalytics } from "react-icons/tb";
import { MdOutlineDashboard } from "react-icons/md";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { RiSettings4Line, RiRestaurant2Line } from "react-icons/ri";

import { Link } from "react-router-dom";

export function GlobalSidebar() {
  const menus = [
    { name: "Dashboard", link: "/", icon: MdOutlineDashboard },
    { name: "Restaurant", link: "/restaurants", icon: RiRestaurant2Line },
    { name: "Menus", link: "/menus", icon: PiNotebookBold },
    { name: "Orders", link: "/order", icon: TbReportAnalytics, margin: true },
    { name: "Employees", link: "/employee", icon: FaPeopleGroup },
    { name: "Settings", link: "/", icon: RiSettings4Line },
  ];
  const [open, setOpen] = useState(true);
  return (
    <section className=" flex gap-6">
      <div
        className={`bg-green-800 rounded-md min-h-[90vh] ${
          open ? "w-72" : "w-16"
        } duration-500 text-gray-100 px-4`}
      >
        <div className="py-3 flex justify-end">
          <AiOutlineArrowLeft
            size={26}
            className={` cursor-pointer text-white rounded-md -right-3 top-9 w-7  ${
              !open && "rotate-180"
            }`}
            onClick={() => setOpen(!open)}
          />
        </div>
        <div className="mt-4 flex flex-col gap-4 ">
          {menus?.map((menu, i) => (
            <Link
              to={menu?.link}
              key={i}
              className={` ${
                menu?.margin && "mt-5"
              } group flex items-center text-sm  gap-3.5 font-medium p-2 hover:bg-green-600 rounded-md`}
            >
              <div>{React.createElement(menu?.icon, { size: "20" })}</div>
              <h2
                style={{
                  transitionDelay: `${i + 3}00ms`,
                }}
                className={`whitespace-pre duration-500 ${
                  !open && "opacity-0 translate-x-28 overflow-hidden"
                }`}
              >
                {menu?.name}
              </h2>
              <h2
                className={`${
                  open && "hidden"
                } absolute left-48 bg-white font-semibold whitespace-pre text-gray-900 rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-300 group-hover:w-fit  `}
              >
                {menu?.name}
              </h2>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
