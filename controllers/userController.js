const User = require("../models/User");
const Tweet = require("../models/Tweet");
const { faker } = require("@faker-js/faker");
const { options } = require("../routes/userRoutes");
const { format, formatDistance } = require("date-fns");
const { en } = require("date-fns/locale");

//Vista de un perfil
async function show(req, res) {
  const today = new Date();
  const user = await User.findById(req.user.id)
    .populate({
      path: "tweets",
      options: { sort: { createdAt: -1 } },
    })
    .populate("following")
    .populate("follower");
  const tweets = [];
  const usersRandom = [];
  const usersTotal = await User.find();
  const users = await User.find({ _id: { $nin: user.following } });
  for (let index = 0; index < 5; index++) {
    const randomNumber = faker.datatype.number({ min: 0, max: users.length - 1 });
    const isInRandom = usersRandom.some((u) => u.id === users[randomNumber].id);
    const isMe = users[randomNumber].id === user.id;
    if (!isInRandom && !isMe) {
      usersRandom.push(users[randomNumber]);
    } else if (user.following.length + 1 + usersRandom.length === usersTotal.length) {
    } else {
      index = index - 1;
    }
  }
  for (let tweet of user.tweets) {
    tweets.push(await Tweet.findById(tweet).populate("like"));
  }

  res.render("pages/perfil", { user, tweets, usersRandom, format, en, formatDistance, today });
}

//Seguir un usuarios
async function follow(req, res) {}

//Postear un tweet
async function post(req, res) {
  const user = await User.findById(req.user);
  const tweet = new Tweet({
    content: req.body.tweet,
    // date: today,
    like: [],
    userId: user._id,
  });

  user.tweets.push(tweet);

  await user.save();
  await tweet.save();
  return res.redirect("/");
}

//Logout
async function logout(req, res) {}

//Vista de tus seguidos y seguidoras
async function follower(req, res) {
  const user = await User.findById(req.user.id).populate("following").populate("follower");
  const usersRandom = [];
  const usersTotal = await User.find();
  const users = await User.find({ _id: { $nin: user.following } });
  for (let index = 0; index < 5; index++) {
    const randomNumber = faker.datatype.number({ min: 0, max: users.length - 1 });
    const isInRandom = usersRandom.some((u) => u.id === users[randomNumber].id);
    const isMe = users[randomNumber].id === user.id;
    if (!isInRandom && !isMe) {
      usersRandom.push(users[randomNumber]);
    } else if (user.following.length + 1 + usersRandom.length === usersTotal.length) {
    } else {
      index = index - 1;
    }
  }
  res.render("pages/follower", { user, usersRandom });
}
async function following(req, res) {
  const user = await User.findById(req.user.id).populate("following").populate("follower");
  const usersRandom = [];
  const usersTotal = await User.find();
  const users = await User.find({ _id: { $nin: user.following } });
  for (let index = 0; index < 5; index++) {
    const randomNumber = faker.datatype.number({ min: 0, max: users.length - 1 });
    const isInRandom = usersRandom.some((u) => u.id === users[randomNumber].id);
    const isMe = users[randomNumber].id === user.id;
    if (!isInRandom && !isMe) {
      usersRandom.push(users[randomNumber]);
    } else if (user.following.length + 1 + usersRandom.length === usersTotal.length) {
    } else {
      index = index - 1;
    }
  }
  res.render("pages/following", { user, usersRandom });
}

async function addFollowing(req, res) {
  const userId = req.user.id;
  const followingId = req.params.id;
  await User.findByIdAndUpdate(userId, {
    $push: { following: followingId },
  });
  await User.findByIdAndUpdate(followingId, {
    $push: { follower: userId },
  });
  return res.redirect("back");
}

async function removeFollowing(req, res) {
  const userId = req.user.id;
  const followingId = req.params.id;
  await User.findByIdAndUpdate(userId, {
    $pull: { following: followingId },
  });
  await User.findByIdAndUpdate(followingId, {
    $pull: { follower: userId },
  });
  return res.redirect("back");
}

//Borrar un tweet
async function deleteTweet(req, res) {
  const userId = req.user.id;
  const tweetId = req.params.id;
  await Tweet.findByIdAndDelete(tweetId);
  await User.findByIdAndUpdate(userId, {
    $pull: { tweets: tweetId },
  });
  res.redirect("/usuarios/perfil");
}

//Likear un tweet
async function like(req, res) {
  const userId = req.user.id;
  const tweetId = req.params.id;
  await Tweet.findByIdAndUpdate(tweetId, {
    $push: { like: userId },
  });
  return res.redirect("back");
}
async function disLike(req, res) {
  const userId = req.user.id;
  const tweetId = req.params.id;
  await Tweet.findByIdAndUpdate(tweetId, {
    $pull: { like: userId },
  });
  res.redirect("back");
}

async function tokens(req, res) {
  const user = await User.findOne({ where: { email: req.body.email } });
  if (user) {
    const match = await user.isValidPassword(req.body.password);
    if (match) {
      const token = jwt.sign({ sub: user.id }, process.env.JWT_SECRET);
      return res.json({ token: token });
    }
  }
  res.send("hola");
}

module.exports = {
  show,
  follow,
  post,
  logout,
  follower,
  following,
  deleteTweet,
  like,
  disLike,
  addFollowing,
  removeFollowing,
  tokens,
};
