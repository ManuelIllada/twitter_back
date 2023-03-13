const User = require("../models/User");

async function index(req, res) {
  const users = await User.find();
  res.json(users);
}
async function show(req, res) {
  const user = await User.findById(req.params.id);
  res.json(user);
}

module.exports = {
  index,
  show,
};
