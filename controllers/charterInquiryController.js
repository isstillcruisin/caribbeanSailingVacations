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

  findByWhiteLabel: function(req, res) {
    db.WhiteLabel.findOne({
      name: req.params.whiteLabelName
    })
    .populate('_travelAgent')
    .then((dbWhiteLabel) => {
      if (req.user.id === dbWhiteLabel._travelAgent._id.toString() || req.user.isAdmin) {
        db.CharterInquiry.find({
          _whiteLabel: dbWhiteLabel._id
        })
        .populate('_yacht')
        .then(dbCharterInquiry => res.json(dbCharterInquiry))
        .catch(err => res.status(422).json(err));
      } else {
        res.status(401).json("Unauthorized");
      }
    });
  },
};