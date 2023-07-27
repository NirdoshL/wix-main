const express = require("express");
const router = express.Router();
const { getItems, getMenuItems } = require("../Controller/menuController");
const { registerMenu, getMenu } = require("../Controller/registerController");

// router.get("/", getItems);
router.post("/register", registerMenu, getItems);
router.get("/menus", getMenu);
router.get("/menus/:id", getMenuItems);

module.exports = router;
