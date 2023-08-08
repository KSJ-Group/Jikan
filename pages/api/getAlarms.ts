const fs = require("fs");

let alarms: string[] = [];
fs.readdir("public", function (err, files) {
  if (err) {
    console.log("Unable to scan directory: " + err);
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
