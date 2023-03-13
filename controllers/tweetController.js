const Tweet = require("../models/Tweet");

async function index(req, res) {
  const tweets = await Tweet.find();
  res.json(tweets);
}

module.exports = {
  index,
};
