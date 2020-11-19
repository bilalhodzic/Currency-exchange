const express = require("express");
const bodyParser = require("body-parser");

const port = 3000;
const app = express();

app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("Hello world");
});

app.listen(port, (err) => {
  if (err) return console.log(err.message);
  console.log(`App running on http://localhost:${port}`);
});
