const passport = require("passport");
const express = require("express");
const router = express.Router();
const authController = require("../controllers/authCotroller");

/**
 * Se sugiere usar este archivo para crear rutas relativas al proceso de
 * autenticación. Ejemplos: "/login" y "/logout".
 */
// app.use("/login", authController);
//app.use("/logout", authController);
module.exports = router;
