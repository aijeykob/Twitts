const express = require('express');
const tweetController = require('../controllers/tweetController')
const tweetRouter = express.Router();
tweetRouter.get('/api/admin', tweetController.test)
module.exports = tweetRouter;