const mongoose = require("mongoose");
var reportShema = new mongoose.Schema({
  report: {
    type: String,
  },
  image: {
    type: String,
  },
  date: {
    type: String,
  },
});

var Report = mongoose.model("Report", reportShema);
module.exports = Report;
