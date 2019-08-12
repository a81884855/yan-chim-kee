const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const SlideShowSchema = new Schema({
  image: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
});

module.exports = mongoose.model("slideshow", SlideShowSchema);
