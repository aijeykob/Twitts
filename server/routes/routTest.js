const express = require('express');
const testController = require('../controllers/testController')
const testRouter = express.Router();
testRouter.get('/api/testCheck', testController.test)
module.exports = testRouter;