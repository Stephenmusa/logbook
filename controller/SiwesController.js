const express = require("express");
const methodOverride = require("method-override");
const multer = require("multer");
const passport = require("passport"),
  LocalStrategy = require("passport-local"),
  passportLocalMongoose = require("passport-local-mongoose");
const { isUser } = require("../middleware/isLoggedIn");
const User = require("../model/user");
// passport.use(new LocalStrategy(Helper.authenticate()));
// passport.serializeUser(Helper.serializeUser());
// passport.deserializeUser(Helper.deserializeUser());

// exports.Register = async function(req,res){
//     const {name, location,username,state, city,restname, password, phone,country} = req.body;
//     if(!name ||!location ||!username ||!state ||!city ||!restname ||!password ||!phone ||! country){
//         req.flash("error", "Please Fill All the Fields");
//         // return res.redirect("register");
//     }
//     const existingHelper = await Helper.findOne({username:username});
//     if(existingHelper){
//        req.flash("error", "Resturant Already Exist");

//     }

//         var image = req.file;
//         console.log(image);
//         await Helper.register(new Helper({name:name, location:location, phone:phone,username:username,state:state,city:city,  image: image.filename, restname:restname, foodAvailable:false, country:country}),  password).then(function(result){
//         passport.authenticate("local")(req,res,function(result){

//             req.flash("success", "Thank You for regitering Your Resturat with us");
//             return  res.status(200).redirect("/");
//             console.log(result)
//         });
//     }).catch(function(err){
//         console.log(err)
//     });
// }

// exports.login = passport.authenticate('local', {
//     // successRedirect: '/',
//     // failureRedirect: "/register"
// });
// exports.logout = async function(req,res){
//     req.logout();
//     // req.flash("success", "You have Logged Out");
//     // res.redirect("/login")
// }

exports.index = async function (req, res) {
  res.render("student/index");
};
exports.login = async function (req, res) {
  res.render("student/login");
};

exports.dashboard = async function (req, res) {
  res.render("student/dashboard", { user: req.user });
  // console.log(req.user.username);
};
exports.register = async function (req, res) {
  res.render("student/register");
};
exports.elogbook = async function (req, res) {
  res.render("student/elogbook", { user: req.user });
  // console.log(req.user.username);
};
exports.weeklyreport = async function (req, res) {
  // to get weekly reports
  const user_report = await User.findOne({
    username: req.user.username,
  })
    .populate("reports")
    .exec();
  res.render("student/weeklyreport", { report: user_report });
  console.log(user_report);
};
exports.coc = async function (req, res) {
  res.render("student/coc");
};
exports.admin = async function (req, res) {
  res.render("schooladmin/dashboard");
};
exports.intadmin = async function (req, res) {
  res.render("intadmin/dashboard");
};
exports.adminlogin = async function (req, res) {
  res.render("schooladmin/login");
};
exports.adminassessment = async function (req, res) {
  res.render("schooladmin/assessment");
};
exports.intlogin = async function (req, res) {
  res.render("intadmin/login");
};
exports.supervisor = async function (req, res) {
  res.render("supervisor/dashboard");
};
exports.supervisorlogin = async function (req, res) {
  res.render("supervisor/login");
};
