const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const cors = require("cors");

//router.use(cors);
router.get("/", userController.index);
router.get("/:id", userController.show);
router.post("/", userController.store);
router.patch("/:id", userController.update);
router.delete("/:id", userController.destroy);

module.exports = router;

// Middleware
//checkJwt({ secret: "Un string secreto", algorithms: ["HS256"] });
