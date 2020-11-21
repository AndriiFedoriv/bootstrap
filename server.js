// This is simple email sender by programming mentor
// Usage:
// Install deps: npm i express nodemailer body-parser
// Run: GMAIL=secondopto@gmail.com PASSWORD=123456789 node server.js

const express = require("express");
const nodemailer = require("nodemailer");

const bodyParser = require("body-parser");
const path = require("path");

const GMAIL = process.env.GMAIL;
const PASSWORD = process.env.PASSWORD;

console.log(GMAIL, PASSWORD);

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: GMAIL,
    pass: PASSWORD,
  },
});

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.resolve(__dirname, "public")));

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.post("/email/:address", (req, res) => {
  const mailOptions = {
    from: GMAIL,
    to: req.params.address,
    subject: "New email from form-sender",
    html: JSON.stringify(req.body),
  };
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.error(error);
      res.status(500).send("Server error");
    } else {
      console.log("Email sent: " + info.response);
      res.send(
        `Adress: ${req.params.address}, Data sent: ${JSON.stringify(req.body)}`
      );
    }
  });
});

console.log(
  "Server is running on",
  process.env.PORT || 3000,
  process.env.IP || "0.0.0.0"
);

app.listen(process.env.PORT || 3000, process.env.IP || "0.0.0.0");
