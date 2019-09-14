const db = require("../models");
const jwt = require("jwt-simple");
const keys = require("../config/keys");

// Defining methods for the articleController
module.exports = {
  create: function(req, res) {
    const charterInquiry = {
      _id: req.body._id,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      startDate: req.body.startDate,
      endDate: req.body.endDate,
      email: req.body.email,
      _whiteLabel: req.body.whiteLabel._id,
      _yacht: req.body.yacht._id,
    }
    db.CharterInquiry.create(charterInquiry)
      .then(dbCharterInquiry => res.json(dbCharterInquiry))
      .catch(err => res.status(422).json(err));
  },
};