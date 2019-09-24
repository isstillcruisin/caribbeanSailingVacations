const router = require("express").Router();
const eBrochureController = require("../../controllers/eBrochureController");

router.route("/:id")
  .get(eBrochureController.findById);

router.route("/:id/boats")
  .get(eBrochureController.getBoats);

module.exports = router;
