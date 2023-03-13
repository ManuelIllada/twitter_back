const express = require("express");
const router = express.Router();
const tweetController = require("../controllers/tweetController");

router.get("/", tweetController.index);
router.get("/:id", tweetController.show);
router.post("/", tweetController.store);

module.exports = router;
