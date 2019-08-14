const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TimeLineSchema = new Schema({
  image: {
    type: String,
    required: true
  },
  year: {
    typs: String,
    required: true
  },
  chineseContent: {
    typs: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
});

module.exports = mongoose.model("timeline", TimeLineSchema);