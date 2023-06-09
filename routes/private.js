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
router.get("/users/:username", userController.show);
router.get("/users/random/:id", userController.random);
router.patch("/users/:id", userController.update);
router.delete("/users/:id", userController.destroy);
router.patch("/users/follow/:id", userController.addFollowing);
router.delete("/users/follow/:id", userController.removeFollowing);

//tweets
router.get("/tweets", tweetController.index);
router.get("/tweets/:username", tweetController.show);
router.post("/tweets/", tweetController.store);
router.patch("/tweets/:id", tweetController.update);
router.delete("/tweets/:id", tweetController.destroy);
router.patch("/tweets/like/:id", tweetController.like);
router.delete("/tweets/dislike/:id", tweetController.dislike);

module.exports = router;
