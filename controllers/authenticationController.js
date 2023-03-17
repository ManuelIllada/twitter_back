const jwt = require("jsonwebtoken");
const User = require("../models/User");
const formidable = require("formidable");
const bcrypt = require("bcryptjs");

async function token(req, res) {
  try {
    const user = await User.findOne({ email: req.body.email });
    const password = req.body.password;
    const match = await user.comparePassword(password);
    if (match) {
      const token = jwt.sign({ id: user._id }, process.env.SESSION_SECRET);
      return res.json({
        token: token,
        username: user.username,
        email: user.email,
        firstname: user.firstname,
        lastname: user.lastname,
        id: user._id,
        image: user.image,
      });
    } else {
      res.status(400).json({ error: "Usuario no válido" });
    }
  } catch (error) {
    console.log("No se encontró usuario");
    console.log(error);
    res.status(400).json({ error: "Usuario no válido" });
  }
}

async function store(req, res) {
  const form = formidable({
    multiples: true,
    uploadDir: __dirname + "/../public/img",
    keepExtensions: true,
  });

  form.parse(req, async function (err, fields, files) {
    const passwordParaHashear = fields.password;
    const passwordHasheado = await bcrypt.hash(passwordParaHashear, 10);
    const { firstname, lastname, email, username } = fields;
    const newUser = await User.create({
      firstname,
      lastname,
      email,
      username,
      password: passwordHasheado,
      image: files.image,
    });
    return res.json(newUser);
  });
}

module.exports = {
  token,
  store,
};
