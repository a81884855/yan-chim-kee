const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TimeLineSchema = new Schema({
  image: {
    type: String,
    required: true
  },
  year: {
    type: String,
    required: true
  },
  chineseContent: {
    type: String,
    required: true
  },
  englishContent: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now
  },
});

module.exports = mongoose.model("timeline", TimeLineSchema);