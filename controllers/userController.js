const User = require("../models/User");
const formidable = require("formidable");
const bcrypt = require("bcryptjs");
const Tweet = require("../models/Tweet");

async function index(req, res) {
  const users = await User.find();
  res.json(users);
}
async function show(req, res) {
  const user = await User.findById(req.params.id);
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

module.exports = {
  index,
  show,
  update,
  destroy,
};
