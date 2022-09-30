const { appendFile } = require("node:fs");
const http = require("node:http");
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const { MongoClient, ServerApiVersion } = require("mongodb");
const { stringify } = require("node:querystring");
var mongoose = require("mongoose");
var session = require("express-session");
var MongoStore = require("connect-mongo");
mongoose.connect(
  "mongodb://localhost/registrations",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err) => {
    if (!err) {
      console.log("MongoDB Connection Succeeded.");
    } else {
      console.log("Error in DB connection : " + err);
    }
  }
);
var db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {});

app.use(
  session({
    secret: "work hard",
    resave: true,
    saveUninitialized: false,
  })
);

var index = require("./routes/index");
app.use("/signup", index);
const port = 3000;

// Require static assets from public folder
app.use(express.static("public"));

// Set 'views' directory for any views
// being rendered res.render()
app.set("views", "views");

// Set view engine as EJS
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static("public"));
app.get("/", function (req, res) {
  res.render("talk");
});

app.post("/feedback", function (req, res) {
  var name = String(req.body.name);
  var feedback = String(req.body.issue);
  var email = String(req.body.email);
  console.log(req.body);
  res.redirect("/");
});

app.get("/checkout", (req, res) => {
  res.render("checkout");
});
app.get("/food", (req, res) => {
  res.render("food");
});
app.get("/electronics", (req, res) => {
  res.render("electronics");
});
app.get("/fashion", (req, res) => {
  res.render("fashion");
});

app.get("/search", (req, res) => {
  res.render("search");
});

app.listen(port, () => {
  console.log(`Server running at port http://localhost:${port}`);
});
