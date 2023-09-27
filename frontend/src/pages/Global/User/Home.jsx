import React from "react";
import { Banner } from "../../../components";
import RestaurantList from "../../../components/User/restaurantList";

export function UserHome() {
  return (
    <div className="w-full mx-auto">
      <Banner />
      <RestaurantList />
    </div>
  );
}
