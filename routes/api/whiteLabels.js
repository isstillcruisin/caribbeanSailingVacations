const router = require("express").Router();
const whiteLabelController = require("../../controllers/whiteLabelController");

// Matches with "/api/whitelabels"
router.route("/")
  .post(whiteLabelController.create);


module.exports = router;
