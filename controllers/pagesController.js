const mongoose = require("mongoose");
const { faker } = require("@faker-js/faker");
const Tweet = require("../models/Tweet");
const User = require("../models/User");
const { format, formatDistance } = require("date-fns");
const { en } = require("date-fns/locale");
const { identity } = require("lodash");

//Vista principal de home
async function showHome(req, res) {
  const today = new Date();
  const id = req.user.id;
  const usermain = await User.findById(id).populate("following");
  const tweets = [];
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

  res.render("pages/home", {
    user,
    tweets,
    usermain,
    usersRandom,
    format,
    en,
    formatDistance,
    today,
  });
}
//404
async function show404(req, res) {
  res.status(404).render("pages/404");
}

// Otros handlers...
// ...

module.exports = {
  showHome,
  // showContact,
  // showAboutUs,
};
