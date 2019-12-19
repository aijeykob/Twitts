const routes = require('express').Router();
const Tweet = require('../models/twitts')
const middleware = require('../middleware');
const tweetRouter = require('./routTwitts')
const testRouter = require('./routTest')
const HandlerGenerator = require('../HandlerGenerator')
routes.get('/api/getTweets', function (req, res) {

  Tweet.find({}, function (err, tweets) {
    if (err) return console.log(err);
    res.send(tweets);
  })
})
let handlers = new HandlerGenerator();
routes.post('/api/login', handlers.login);
routes.get('/api/testCheck', middleware.checkToken, tweetRouter)
routes.get('/api/admin', middleware.checkToken, tweetRouter)
routes.use('/', middleware.checkToken, testRouter)

module.exports = routes;