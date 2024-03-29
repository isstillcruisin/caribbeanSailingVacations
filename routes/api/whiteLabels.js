const router = require('express').Router()
const whiteLabelController = require('../../controllers/whiteLabelController')
const eBrochureController = require('../../controllers/eBrochureController')

// Matches with "/api/whitelabels"
router.route('/')
  .post(whiteLabelController.create)
  .get(whiteLabelController.findAll)

router.route('/update/:id')
  .post(whiteLabelController.update)

router.route('/forcurrentuser')
  .get(whiteLabelController.findByCurrentTravelAgent)

router.route('/:name')
  .get(whiteLabelController.findByName)

router.route('/:id/ebrochures/')
  .post(eBrochureController.create)

router.route('/:id/contact')
  .post(whiteLabelController.sendContact)

module.exports = router
