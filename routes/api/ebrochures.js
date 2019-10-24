const router = require("express").Router();
const eBrochureController = require("../../controllers/eBrochureController");

router.route("/:id")
  .get(eBrochureController.findById);

router.route("/:id/boats")
  .get(eBrochureController.getBoats);

router.route("/update/:id")
  .post(eBrochureController.update);

router.route("/send/:id")
  .post(eBrochureController.sendToRecipient);

module.exports = router;
