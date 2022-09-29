const { appendFile } = require("node:fs");
const http = require("node:http");
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const { MongoClient, ServerApiVersion } = require("mongodb");
const mongoose = require("mongoose");
const { stringify } = require("node:querystring");

mongoose.connect("mongodb://localhost:27017/ProjectDB", {
  useNewUrlParser: true,
});
var conn = mongoose.connection;
app.use(express.static(__dirname + "/public"));
conn.on("connected", function () {
  console.log("database is connected successfully");
});
conn.on("disconnected", function () {
  console.log("database is disconnected successfully");
});
conn.on("error", console.error.bind(console, "connection error:"));

const FeedbackSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please check your data entry , no name specified!"],
  },
  email: String,
  feedback: String,
});

const Feedback = mongoose.model("Feedback", FeedbackSchema);

const feedback = new Feedback({
  name: "Lakshya",
  email: "abc@gmail.com",
  feedback: "Great experience",
});
// feedback.save();

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
  res.render("index");
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
app.get("/signup", (req, res) => {
  res.render("signup");
});
app.get("/search", (req, res) => {
  res.render("search");
});
app.listen(port, () => {
  console.log(`Server running at port ${port}`);
});
