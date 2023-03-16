const express = require("express");
const router = express.Router();
const tweetController = require("../controllers/tweetController");
const userController = require("../controllers/userController");
const cors = require("cors");
const { expressjwt: checkJwt } = require("express-jwt");

router.use(checkJwt({ secret: process.env.SESSION_SECRET, algorithms: ["HS256"] }));
//router.use(cors);
//users
router.get("/users/", userController.index);
router.get("/users/:id", userController.show);
router.patch("/users/:id", userController.update);
router.delete("/users/:id", userController.destroy);
//tweets
router.get("/tweets", tweetController.index);
router.get("/tweets/:username", tweetController.show);
router.post("/tweets/", tweetController.store);
router.patch("/tweets/:id", tweetController.update);
router.delete("/tweets/:id", tweetController.destroy);

module.exports = router;
