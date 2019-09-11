const router = require("express").Router();
const whiteLabelController = require("../../controllers/whiteLabelController");

// Matches with "/api/white-labels"
router.route("/")
  .post(whiteLabelController.create);


module.exports = router;
