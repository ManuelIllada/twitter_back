const jwt = require("jsonwebtoken");
const User = require("../models/User");
const formidable = require("formidable");
const bcrypt = require("bcryptjs");
const path = require("path");
const fs = require("fs");

const { createClient } = require("@supabase/supabase-js");

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

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
    keepExtensions: true,
  });

  form.parse(req, async function (err, fields, files) {
    const ext = path.extname(files.image.filepath);
    console.log(ext);

    const newFileName = `image_${Date.now()}${ext}`;
    const { data, error } = await supabase.storage
      .from("img")
      .upload(newFileName, fs.createReadStream(files.image.filepath), {
        cacheControl: "3600",
        upsert: false,
        contentType: files.image.mimetype,
        duplex: "half",
      });

    const passwordParaHashear = fields.password;
    const passwordHasheado = await bcrypt.hash(passwordParaHashear, 10);
    const { firstname, lastname, email, username } = fields;
    if (
      (await User.find({ username: username })) !== null &&
      (await User.find({ email: email })) !== null
    ) {
      const newUser = await User.create({
        firstname,
        lastname,
        email,
        username,
        password: passwordHasheado,
        image: data.path,
      });
      return res.json(newUser);
    } else {
      return "error";
    }
  });
}

module.exports = {
  token,
  store,
};
