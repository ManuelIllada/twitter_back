const express = require("express");
const router = express.Router();
const pagesController = require("../controllers/pagesController");
const authController = require("../controllers/authCotroller");

router.get("/", pagesController.showHome);
router.get("/login", authController.index);
router.post("/signup", authController.register);
router.get("/login", authController.index);
router.post("/login", authController.access);
router.get("/logout", authController.logout);
router.get("/signup", authController.indexReg);

router.get("*", function (req, res) {
  res.status(404).render("pages/404");
});

module.exports = router;
