const Tweet = require("../models/Tweet");

async function showTweets(req, res) {
  const tweets = await Tweet.find();
  res.json(tweets);
}

module.exports = {
  showTweets,
};
