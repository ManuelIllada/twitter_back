const User = require("../models/User");

async function index(req, res) {
  const users = await User.find();
  res.json(users);
}

module.exports = {
  index,
};
