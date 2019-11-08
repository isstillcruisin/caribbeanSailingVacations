const db = require('../models')
const fetch = require('node-fetch')
const keys = require('../config/keys')

// Defining methods for the articleController
module.exports = {
  findAll: function (req, res) {
    db.Boat.find(req.query)
      .sort({ date: -1 })
      .then(dbBoat => res.json(dbBoat))
      .catch(err => res.status(422).json(err))
  },
  findById: function (req, res) {
    db.Boat.findById(req.params.id)
      .then(dbBoat => res.json(dbBoat))
      .catch(err => res.status(404).json(err))
  },
  create: function (req, res) {
    const boat = {
      _id: req.body._id,
      boatName: req.body.boatName,
      imgs: req.body.imgs,
      year: req.body.year,
      maxPassengers: req.body.maxPassengers,
      manufacture: req.body.manufacture,
      crewBio: req.body.crewBio,
      pricePerWeek: req.body.pricePerWeek,
      cyaId: req.body.cyaId
    }
    if (!(req.user && req.user.isAdmin)) {
      return res.status(401).json('Unauthorized')
    }

    db.Boat.create(boat)
      .then(dbBoat => res.json(dbBoat))
      .catch(err => res.status(422).json(err))
  },
  update: function (req, res) {
    db.Boat.findOneAndUpdate({ _id: req.params.id }, req.body)
      .then(dbBoat => res.json(dbBoat))
      .catch(err => res.status(422).json(err))
  },
  remove: function (req, res) {
    db.Boat.findById({ _id: req.params.id })
      .then(dbBoat => dbBoat.remove())
      .then(dbBoat => res.json(dbBoat))
      .catch(err => res.status(422).json(err))
  },
  unavailableDateRanges: function (req, res) {
    db.UnavailableDateRange.find({ _yacht: { _id: req.params.id } })
      .then(dbRanges => res.json(dbRanges))
      .catch(err => res.status(422).json(err))
  },
  refreshAvailability: function (req, res) {
    db.Boat.findById({ _id: req.params.id })
      .then(dbBoat => {
        fetch(`https://www.centralyachtagent.com/snapins/json-calendar.php?idin=${dbBoat.cyaId}&user=${keys.cyaUserId}`)
          .then(response => response.json())
          .then(data => {
            if (data.calendar.yachtName === 'No Results') {
              db.UnavailableDateRange.deleteMany({ _yacht: { _id: req.params.id }, type: 'CYA' })
                .then((dbDeleted) => {
                  db.UnavailableDateRange.find({ _yacht: { _id: req.params.id } })
                    .then(dbRanges => {
                      res.json(dbRanges)
                    })
                })
            } else {
              const unavailableDateRanges = data.calendar.map(range => {
                return {
                  _yacht: req.params.id,
                  from: new Date(range.yachtStartDate),
                  to: new Date(range.yachtEndDate),
                  description: range.yachtBookDesc,
                  type: 'CYA'
                }
              })
              db.UnavailableDateRange.deleteMany({ _yacht: { _id: req.params.id }, type: 'CYA' })
                .then((dbDeleted) => {
                  db.UnavailableDateRange.create(unavailableDateRanges)
                    .then((dbCreated) => {
                      db.UnavailableDateRange.find({ _yacht: { _id: req.params.id } })
                        .then(dbRanges => res.json(dbRanges))
                        .catch(err => res.status(422).json(err))
                    })
                    .catch(err => res.status(422).json(err))
                })
                .catch(err => res.status(422).json(err))
            }
          })
          .catch(err => res.status(422).json(err))
      })
      .catch(err => res.status(422).json(err))
  },
  addUnavailableDateRange: function (req, res) {
    const range = {
      _yacht: req.params.id,
      from: req.body.from,
      to: req.body.to,
      description: 'Administrator added',
      type: 'Admin'
    }
    db.UnavailableDateRange.create(range)
      .then(() => {
        db.UnavailableDateRange.find({ _yacht: { _id: req.params.id } })
          .then(dbRanges => res.json(dbRanges))
          .catch(err => res.status(422).json(err))
      })
      .catch(err => res.status(422).json(err))
  },
  deleteUnavailableDateRange: function (req, res) {
    const range = {
      _yacht: req.params.id,
      from: req.body.from,
      to: req.body.to
    }
    db.UnavailableDateRange.findOneAndRemove(range)
      .then(() => {
        db.UnavailableDateRange.find({ _yacht: { _id: req.params.id } })
          .then(dbRanges => res.json(dbRanges))
          .catch(err => res.status(422).json(err))
      })
      .catch(err => res.status(422).json(err))
  }
}
