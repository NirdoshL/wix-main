import Product from "./product";
import Img from "../../assets/29.png";
import React, { useState } from "react";

//catagory
const TopCatagory = ({ data, indexCata }) => {
  //Active link is not set by default
  const [activeTab, setActiveTab] = useState(-1);
  //stores all matching ids of an items.
  const [matchingMenu, setMatchingMenu] = useState([]);
  //toggle active link according to user click
  const handleTabClick = (index) => {
    setActiveTab(index);
    //filtering only matching item from menu by id
    const selectedChild = data.section[indexCata].children[index];
    const matchingMenuIds = selectedChild.itemIds;
    const matchingMenuItems = data.menu.filter((item) =>
      matchingMenuIds.includes(item.menuId)
    );
    setMatchingMenu(matchingMenuItems);
  };

  return (
    <div className="flex flex-col md:flex-col">
      <div className=" md:mr-4 flex flex-wrap">
        {
          //mapping to show title of id as button when clicked gives matching item as Product
        }
        {data.section[indexCata].children.map((child, index) => (
          <button
            key={child.id}
            onClick={() => handleTabClick(index)}
            className={`w-20 h-20 m-2 text-xs text-ellipsis md:w-20 md:h-20 text-center rounded ${
              activeTab === index ? "bg-green-500 text-white" : "bg-gray-200"
            }`}
          >
            {child.title.en_US}
          </button>
        ))}
      </div>
      {
        //product details
      }
      <div className="w-full grid grid-cols-1 m-1 md:grid-cols-2 lgl:grid-cols-3 xl:grid-cols-4 gap-10">
        {matchingMenu.map((item) => (
          <Product
            key={item.menuId}
            _id={item.menuId}
            img={Img}
            foodName={JSON.parse(item.title).en_US}
            price={item.price ? parseInt(item.price) / 100 : 0}
            badge={true}
            des={item.desc}
          />
        ))}
      </div>
    </div>
  );
};

export default TopCatagory;
