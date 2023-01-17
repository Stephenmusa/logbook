const express = require("express");
const User = require("../model/user");
const mongoose = require("mongoose");
var app = express();

const bodyParser = require("body-parser");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const passportLocalMongoose = require("passport-local-mongoose");
const dailyReport = require("../model/dailyReport");
const {
  index,
  login,
  dashboard,
  register,
  elogbook,
  weeklyreport,
  coc,
  admin,
  adminlogin,
  intlogin,
  supervisor,
  supervisorlogin,
  adminassessment,
} = require("../controller/siwesController");
const { isLoggedin } = require("../middleware/isLoggedIn");
const { isUser } = require("../middleware/isLoggedIn");
const multer = require("multer");

var router = express.Router();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(
  require("express-session")({
    secret: "This is working Fine",
    resave: false,
    saveUninitialized: false,
  })
);

// setting up passsport
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// adding image to database
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + "-" + Date.now());
  },
});

// const imageStorage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "uploads/");
//   },
//   filename: function (req, file, cb) {
//     cb(null, file.fieldname + "-" + Date.now());
//   },
// });

var image = multer({ storage: storage }).single("image");

router.get("/index", index);
router.get("/login", login);
router.get("/dashboard", isLoggedin, dashboard);
router.get("/register", register);
router.get("/elogbook", isLoggedin,elogbook);
router.get("/schooladmin");
router.get("/weeklyreport", isLoggedin,weeklyreport);
router.get("/coc", coc);
router.get("/admin", admin);
router.get("/intadmin", admin);
router.get("/adminlogin", adminlogin);
router.get("/intlogin", intlogin);
router.get("/supervisor", supervisor);
router.get("/supervisorlogin", supervisorlogin);
router.get("/adminassessment", adminassessment);

//adding daily progress
router.post("/elogbook", image, (req, res) => {
  dailyReport.create({
    report: req.body.report,
    image: req.file.filename,
    date: req.body.date,
  },function(err, report){
    User.findOne({username:req.user.username},function(err, foundUser){
      if(err){
        console.log(err)
      }else{
        foundUser.reports.push(report);
        foundUser.save(function(err,data){
          if(err){
            console.log(err)
          }else{
            console.log(data)
            res.redirect("/weeklyreport");

            
           }
        })
      }
    })
  });
 
});

//login logic
router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/dashboard",
    failureRedirect: "/login",
  }),
  function (req, res) {}
);

// registering a new student into the database
router.post("/register", (req, res) => {
  User.register(
    new User({
      name: req.body.name,
      username: req.body.username,
      email: req.body.email,
      institution: req.body.institution,
      session: req.body.session,
      phone_number: req.body.phone_no,
    }),
    req.body.password,
    function (err, user) {
      if (err) {
        console.log(err);
      }
      passport.authenticate("local")(req, res, function () {
        res.redirect("/dashboard");
      });
    }
  );
});

// router.post("/register", (req, res) => {
//   const user = new User({
//     name: req.body.name,
//     matric_number: req.body.reg,
//     password: req.body.password,
//     email: req.body.email,
//     institution: req.body.institution,
//     session: req.body.session,
//     phone_number: req.body.phone_no,
//   });
//   user.save((err) => {
//     if (err) {
//       res.json({ message: err.message, type: "danger" });
//     } else {
//       req.session.message = {
//         type: "success",
//         message: "user add successfully",
//       };

//       res.redirect("/index");
//     }
//   });
// });
module.exports = router;
