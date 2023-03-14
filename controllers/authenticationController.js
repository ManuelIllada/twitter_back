const jwt = require("jsonwebtoken");
const User = require("../models/User");
const formidable = require("formidable");
const bcrypt = require("bcryptjs");

async function getToken(req, res) {
  try {
    const user = await User.findOne({ email: req.body.email });
    console.log(user);
    const password = req.body.password;
    const match = await user.comparePassword(password);
    if (match) {
      const token = jwt.sign(
        { email: req.body.email, password: req.body.password },
        process.env.SESSION_SECRET,
      );
      return res.json({
        token: token,
        username: user.username,
        email: user.email,
        firstanme: user.firstname,
        lastname: user.lastname,
        id: user._id,
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
    console.log("ok");
    const passwordHasheado = await bcrypt.hash(passwordParaHashear, 10);
    const { firstname, lastname, email, username } = fields;
    const newUser = await User.create({
      firstname,
      lastname,
      email,
      username,
      password: passwordHasheado,
      image: "1.jpg",
    });
    console.log(newUser);
    return res.json("json de nuevo user");
  });
}

module.exports = {
  getToken,
  store,
};
