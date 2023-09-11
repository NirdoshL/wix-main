import { Outlet } from "react-router-dom";
import { GlobalSidebar } from "./globalSidebar";
import { NavBar } from "../../../components/index";
// import { useEffect } from "react";
export function GlobalHeader() {
  // to clear local storage on refresh/on tab close / on browser close
  // required if using local storage

  // const clearLocalStorageOnClose = () => {
  //   localStorage.removeItem("menus");
  //   localStorage.removeItem("menuItem");
  // };

  // useEffect(() => {
  //   window.addEventListener("beforeunload", clearLocalStorageOnClose);

  //   return () => {
  //     window.removeEventListener("beforeunload", clearLocalStorageOnClose);
  //   };
  // }, []);
  return (
    <>
      <div className="">
        <div className="flex my-[6%] overflow-scroll">
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
