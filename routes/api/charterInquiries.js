const router = require("express").Router();
const charterInquiryController = require("../../controllers/charterInquiryController");

// Matches with "/api/charterinquiries"
router.route("/")
  .post(charterInquiryController.create);
  
module.exports = router;
