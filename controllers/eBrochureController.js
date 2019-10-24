const db = require("../models");
const jwt = require("jwt-simple");
const keys = require("../config/keys");
const Mailer = require("../routes/services/Mailer");
module.exports = {
  create: function(req, res) {
    const eBrochure = {
      _id: req.body._id,
      name: req.body.name,
      _whiteLabel: req.params.id,
      _travelAgent: req.user,
      yachts: [],
    }
    db.EBrochure.create(eBrochure)
      .then(dbEBrochure => res.json(dbEBrochure))
      .catch(err => res.status(422).json(err));
  },

  findById: function(req, res) {
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
    });
  },

  getBoats: function(req, res) {
    db.EBrochure.findOne({
      _id: req.params.id
    })
    .populate('yachts')
    .then((dbEBrochure) => {
      return res.json(dbEBrochure.yachts);
    })
    .catch((err) => {
      return res.status(422).json(err)
    });
  },

  update: function(req, res) {
    db.EBrochure.findOneAndUpdate({ _id: req.params.id }, req.body)
      .then(dbEBrochure => res.json(dbEBrochure))
      .catch(err => res.status(422).json(err));
  },

  sendToRecipient: function(req, res) {
    db.EBrochure.findOne({
      _id: req.params.id
    }).populate({
      path: '_whiteLabel',
      populate: { path: '_travelAgent' }
    })
    .then((dbEBrochure) => {
      // Send the eBrochure link via email
      const ta = dbEBrochure._whiteLabel._travelAgent,
        subject = req.body.subject,
        body = `Dear ${req.body.firstName} ${req.body.lastName},\n\n` + 
          `<br>${req.body.message}\n\n` +
          `<br>Click here for more details: ${keys.clientRootURL}/e-brochure/${req.params.id}` +
          `<br>Thanks,` +
          `<br>${ta.firstName} ${ta.lastName}` +
          `<br>${ta.email}` +
          `<br>${ta.phoneNumber}`,
        mailer = new Mailer(
          subject,
          [{email: req.body.email}], 
          body,
          {email: ta.email, name: `${ta.firstName} ${ta.lastName}`}
        );
        mailer
          .send()
          .then(() => {res.status(200).send({ })})
          .catch(error => console.error(error.toString()));
    })
    .catch(err => res.status(422).json(err));
  }

};
