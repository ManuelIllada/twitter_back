const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const ensureAuthenticated = require("../middlewares/ensureAuthenticated");

router.use(ensureAuthenticated);
router.post("/tweet", userController.post);
router.get("/perfil", userController.show);
router.get("/like/:id", userController.like);
router.get("/dislike/:id", userController.disLike);
router.post("/logout", userController.logout);
router.get("/following", userController.following);
router.get("/follower", userController.follower);
router.get("/follows/add/:id", userController.addFollowing);
router.get("/follows/delete/:id", userController.removeFollowing);
router.get("/deletetweet/:id", userController.deleteTweet);

//router.post("/:id", userController.follow);
// router.get("/:username", userController.show);
// router.post("/", userController.store);
// router.get("/editar/:id", userController.edit);
// router.patch("/:id", userController.update);
// router.delete("/:id", userController.destroy);

module.exports = router;
