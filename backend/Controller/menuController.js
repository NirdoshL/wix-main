const axios = require("axios");
const Menu = require("../Model/menuModel");
const ErrorHandler = require("../Utils/errorClass");
const { tryCatch } = require("../Utils/tryCatchController");

exports.getMenuItems = tryCatch(async (req, res, next) => {
  const { id } = await req.params;
  const data = await Menu.find({ apiID: id });
  if (data.length > 0) {
    res.status(200).json({
      success: true,
      message: "Item Fetched Successfully",
      data: data,
    });
    next();
  } else {
    next(new ErrorHandler());
  }
});

exports.getItems = tryCatch(async (req, res, next) => {
  // const apiID = "1181234022895776"; //EverestMaya
  // const apiID = "6814412901050500"; //terarain
  // const locationID = "70c512d8-eb4e-4524-8f1b-e86239409658"; //EverestMaya
  // const locatioID = "f3b86d59-fb0e-4d19-bd90-35749b9736b0"; //terarain
  const { apiID, locationID } = await req.body;
  await Menu.findOne({ apiID: apiID })
    .then(async (item) => {
      if (!item) {
        await axios
          .get(
            `https://api.wixrestaurants.com/v2/organizations/${apiID}/menu?locationId=${locationID}`
          )
          .then(async (k) => {
            let menus = [];
            if (k.data.items) {
              k.data.items.forEach(async (dataItem) => {
                if (
                  dataItem.hasOwnProperty("id") &&
                  dataItem.hasOwnProperty("title") &&
                  dataItem.hasOwnProperty("description")
                ) {
                  const newMenu = new Menu({
                    apiID: apiID,
                    menuId: await dataItem.id,
                    title: JSON.stringify(await dataItem.title),
                    desc: JSON.stringify(await dataItem.description),
                    price: await dataItem.price,
                  });
                  menus.push(newMenu);
                }
              });
            } else {
              next(new ErrorHandler("Response: null"));
            }
            const saveMenu = await Menu.insertMany(menus);
            if (saveMenu) {
              res.status(200).json({
                success: true,
                message: "Wix-Restaurant data fetching and mapping successful.",
              });
            } else {
              next(new ErrorHandler());
            }
          })
          .catch((err) => {
            next(
              new ErrorHandler("Please Provide Working Api_ID and Location_ID.")
            );
          });
      } else {
        next(new ErrorHandler("Menu with that API_ID already exists."));
      }
    })
    .catch((err) => next(new ErrorHandler(`${err}`)));
});

//{
//1. wix-res-api
//https://api.wixrestaurants.com/v2/organizations/1181234022895776/menu?locationId=70c512d8-eb4e-4524-8f1b-e86239409658
//2. search Key for locationID: currentLocationId
//3. search Key for apiID: "restaurant\",\"id\":
//}

//oauth: not required
//apiId: required
//locationId: required
