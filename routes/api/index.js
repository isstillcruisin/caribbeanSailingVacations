const router = require('express').Router()
const boatRoutes = require('./boats')
const userRoutes = require('./users')
const whiteLabelRoutes = require('./whiteLabels')
const charterInquiryRoutes = require('./charterInquiries')
const eBrochureRoutes = require('./ebrochures')

router.use('/boats', boatRoutes)
router.use('/users', userRoutes)
router.use('/whitelabels', whiteLabelRoutes)
router.use('/charterinquiries', charterInquiryRoutes)
router.use('/ebrochures', eBrochureRoutes)

module.exports = router
