const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const RegisterMenuSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  locationID: {
    type: String,
    required: true,
  },
  apiID: {
    type: String,
    required: true,
  },
});
module.exports = User = mongoose.model("RegisteredMenu", RegisterMenuSchema);
