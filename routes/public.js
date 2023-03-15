const express = require("express");
const router = express.Router();

const authenticationController = require("../controllers/authenticationController");

router.post("/tokens", authenticationController.getToken);
router.post("/users", authenticationController.store);

module.exports = router;
