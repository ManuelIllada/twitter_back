const express = require("express");
const router = express.Router();
const tweetController = require("../controllers/tweetController");
const cors = require("cors");

//router.use(cors);
router.get("/", tweetController.index);
router.get("/:id", tweetController.show);
router.post("/", tweetController.store);
router.patch("/:id", tweetController.update);
router.delete("/:id", tweetController.destroy);

module.exports = router;
