import React from "react";
import { Banner } from "../../../components";
import SpecialOffers from "../../../components/User/ShopNow";

export function UserHome() {
  return (
    <div className="w-full mx-auto">
      <Banner />
      <SpecialOffers />
    </div>
  );
}
