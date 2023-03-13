const express = require("express");
const router = express.Router();
const pagesController = require("../controllers/pagesController");
const makeUserAvailableInViews = require("../middlewares/makeUserAvailableInViews");
const ensureAuthenticated = require("../middlewares/ensureAuthenticated");
const authController = require("../controllers/authCotroller");
router.use(makeUserAvailableInViews);

router.get("/", ensureAuthenticated, pagesController.showHome);
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
