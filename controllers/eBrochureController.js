const db = require('../models')
const keys = require('../config/keys')
const Mailer = require('../routes/services/Mailer')
const { doesADateRangeOverlap } = require('../util/tools')
module.exports = {
  create: function (req, res) {
    const eBrochure = {
      _id: req.body._id,
      name: req.body.name,
      _whiteLabel: req.params.id,
      _travelAgent: req.user,
      yachts: []
    }
    db.WhiteLabel.findOne({
      _id: req.params.id
    })
      .populate('_travelAgent')
      .then(dbWhiteLabel => {
        if (req.user && req.user.id === dbWhiteLabel._travelAgent._id.toString()) {
          db.EBrochure.create(eBrochure)
            .then(dbEBrochure => res.json(dbEBrochure))
            .catch(err => res.status(422).json(err))
        } else {
          return res.status(401).json('Unauthorized')
        }
      })
  },

  findById: function (req, res) {
    db.EBrochure.findOne({
      _id: req.params.id
    })
      .populate({
        path: '_whiteLabel',
        populate: { path: '_travelAgent' }
      })
      .populate('yachts')
      .then((dbEBrochure) => {
        return res.json(dbEBrochure)
      }).catch((err) => {
        return res.status(422).json(err)
      })
  },

  getBoats: function (req, res) {
    db.EBrochure.findOne({
      _id: req.params.id
    })
      .populate('yachts')
      .then((dbEBrochure) => {
        return res.json(dbEBrochure.yachts)
      })
      .catch((err) => {
        return res.status(422).json(err)
      })
  },

  update: function (req, res) {
    const updates = Object.assign({}, req.body)
    // NOTE: the yachts param has been JSON stringified
    if (updates.yachts) { updates.yachts = JSON.parse(updates.yachts) }

    db.EBrochure.findOneAndUpdate({ _id: req.params.id }, updates)
      .then(dbEBrochure => res.json(dbEBrochure))
      .catch(err => res.status(422).json(err))
  },

  sendToRecipient: function (req, res) {
    db.EBrochure.findOne({
      _id: req.params.id
    }).populate({
      path: '_whiteLabel',
      populate: { path: '_travelAgent' }
    })
      .then((dbEBrochure) => {
      // Send the eBrochure link via email
        const ta = dbEBrochure._whiteLabel._travelAgent
        const subject = req.body.subject
        const body = `Dear ${req.body.firstName} ${req.body.lastName},\n\n` +
          `<br>${req.body.message}\n\n` +
          `<br>Click here for more details: ${keys.clientRootURL}/e-brochure/${req.params.id}` +
          '<br>Thanks,' +
          `<br>${ta.firstName} ${ta.lastName}` +
          `<br>${ta.email}` +
          `<br>${ta.phoneNumber}`
        const mailer = new Mailer(
          subject,
          [{ email: req.body.email }],
          body,
          { email: ta.email, name: `${ta.firstName} ${ta.lastName}` }
        )
        mailer
          .send()
          .then(() => { res.status(200).send({ }) })
          .catch(error => console.error(error.toString()))
      })
      .catch(err => res.status(422).json(err))
  },
  findAvailableYachts: function (req, res) {
    // MHATODO: Refresh availability first?
    const availableYachts = []
    const startDate = new Date(req.body.startDate)
    const endDate = new Date(req.body.endDate)
    db.EBrochure.findOne({
      _id: req.params.id
    })
      .populate('yachts')
      .then(dbEBrochure => {
        const requests = dbEBrochure.yachts.map(yacht => {
          return new Promise(resolve => {
            db.UnavailableDateRange.find({ _yacht: { _id: yacht._id } })
              .then(dbDateRanges => {
                if (
                  req.body.numPassengers <= yacht.maxPassengers &&
                  !doesADateRangeOverlap(dbDateRanges, startDate, endDate)
                ) {
                  availableYachts.push(yacht)
                }
                resolve()
              })
              .catch(err => res.status(422).json(err))
          })
        })
        Promise.all(requests).then(() => {
          res.status(200).json({ yachts: availableYachts })
        })
      })
      .catch(err => res.status(422).json(err))
  }

}
