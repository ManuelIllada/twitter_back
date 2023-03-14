const express = require("express");
const router = express.Router();
const { expressjwt: checkJwt } = require("express-jwt");

const userController = require("../controllers/userController");

router.get("/", userController.index);
router.get("/:id", userController.show);
router.post("/", userController.store);
router.patch("/:id", userController.update);
router.delete("/:id", userController.destroy);
router.post("/", userController.token);

module.exports = router;

checkJwt({ secret: "Un string secreto", algorithms: ["HS256"] });
