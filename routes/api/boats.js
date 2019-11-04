const router = require('express').Router()
const boatController = require('../../controllers/boatController')

// Matches with "/api/boats"
router.route('/')
  .get(boatController.findAll)
  .post(boatController.create)

// Matches with "/api/boats/:id"
router
  .route('/:id')
  .get(boatController.findById)
  .put(boatController.update)
  .delete(boatController.remove)

router
  .route('/unavailable/:id')
  .get(boatController.unavailableDateRanges)
  .post(boatController.addUnavailableDateRange)

router
  .route('/unavailable/:id/delete')
  .post(boatController.deleteUnavailableDateRange)

router
  .route('/unavailable/:id/refresh')
  .get(boatController.refreshAvailability)
module.exports = router
