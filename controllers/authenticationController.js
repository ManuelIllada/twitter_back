const jwt = require("jsonwebtoken");

async function token(req, res) {
  const token = jwt.sign(
    { email: req.body.email, password: req.body.password },
    process.env.SESSION_SECRET,
  );
  return res.json({ token: token });
}

module.exports = {
  token,
};
