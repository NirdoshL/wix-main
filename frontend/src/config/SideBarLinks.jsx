import { TbReportAnalytics } from "react-icons/tb";
import { PiNotebookBold } from "react-icons/pi";
import { FaPeopleGroup } from "react-icons/fa6";
import { MdOutlineDashboard } from "react-icons/md";
import { RiSettings4Line, RiRestaurant2Line } from "react-icons/ri";

export const AdminSidebarLink = [
  {
    name: "Orders",
    link: "admin/order",
    icon: TbReportAnalytics,
    margin: true,
  },
  { name: "Menus", link: "/admin/restaurant/menu", icon: PiNotebookBold },
  { name: "Settings", link: "/admin/settings", icon: RiSettings4Line },
];

export const SuperSidebarLink = [
  { name: "Dashboard", link: "/", icon: MdOutlineDashboard },
  { name: "Restaurant", link: "/restaurants", icon: RiRestaurant2Line },
  { name: "Menus", link: "/menus", icon: PiNotebookBold },
  { name: "Orders", link: "/order", icon: TbReportAnalytics, margin: true },
  { name: "Employees", link: "/employee", icon: FaPeopleGroup },
  { name: "Settings", link: "/super/settings", icon: RiSettings4Line },
];
