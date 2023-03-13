const mongoose = require("mongoose");
const User = require("../models/User");
const passport = require("passport");
const formidable = require("formidable");
const bcrypt = require("bcryptjs");
//Vista del login
async function index(req, res) {
  return res.render("pages/login");
}
//Post del login
const access = passport.authenticate("local", {
  successRedirect: "/",
  failureRedirect: "/login",
});

//Vista del register
async function indexReg(req, res) {
  return res.render("pages/signup");
}
function logout(req, res) {
  req.logout((err) => {
    if (err) throw err;
    return res.redirect("/login");
  });
}
//Post del register
async function register(req, res) {
  const form = formidable({
    multiples: true,
    uploadDir: __dirname + "/../public/img",
    keepExtensions: true,
  });

  form.parse(req, async (err, fields, files) => {
    const passwordParaHashear = fields.password;
    const passwordHasheado = await bcrypt.hash(passwordParaHashear, 10);
    const { firstname, lastname, email, username, password } = fields;
    await User.create({
      firstname,
      lastname,
      email,
      username,
      password: passwordHasheado,
      image: files.image.newFilename,
    });

    res.redirect("/");
  });
}

module.exports = { index, access, indexReg, register, logout };
