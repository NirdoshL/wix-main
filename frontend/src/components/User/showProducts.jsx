import Product from "./product";
import Spinner from "../spinner";
import TopCatagory from "./catagory";
import Img from "../../assets/29.png";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import { GoTriangleDown } from "react-icons/go";
import React, { useState, useEffect } from "react";
import { fetchDataItem, fetchSectionAndMenu } from "../../function/fetchMenu";

export default function ShowProducts() {
  const { id, name } = useParams();
  const [data, setData] = useState([]);
  const [datas, setDatas] = useState([]);
  const [allDatas, setallDatas] = useState([]);
  const [indexCata, setIndexCata] = useState(0);
  const [showLoading, setShowLoading] = useState(true);
  const [visibleProducts, setVisibleProducts] = useState(8);

  // All Menu along with Section fetching
  useEffect(() => {
    async function fetchDataItemAsync() {
      setShowLoading(true);
      try {
        const responseData = await fetchDataItem(id);
        const responseMenu = await fetchSectionAndMenu(id);
        const allData = responseData.data.map((item) => item.menuId);
        setDatas(responseData);
        setData(responseMenu);
        setallDatas(allData);
        setShowLoading(false);
      } catch (error) {
        setShowLoading(false);
        toast(`Error fetching data: ${error}`);
      }
    }
    fetchDataItemAsync();
  }, [id]);

  // increase by 10 on show more
  const handleShowMore = () => {
    setVisibleProducts((prevVisibleProducts) => prevVisibleProducts + 10);
  };
  //  handle Catagory change
  const handleSelectChange = (event) => {
    const newIndex = event.target.selectedIndex;
    setIndexCata(newIndex);
  };

  return showLoading ? (
    <Spinner />
  ) : (
    <>
      <h1 className="py-3 text-3xl text-green-600 md:text-4xl text-center justify-center font-bold">
        {name}
      </h1>
      <div className="flex items-center gap-2 m-2 md:gap-6 mt-4 md:mt-0">
        <div className="flex items-center gap-2 text-base text-[#767676] relative">
          <label className="block">Sort by Catagory:</label>
          <select
            onChange={handleSelectChange}
            id="Catagories"
            className="w-32 md:w-52 border-[1px] border-gray-200 py-1 px-4 cursor-pointer text-green-400 text-base block dark:placeholder-gray-400 appearance-none focus-within:outline-none focus-visible:border-primeColor"
          >
            {data &&
              data.section.map((item, index) =>
                item.title.en_US === "Trash" ? null : (
                  <option key={index} value={item.title.en_US}>
                    {item.title.en_US}
                  </option>
                )
              )}
          </select>
          <span className="absolute text-sm right-2 md:right-4 top-2.5">
            <GoTriangleDown />
          </span>
        </div>
      </div>

      <TopCatagory datas={datas} data={data} indexCata={indexCata} />
      <hr className="border-green-800 border-2" />
      <h1 className="py-6 text-3xl underline text-red-600 md:text-4xl text-center justify-center font-bold">
        Our Menu
      </h1>
      <div className="w-full grid grid-cols-1 m-1 md:grid-cols-2 lgl:grid-cols-3 xl:grid-cols-4 gap-10">
        {datas.data.slice(0, visibleProducts).map((item) => (
          <>
            {item.variations
              ? item.variations.map((variation, index) => {
                  const matchingItemIds = variation.itemIds.filter((id) =>
                    allDatas.includes(id)
                  );
                  if (matchingItemIds.length > 0) {
                    let titlesList = [];
                    return (
                      <div key={index}>
                        {matchingItemIds.forEach((matchingItemId) => {
                          const matchingItem = datas.data.find(
                            (item) => item.menuId === matchingItemId
                          );
                          return titlesList.push(matchingItem);
                        })}
                        <Product
                          key={index}
                          _id={item.title}
                          resID={id}
                          img={Img}
                          foodName={JSON.parse(item.title).en_US}
                          variations={titlesList}
                          variationPrice={variation.prices}
                          price={item.price ? parseInt(item.price) / 100 : ""}
                          badge={true}
                          des={item.desc}
                        />
                      </div>
                    );
                  }
                  return null;
                })
              : item.price && (
                  <Product
                    key={item.menuId}
                    _id={item.title}
                    img={Img}
                    resID={id}
                    foodName={JSON.parse(item.title).en_US}
                    price={item.price ? parseInt(item.price) / 100 : ""}
                    badge={true}
                    des={item.desc}
                  />
                )}
          </>
        ))}
      </div>
      {visibleProducts < datas.data.length && (
        <button
          className="bg-green-800 m-2 rounded-md cursor-pointer hover:bg-green-500 active:bg-gray-900 px-8 py-2 font-titleFont font-semibold text-lg text-white hover:text-white duration-300"
          onClick={handleShowMore}
        >
          Show More
        </button>
      )}
    </>
  );
}
