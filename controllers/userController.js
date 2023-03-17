const User = require("../models/User");
const formidable = require("formidable");
const bcrypt = require("bcryptjs");
const Tweet = require("../models/Tweet");
const { faker } = require("@faker-js/faker");

async function index(req, res) {
  const users = await User.find();
  res.json(users);
}
async function show(req, res) {
  const user = await User.find({ username: req.params.username })
    .populate("tweets")
    .populate("following")
    .populate("follower");
  res.json(user);
}

async function random(req, res) {
  const user = await User.findById(req.auth.id)
    .populate({
      path: "tweets",
      options: { sort: { createdAt: -1 } },
    })
    .populate("following")
    .populate("follower");
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
  res.json(usersRandom);
}

async function update(req, res) {
  const user = await User.findByIdAndUpdate(req.params.id, {
    firstname: req.body.firstname,
    lastname: req.body.lastname,
  });
  res.json(user);
}
async function destroy(req, res) {
  const user = await User.findById(req.params.id);
  await User.findByIdAndDelete(user);
  await Tweet.deleteMany({ userId: req.params.id });
  res.json(user);
}

async function addFollowing(req, res) {
  const userId = req.auth.id;
  const followingId = req.params.id;
  await User.findByIdAndUpdate(userId, {
    $push: { following: followingId },
  });
  await User.findByIdAndUpdate(followingId, {
    $push: { follower: userId },
  });
  return res.json("Add new following");
}

async function removeFollowing(req, res) {
  const userId = req.auth.id;
  const followingId = req.params.id;
  await User.findByIdAndUpdate(userId, {
    $pull: { following: followingId },
  });
  await User.findByIdAndUpdate(followingId, {
    $pull: { follower: userId },
  });
  return res.json("Remove following");
}

module.exports = {
  index,
  show,
  random,
  update,
  destroy,
  addFollowing,
  removeFollowing,
};
