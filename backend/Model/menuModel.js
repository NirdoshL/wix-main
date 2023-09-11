const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const MenuSchema = new Schema({
  apiID: {
    type: String,
    required: true,
  },
  menuId: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  desc: {
    type: String,
  },
  price: {
    type: Number,
  },
  variations: {
    type: Array,
  },
});
module.exports = User = mongoose.model("menu", MenuSchema);
