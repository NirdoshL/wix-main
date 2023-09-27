import { Outlet } from "react-router-dom";
import { GlobalSidebar } from "./globalSidebar";
import { NavBar } from "../../../components/index";

export function GlobalHeader() {
  return (
    <>
      <div className="">
        <div className="flex my-[70px] overflow-scroll">
          <div className="basis-[12%] h-[90vh]">
            <GlobalSidebar />
          </div>
          <div className={`basis-["100%"] h-[90vh] overflow-scroll`}>
            <Outlet />
            <NavBar />
          </div>
        </div>
      </div>
    </>
  );
}
