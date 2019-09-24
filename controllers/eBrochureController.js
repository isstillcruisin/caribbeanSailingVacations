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

};
