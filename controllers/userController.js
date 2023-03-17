const User = require("../models/User");
const formidable = require("formidable");
const bcrypt = require("bcryptjs");
const Tweet = require("../models/Tweet");

async function index(req, res) {
  const users = await User.find();
  res.json(users);
}
async function show(req, res) {
  const user = await User.find({ username: req.params.username }).populate("tweets");
  res.json(user);
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
  update,
  destroy,
  addFollowing,
  removeFollowing,
};
