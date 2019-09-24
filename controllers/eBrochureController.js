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

};
