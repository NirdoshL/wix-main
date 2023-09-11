import { Outlet } from "react-router-dom"; //scroll to top for Paths mentioned
import {
  FloatingButtons,
  FooterBottom,
  HeaderBottom,
  UserFooter,
  UserNav,
} from "../../../components";
export function UserHeader() {
  return (
    <>
      <div className="">
        <div className="my-[1%] overflow-scroll">
          <UserNav />
          <HeaderBottom />
          <FloatingButtons />
          <Outlet />
          <UserFooter />
          <FooterBottom />
        </div>
      </div>
    </>
  );
}
