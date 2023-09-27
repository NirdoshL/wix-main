import Product from "./product";
import Img from "../../assets/food.png";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const TopCatagory = ({ datas, data, indexCata }) => {
  const { id } = useParams();
  const [allDatas, setAllDatas] = useState([]);
  const [activeTab, setActiveTab] = useState(-1);
  const [matchingMenu, setMatchingMenu] = useState([]);

  // Reset activeTab & matchingMenu and set allDatas when indexCata changes
  //
  useEffect(() => {
    setActiveTab(-1);
    setMatchingMenu([]);
    const allData = datas.data.map((item) => item.menuId);
    setAllDatas(allData);
  }, [indexCata, datas.data]);

  const handleTabClick = (index) => {
    setActiveTab(index);
    const selectedChild = data.section[indexCata].children[index];
    const matchingMenuIds = selectedChild.itemIds;
    const matchingMenuItems = data.menu.filter((item) =>
      matchingMenuIds.includes(item.menuId)
    );
    setMatchingMenu(matchingMenuItems);
  };

  return (
    <div className="flex flex-col md:flex-col">
      <div className="md:mr-4 flex flex-wrap">
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
      <div className="w-full grid grid-cols-1 m-1 md:grid-cols-2 lgl:grid-cols-2 xl:grid-cols-2 gap-10">
        {matchingMenu.map((item, itemIndex) => (
          <>
            {item.variations
              ? item.variations.map((variation, variationIndex) => {
                  const matchingItemIds = variation.itemIds.filter((id) =>
                    allDatas.includes(id)
                  );
                  if (matchingItemIds.length > 0) {
                    const titlesList = matchingItemIds.map((matchingItemId) => {
                      const matchingItem = datas.data.find(
                        (item) => item.menuId === matchingItemId
                      );
                      return matchingItem;
                    });

                    return (
                      <Product
                        key={`${itemIndex}-${variationIndex}`}
                        _id={item.title}
                        resID={id}
                        img={item.media ? item.media : Img}
                        foodName={JSON.parse(item.title).en_US}
                        variations={titlesList}
                        variationPrice={variation.prices}
                        price={item.price ? parseInt(item.price) / 100 : 0}
                        des={item.desc}
                      />
                    );
                  }
                  return null;
                })
              : item.price && (
                  <Product
                    key={item.menuId}
                    _id={item.title}
                    img={item.media ? item.media : Img}
                    resID={id}
                    foodName={JSON.parse(item.title).en_US}
                    price={item.price ? parseInt(item.price) / 100 : 0}
                    des={item.desc}
                  />
                )}
          </>
        ))}
      </div>
    </div>
  );
};

export default TopCatagory;

// import Product from "./product";
// import Img from "../../assets/food.png";
// import React, { useState, useEffect } from "react";
// import { useParams } from "react-router-dom";

// const TopCatagory = ({ datas, data, indexCata }) => {
//   const { id } = useParams();
//   const [allDatas, setAllDatas] = useState([]);
//   const [activeTab, setActiveTab] = useState(-1);
//   const [matchingMenu, setMatchingMenu] = useState([]);

//   // Reset activeTab & matchingMenu and set allDatas when indexCata changes
//   //
//   useEffect(() => {
//     setActiveTab(-1);
//     setMatchingMenu([]);
//     const allData = datas.data.map((item) => item.menuId);
//     setAllDatas(allData);
//   }, [indexCata, datas.data]);

//   const handleTabClick = (index) => {
//     setActiveTab(index);
//     const selectedChild = data.section[indexCata].children[index];
//     const matchingMenuIds = selectedChild.itemIds;
//     const matchingMenuItems = data.menu.filter((item) =>
//       matchingMenuIds.includes(item.menuId)
//     );
//     setMatchingMenu(matchingMenuItems);
//   };

//   return (
//     <div className="flex flex-col md:flex-col">
//       <div className="md:mr-4 flex flex-wrap">
//         {data.section[indexCata].children.map((child, index) => (
//           <button
//             key={child.id}
//             onClick={() => handleTabClick(index)}
//             className={`w-20 h-20 m-2 text-xs text-ellipsis md:w-20 md:h-20 text-center rounded ${
//               activeTab === index ? "bg-green-500 text-white" : "bg-gray-200"
//             }`}
//           >
//             {child.title.en_US}
//           </button>
//         ))}
//       </div>
//       <div className="w-full grid grid-cols-1 m-1 md:grid-cols-2 lgl:grid-cols-2 xl:grid-cols-2 gap-10">
//         {matchingMenu.map((item, itemIndex) => (
//           <>
//             {item.variations
//               ? item.variations.map((variation, variationIndex) => {
//                   const matchingItemIds = variation.itemIds.filter((id) =>
//                     allDatas.includes(id)
//                   );
//                   if (matchingItemIds.length > 0) {
//                     const titlesList = matchingItemIds.map((matchingItemId) => {
//                       const matchingItem = datas.data.find(
//                         (item) => item.menuId === matchingItemId
//                       );
//                       return matchingItem;
//                     });

//                     return (
//                       <Product
//                         key={`${itemIndex}-${variationIndex}`}
//                         _id={item.title}
//                         resID={id}
//                         img={item.media ? item.media : Img}
//                         foodName={JSON.parse(item.title).en_US}
//                         variations={titlesList}
//                         variationPrice={variation.prices}
//                         price={item.price ? parseInt(item.price) / 100 : 0}
//                         des={item.desc}
//                       />
//                     );
//                   }
//                   return null;
//                 })
//               : item.price && (
//                   <Product
//                     key={item.menuId}
//                     _id={item.title}
//                     img={item.media ? item.media : Img}
//                     resID={id}
//                     foodName={JSON.parse(item.title).en_US}
//                     price={item.price ? parseInt(item.price) / 100 : 0}
//                     des={item.desc}
//                   />
//                 )}
//           </>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default TopCatagory;
