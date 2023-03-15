const Tweet = require("../models/Tweet");
const User = require("../models/User");

async function index(req, res) {
  const tweets = [];
  const user = await User.findById(req.auth.id).populate("following");
  for (let index = 0; index < user.following.length; index++) {
    const userfollow = await User.findById(user.following[index]).populate({
      path: "tweets",
      options: { sort: { createdAt: -1 } },
    });
    for (let tweet of userfollow.tweets) {
      tweets.push(
        await Tweet.findById(tweet).populate("content").populate("userId").populate("like"),
      );
    }
  }
  res.json(tweets);
}

async function show(req, res) {
  const tweet = await Tweet.find({ userId: req.auth.id });
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
async function destroy(req, res) {
  const user = await User.findById("63fc0a422b6e9606a49c2f47");
  const tweet = req.params.id;
  await Tweet.findByIdAndDelete(tweet);
  await User.findByIdAndUpdate(user, {
    $pull: { tweets: tweet },
  });
  res.json(user);
}

module.exports = {
  index,
  show,
  store,
  update,
  destroy,
};
