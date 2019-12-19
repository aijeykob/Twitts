require('dotenv').config()
let jwt = require('jsonwebtoken');
let config = require('./config');
module.exports = class HandlerGenerator {
  login(req, res) {
    let username = req.body.username;
    let password = req.body.password;
    // For the given username fetch user from DB
    let mockedUsername = process.env.mocked_username;
    let mockedPassword = process.env.mocked_password;

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