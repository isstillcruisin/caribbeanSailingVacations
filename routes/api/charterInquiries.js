const router = require('express').Router()
const charterInquiryController = require('../../controllers/charterInquiryController')

// Matches with "/api/charterinquiries"
router.route('/')
  .post(charterInquiryController.create)

router.route('/orientation/:id')
  .get(charterInquiryController.sendOrientationPacket)

router.route('/:whiteLabelName/')
  .get(charterInquiryController.findByWhiteLabel)

router.route('/confirm/:id')
  .get(charterInquiryController.confirm)

module.exports = router
