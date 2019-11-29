const Tweet = require('../models/twitts')
const cron = require('node-cron');
const { apiclient } = require('../twitterkeys')
let cronLo = null;
let cronLa = null;
let cronRa = null;
let cronTxt = '';
let cronTime = null;

const testFunc = async function () {

  const params = {
    q: `${cronTxt}`,
    geocode: `${cronLa},${cronLo},${cronRa}`
  };
  console.log(cronTxt)

  try {
    await apiclient
      .get('search/tweets', params)
      .then(timeline => {
        if (timeline.data.statuses.length > 0) {
          Tweet.deleteMany({ __v: 0 }, function (err) {
            if (err) console.log(err);
            console.log("Successful deletion");
          });
        }
        timeline.data.statuses.map((el) => {

          const tweet = new Tweet({
            authorName: el.user.screen_name,
            authorImg: el.user.profile_image_url,
            tweetText: el.text,
            tweetId: el.id_str,
            dataCreated: el.created_at
          });

          tweet.save(function (err) {
            if (err) return console.log(err);

          });
        })
      })
  }
  catch (err) {
    console.log(err)
  }

}
let task = cron.schedule(`*/${cronTime} * * * * `, async function () {
  testFunc()
});
task.stop();


exports.test = async function (req, res) {
  cronLa = req.query.la
  cronLo = req.query.lo
  cronRa = req.query.ra + 'km';

  (req.query.searchText == "undefined") ? cronTxt = '' : cronTxt = req.query.searchText;

  cronTime = Number(req.query.timeCron)
  if (cronTime == 0) {
    task.stop()
    console.log('stop')
  } else {
    task.start()
    console.log('start' + cronTime)
  }
  try {
    await testFunc()
    await Tweet.find({}, function (err, tweets) {

      if (err) return console.log(err);
      res.send(tweets);
    });
  }
  catch (err) {
    console.log(err)
  }

};