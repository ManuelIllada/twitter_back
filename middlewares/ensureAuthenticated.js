function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  } else {
    req.session.redirectTo = req.originalUrl;
    res.redirect("/login"); // Cambiar "/login" por la ruta a donde se quiere redirigir al usuario. También se puede dejar como está.
  }
}

module.exports = ensureAuthenticated;
