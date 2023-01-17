const mongoose = require("mongoose");
var dailyReport = require("../model/dailyReport");
const passportLocalMongoose = require("passport-local-mongoose");
var userSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  username: {
    type: String,
  },
  password: {
    type: String,
  },
  email: {
    type: String,
  },
  institution: {
    type: String,
  },
  phone_number: {
    type: String,
  },
  session: {
    type: String,
  },
  reports: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Report",
    },
  ],
});
userSchema.plugin(passportLocalMongoose);

var User = mongoose.model("User", userSchema);
module.exports = User;
