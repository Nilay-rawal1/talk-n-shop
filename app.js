const { appendFile } = require("node:fs");
const http = require("node:http");
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const { MongoClient, ServerApiVersion } = require("mongodb");
const mongoose = require("mongoose");
const { stringify } = require("node:querystring");
const db = require("../database");

mongoose.connect("mongodb://localhost:27017/ProjectDB", {
  useNewUrlParser: true,
});
var conn = mongoose.connection;

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

const hostname = "127.0.0.1";
const port = 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/home", function (req, res) {
  res.sendFile(__dirname + "/public/index.html");
});

app.post("/feedback", function (req, res) {
  var name = String(req.body.name);
  var feedback = String(req.body.issue);
  var email = String(req.body.email);
  console.log(req.body);
  function myFunction(platform) {
    console.log(
      "Hi," + name + " Thanks For Your Feedback" + ".Welcome To " + platform
    );
  }
  setTimeout(myFunction, 6000, "Talknshop");
  res.redirect("/");
});

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
