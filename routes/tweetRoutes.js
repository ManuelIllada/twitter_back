const express = require("express");
const router = express.Router();
const tweetController = require("../controllers/tweetController");

router.get("/", tweetController.showTweets);

module.exports = router;
