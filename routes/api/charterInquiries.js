const router = require("express").Router();
const charterInquiryController = require("../../controllers/charterInquiryController");

// Matches with "/api/charterinquiries"
router.route("/")
  .post(charterInquiryController.create);

router.route("/:whiteLabelName/")
  .get(charterInquiryController.findByWhiteLabel)

  
module.exports = router;
