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

async function store(req, res) {
  const form = formidable({
    multiples: true,
    uploadDir: __dirname + "/../public/img",
    keepExtensions: true,
  });

  form.parse(req, async (err, fields, files) => {
    const passwordParaHashear = fields.password;
    const passwordHasheado = await bcrypt.hash(passwordParaHashear, 10);
    const { firstname, lastname, email, username } = fields;
    await User.create({
      firstname,
      lastname,
      email,
      username,
      password: passwordHasheado,
      image: files.image.newFilename,
    });
  });
  res.json("json de nuevo user");
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
  store,
  update,
  destroy,
  token,
};
