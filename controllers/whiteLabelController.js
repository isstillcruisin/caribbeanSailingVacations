const db = require('../models')
const { newWhiteLabelEmail } = require('../util/TransactionalMailer')
const Mailer = require('../routes/services/Mailer')

// Defining methods for the whiteLabelController
module.exports = {
  create: function (req, res) {
    const whiteLabel = {
      _id: req.body._id,
      name: req.body.name,
      _travelAgent: req.user._id,
      isConfirmed: true
    }
    db.WhiteLabel.create(whiteLabel)
      .then(dbWhiteLabel => {
        db.WhiteLabel.findOne({ _id: dbWhiteLabel._id })
          .populate('_travelAgent')
          .then(dbWhiteLabel2 => {
            db.User.find({ isAdmin: true })
              .then(dbAdminUsers => {
                newWhiteLabelEmail(dbWhiteLabel2, dbAdminUsers, () => {
                  res.json(dbWhiteLabel)
                })
                  .catch(err => res.status(422).json(err))
              })
              .catch(err => res.status(422).json(err))
          })
          .catch(err => res.status(422).json(err))
      })
      .catch(err => res.status(422).json(err))
  },

  findByName: function (req, res) {
    db.WhiteLabel.findOne({
      name: req.params.name
    })
      .populate('_travelAgent')
      .populate('yachts')
      .then((dbWhiteLabel) => {
        db.EBrochure.find({
          _whiteLabel: dbWhiteLabel._id
        })
          .then(dbEBrochures => {
            dbWhiteLabel.ebrochures = dbEBrochures
            return res.json(dbWhiteLabel)
          })
          .catch(err => res.status(422).json(err))
      })
      .catch(err => res.status(422).json(err))
  },

  findAll: function (req, res) {
    db.WhiteLabel.find(req.query)
      .populate('_travelAgent')
      .then(dbWhiteLabels => res.json(dbWhiteLabels))
      .catch(err => res.status(422).json(err))
  },

  findByCurrentTravelAgent: function (req, res) {
    if (!req.user) {
      return res.status(401)
    }
    db.WhiteLabel.find({ _travelAgent: req.user._id })
      .then(dbWhiteLabels => res.json(dbWhiteLabels))
      .catch(err => res.status(422).json(err))
  },

  update: function (req, res) {
    db.WhiteLabel.findOneAndUpdate({ _id: req.params.id }, req.body)
      .then(dbWhiteLabel => res.json(dbWhiteLabel))
      .catch(err => res.status(422).json(err))
  },

  getBoats: function (req, res) {
    db.WhiteLabel.findOne({
      name: req.params.name
    })
      .populate('yachts')
      .then((dbWhiteLabel) => {
        return res.json(dbWhiteLabel.yachts)
      })
      .catch((err) => {
        return res.status(422).json(err)
      })
  },

  sendContact: function (req, res) {
    db.WhiteLabel.findOne({
      _id: req.params.id
    })
      .populate('_travelAgent')
      .then(dbWhiteLabel => {
      // Send the contact email
        const ta = dbWhiteLabel._travelAgent
        const subject = `Contact Message: ${req.body.subject}`
        const body = `Dear ${dbWhiteLabel._travelAgent.firstName} ${dbWhiteLabel._travelAgent.lastName},\n\n` +
          `<br><br>You have received a message from ${req.body.firstName} ${req.body.lastName} (${req.body.email}).\n` +
          `<br>The message is:</br><pre>${req.body.message}</pre>`
        const mailer = new Mailer(
          subject,
          [{ email: ta.email }],
          body,
          { email: req.body.email, name: `${req.body.firstName} ${req.body.lastName}` }
        )
        mailer
          .send()
          .then(() => { res.status(200).send({ }) })
          .catch(error => console.error(error.toString()))
      })
  }
}
