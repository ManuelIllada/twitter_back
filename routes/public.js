const express = require("express");
const router = express.Router();

const authenticationController = require("../controllers/authenticationController");

router.post("/tokens", authenticationController.token);
router.post("/user", authenticationController.store);

module.exports = router;
