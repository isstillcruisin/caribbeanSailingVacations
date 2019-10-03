const router = require("express").Router();
const userController = require("../../controllers/authentication");

router.route("/signin").post(userController.signin);

router.route("/signup").post(userController.signup);

router.route("/confirmation/:id").get(userController.confirm);

router.route("/current").get(userController.currentUser);

module.exports = router;
