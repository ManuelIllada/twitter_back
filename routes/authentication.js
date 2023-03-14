const express = require("express");
const router = express.Router();

const authenticationController = require("../controllers/authenticationController");

router.post("/token", authenticationController.token);

module.exports = router;
