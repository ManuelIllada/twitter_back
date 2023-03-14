const jwt = require("jsonwebtoken");
const User = require("../models/User");

async function token(req, res) {
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

module.exports = {
  token,
};
