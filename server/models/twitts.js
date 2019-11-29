const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const tweetScheme = new Schema(
  { authorName: String, authorImg: String, tweetText: String, tweetId: String, dataCreated: String }
);
module.exports = mongoose.model("Tweet", tweetScheme);