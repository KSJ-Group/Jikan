const axios = require("axios");
const path = require("path");
const fs = require("fs");

let alarms: string[] = [];
fs.readdir("public/Alarm Tones", function (err, files) {
  if (err) {
    return console.log("Unable to scan directory: " + err);
  }
  files.forEach(function (file: string) {
    alarms.push(file);
  });
});

export default function handler(req, res) {
  setTimeout(() => {
    res.send(alarms);
  }, 100);
}
