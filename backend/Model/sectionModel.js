const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const SectionSchema = new Schema({
  title: {
    type: Object,
    required: true,
  },
  desc: {
    type: Object,
  },
  children: {
    type: Array,
  },
  media: {
    type: Object,
    required: false,
  },
  apiID: {
    type: String,
  },
});
module.exports = Section = mongoose.model("section", SectionSchema);
