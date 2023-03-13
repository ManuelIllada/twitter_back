const Tweet = require("../models/Tweet");
const User = require("../models/User");

async function index(req, res) {
  const tweets = await Tweet.find();
  res.json(tweets);
}

async function show(req, res) {
  const tweet = await Tweet.findById(req.params.id);
  res.json(tweet);
}

async function store(req, res) {
  const user = await User.findById("63fc0a422b6e9606a49c2f47");
  const tweet = new Tweet({
    content: req.body.content,
    like: [],
    userId: user,
  });

  user.tweets.push(tweet);

  await user.save();
  await tweet.save();
  return res.json("The tweet has been created");
}

async function update(req, res) {
  const tweet = await Tweet.findByIdAndUpdate(req.params.id, {
    content: req.body.content,
  });
  res.json(tweet);
}

module.exports = {
  index,
  show,
  store,
  update,
};
