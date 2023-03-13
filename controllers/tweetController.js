const Tweet = require("../models/Tweet");

async function index(req, res) {
  const tweets = await Tweet.find();
  res.json(tweets);
}

async function show(req, res) {
  const tweet = await Tweet.findById(req.params.id);
  res.json(tweet);
}

module.exports = {
  index,
  show,
};
