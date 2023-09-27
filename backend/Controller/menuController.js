const axios = require("axios");
const Menu = require("../Model/menuModel");
const Restaurant = require("../Model/registerMenu");
const Section = require("../Model/sectionModel");
const ErrorHandler = require("../Utils/errorClass");
const { tryCatch } = require("../Utils/tryCatchController");
const Client = require("../DataBase/cacheConnect");

// Get Menu Data from its id
exports.getMenuItems = tryCatch(async (req, res, next) => {
  const { id } = await req.params;
  // const cachedData = await Client.get(id)
  //   .then((data) => data)
  //   .catch((err) => err);
  // if (cachedData) {
  //   console.log(cachedData);
  // }
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

// fetch wix main menu and map sections
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
            let sections = [];
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
                    variations: (await dataItem.variations)
                      ? dataItem.variations
                      : null,
                    media: await dataItem.media.logo,
                  });
                  menus.push(newMenu);
                }
              });
            }
            if (k.data.sections) {
              k.data.sections.forEach(async (dataItem) => {
                const newSection = new Section({
                  title: dataItem.title,
                  desc: dataItem.description,
                  children: dataItem.children,
                  media: dataItem.media,
                  apiID: apiID,
                });
                sections.push(newSection);
              });
            } else {
              next(new ErrorHandler("Response: null"));
            }
            const saveMenu = await Menu.insertMany(menus);
            const saveSection = await Section.insertMany(sections);
            //caching set
            // Client.set(`${saveMenu._id}`, saveMenu);
            // Client.set(`${saveSection._id}`, saveSection);
            //caching done
            if (saveMenu && saveSection) {
              res.status(200).json({
                success: true,
                message:
                  "Wix-Restaurant Menu and Sections fetching and mapping successful.",
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

//fetch section and menu
exports.fetchMenuAndData = async (req, res, next) => {
  const { id } = await req.params;
  await Section.find({ apiID: id })
    .then(async (sections) => {
      if (sections) {
        await Menu.find({ apiID: id }).then(async (menu) => {
          res.status(200).json({
            success: true,
            menu: menu,
            section: sections,
          });
          next();
        });
      }
      next();
    })
    .catch((err) => {
      next(new ErrorHandler("Something went wrong."));
    });
};

exports.toggleShow = tryCatch(async (req, res, next) => {
  const { id } = await req.params;
  await Restaurant.findOne({ apiID: id })
    .then(async (rest) => {
      if (!rest) {
        next(new ErrorHandler("Menu with that ID Not found"));
      }
      rest.show = !rest.show;
      const save = await rest.save();
      if (save) {
        res.status(200).json({
          success: true,
          message: "Menu visibility changed.",
        });
        next();
      }
    })
    .catch((err) => {
      next(new ErrorHandler(`{Something went wrong: ${err}}`));
    });
});
