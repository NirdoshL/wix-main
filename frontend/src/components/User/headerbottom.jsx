import React, { useState, useEffect, useMemo } from "react";
import { HiOutlineMenuAlt4 } from "react-icons/hi";
import { FaSearch, FaUser, FaCaretDown, FaShoppingCart } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { GetStore } from "../../config/store";
import { useSelector } from "react-redux";
import { LogOutUser } from "../../function/userHandle";

export function HeaderBottom() {
  const user = GetStore("user");
  const profile = [
    {
      title: "Log In",
      link: "/",
    },
    {
      title: "Register",
      link: "/register",
    },
  ];
  const restName = [
    {
      name: "Everest Maya",
    },
    {
      name: "Terarrain",
    },
  ];

  const products = useSelector((state) => state.productReducer.products);
  const [show, setShow] = useState(false);
  const [showUser, setShowUser] = useState(false);
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  //showSearchBar add this if problem occurs
  const [setShowSearchBar] = useState(false);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };
  const paginationItem = useMemo(
    () => [
      {
        _id: 1001,
        productName: "Food 1",
        price: "35.00",
        badge: true,
        des: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic excepturi quibusdam odio deleniti reprehenderit facilis.",
      },
      {
        _id: 1002,
        productName: "Food 2",
        price: "180.00",
        badge: true,
        des: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic excepturi quibusdam odio deleniti reprehenderit facilis.",
      },
      {
        _id: 1003,
        productName: "Food 3",
        price: "25.00",
        badge: true,
        des: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic excepturi quibusdam odio deleniti reprehenderit facilis.",
      },
      {
        _id: 1004,
        productName: "Food 4",
        price: "220.00",
        badge: true,
        des: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic excepturi quibusdam odio deleniti reprehenderit facilis.",
      },
      {
        _id: 1005,
        productName: "Food 5",
        price: "35.00",
        badge: true,
        des: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic excepturi quibusdam odio deleniti reprehenderit facilis.",
      },
    ],
    []
  );

  useEffect(() => {
    const filtered = paginationItem.filter((item) =>
      item.productName.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredProducts(filtered);
  }, [searchQuery, paginationItem]);

  // useEffect(() => {
  //   const filtered = paginationItems.filter((item) =>
  //     item.productName.toLowerCase().includes(searchQuery.toLowerCase())
  //   );
  //   setFilteredProducts(filtered);
  // }, [searchQuery, paginationItems]);

  return (
    <div className="w-full bg-[#F5F5F3] relative">
      <div className="max-w-container mx-auto">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between w-full px-4 pb-4 lg:pb-0 h-full lg:h-24">
          <div
            onClick={() => setShow(!show)}
            className="flex h-14 cursor-pointer items-center gap-2 text-primeColor"
          >
            <HiOutlineMenuAlt4 className="w-5 h-5" />
            <p className="text-[14px] font-normal">Shop by Restaurant</p>

            {show && (
              <ul className="absolute top-36 z-50 bg-gray-800 w-auto text-[#767676] h-auto p-4 pb-6">
                {restName.map((rest, index) => (
                  <li
                    key={index}
                    className="text-gray-400 px-4 py-1 border-b-[1px] border-b-gray-400 hover:border-b-white hover:text-white duration-300 cursor-pointer"
                  >
                    {rest.name}
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div className="relative z-50 w-full lg:w-[600px] h-[50px] text-base text-primeColor bg-white flex items-center gap-2 justify-between px-6 rounded-xl">
            <input
              className="flex-1 h-full outline-none placeholder:text-[#aca3a3] placeholder:text-[14px]"
              type="text"
              onChange={handleSearch}
              value={searchQuery}
              placeholder="Search your favourite food here"
            />
            <FaSearch className="w-5 h-5" />
            {searchQuery && (
              <div
                className={`w-full mx-auto h-96  bg-white top-16 absolute left-0 z-50 overflow-y-scroll shadow-2xl scrollbar-hide cursor-pointer`}
              >
                {searchQuery &&
                  filteredProducts.map((item) => (
                    <div
                      onClick={() =>
                        navigate(
                          `/product/${item.productName
                            .toLowerCase()
                            .split(" ")
                            .join("")}`,
                          {
                            state: {
                              item: item,
                            },
                          }
                        ) &
                        setShowSearchBar(true) &
                        setSearchQuery("")
                      }
                      key={item._id}
                      className="max-w-[600px] h-28 bg-gray-100 mb-3 flex items-center gap-3"
                    >
                      <img className="w-24" src={item.img} alt="productImg" />
                      <div className="flex flex-col gap-1">
                        <p className="font-semibold text-lg">
                          {item.productName}
                        </p>
                        <p className="text-xs">{item.des}</p>
                        <p className="text-sm">
                          Price:{" "}
                          <span className="text-primeColor font-semibold">
                            ${item.price}
                          </span>
                        </p>
                      </div>
                    </div>
                  ))}
              </div>
            )}
          </div>
          <div className="flex gap-4 mt-2 lg:mt-0 items-center pr-6 cursor-pointer relative">
            <div onClick={() => setShowUser(!showUser)} className="flex">
              <FaUser />
              <FaCaretDown />
            </div>
            {showUser && (
              <ul className="absolute top-6 left-0 z-50 bg-gray-800 w-44 text-[#767676] h-auto p-4 pb-6">
                {!user &&
                  profile.map((item, index) => (
                    <Link key={index} to={item.link}>
                      <li className="text-gray-400 px-4 py-1 border-b-[1px] border-b-gray-400 hover:border-b-white hover:text-white duration-300 cursor-pointer">
                        {item.title}
                      </li>
                    </Link>
                  ))}
                {user && (
                  <>
                    <Link to={"/profile"}>
                      <li className="text-gray-400 px-4 py-1 border-b-[1px] border-b-gray-400 hover:border-b-white hover:text-white duration-300 cursor-pointer">
                        Profile
                      </li>
                    </Link>
                    <button onClick={() => LogOutUser()}>
                      <li className="text-gray-400 px-4 py-1 border-b-[1px] border-b-gray-400 hover:border-b-white hover:text-white duration-300 cursor-pointer">
                        Log Out
                      </li>
                    </button>
                  </>
                )}
              </ul>
            )}
            <Link to="/cart">
              <div className="relative">
                <FaShoppingCart />
                <span className="absolute font-titleFont top-3 -right-2 text-xs w-4 h-4 flex items-center justify-center rounded-full bg-primeColor text-red-500">
                  {products.length > 0 ? products.length : 0}
                </span>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
