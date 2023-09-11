import { Outlet } from "react-router-dom";
import { AdminSidebar } from "./adminSideBar";
import { AdminNavBar } from "../../../components/index";

export function AdminHeader() {
  return (
    <>
      <div className="">
        <div className="flex my-[6%] overflow-scroll">
          <div className="basis-[12%] h-[90vh]">
            <AdminSidebar />
          </div>
          <div className={`basis-["100%" : "88%"] h-[90vh] overflow-scroll`}>
            <Outlet />
            <AdminNavBar />
          </div>
        </div>
      </div>
    </>
  );
}
