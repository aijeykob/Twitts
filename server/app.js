const express = require('express');
const path = require('path');
const bodyParser = require('body-parser')
const Tweet = require('./models/twitts')
const cors = require("cors");
const mongoose = require('mongoose');
let middleware = require('./middleware');
const tweetRouter = require('./routes/routTwitts')
const testRouter = require('./routes/routTest')
const HandlerGenerator = require('./HandlerGenerator')

function main() {
  let app = express();
  let handlers = new HandlerGenerator();

  app.use(cors());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());
  app.use(express.static(path.join(__dirname, 'public')));

  app.get('/api/getTweets', function (req, res) {

    Tweet.find({}, function (err, tweets) {
      if (err) return console.log(err);
      res.send(tweets);
    })
  })

  app.post('/api/login', handlers.login);
  app.get('/api/testCheck', middleware.checkToken, tweetRouter)
  app.get('/api/admin', middleware.checkToken, tweetRouter)
  app.use('/', middleware.checkToken, testRouter)

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
