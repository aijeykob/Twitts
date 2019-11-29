const express = require('express');
const path = require('path');
const bodyParser = require('body-parser')
const Tweet = require('./models/twitts')
const cors = require("cors");
const mongoose = require('mongoose');
let jwt = require('jsonwebtoken');
let config = require('./config');
let middleware = require('./middleware');
const tweetRouter = require('./routes/routTwitts')
const testRouter = require('./routes/routTest')


class HandlerGenerator {

  login(req, res) {
    let username = req.body.username;
    let password = req.body.password;
    // For the given username fetch user from DB
    let mockedUsername = 'admin';
    let mockedPassword = 'password';

    if (username && password) {
      if (username === mockedUsername && password === mockedPassword) {
        console.log('inHendlerGenerator')
        let token = jwt.sign({ username: username },
          config.secret,
          {
            expiresIn: '24h' // expires in 24 hours
          }
        );
        // return the JWT token for the future API calls
        res.json({
          success: true,
          message: 'Authentication successful!',
          token: token
        });
      } else {
        res.send(403).json({
          success: false,
          message: 'Incorrect username or password'
        });
      }
    } else {
      res.send(400).json({
        success: false,
        message: 'Authentication failed! Please check the request'
      });
    }
  }
  index(req, res) {
    res.json({
      success: true,
      message: 'Index page'
    });
  }
}

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
    "mongodb://localhost:27017/usersdb",
    { useNewUrlParser: true, useUnifiedTopology: true },
    function (err) {
      if (err) return console.log(err);
      app.listen(3000, function () {
      });
    }
  );
}
main();
