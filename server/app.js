const express = require('express');
const routes = require('./routes');
const path = require('path');
const bodyParser = require('body-parser')
const cors = require("cors");
const mongoose = require('mongoose');

function main() {
  let app = express();
  app.use(cors());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());
  app.use(express.static(path.join(__dirname, 'public')));
  app.use('/', routes);
  mongoose.connect(
    process.env.mongo,
    { useNewUrlParser: true, useUnifiedTopology: true },
    function (err) {
      if (err) return console.log(err);
      app.listen(3000, function () {
      });
    }
  );
}
main();
