const router = require("express").Router();
const whiteLabelController = require("../../controllers/whiteLabelController");

// Matches with "/api/whitelabels"
router.route("/")
  .post(whiteLabelController.create)
  .get(whiteLabelController.findAll)

router.route("/update/:id")
  .post(whiteLabelController.update)

router.route('/:name')
  .get(whiteLabelController.findByName);
  
module.exports = router;
