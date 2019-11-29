exports.test = function (req, res) {
  console.log('in controller')
  res.json({
    success: true,
    message: 'Authentication successful!'
  })
};

