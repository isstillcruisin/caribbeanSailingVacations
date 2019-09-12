const db = require("../models");
const jwt = require("jwt-simple");
const keys = require("../config/keys");

// Defining methods for the articleController
module.exports = {
  create: function(req, res) {
    const whiteLabel = {
      _id: req.body._id,
      name: req.body.whiteLabelName,
      _travelAgent: jwt.decode(req.body.token, keys.sessionSecret).userid
    };
    db.WhiteLabel.create(whiteLabel)
      .then(dbWhiteLabel => res.json(dbWhiteLabel))
      .catch(err => res.status(422).json(err));
  },

  findByName: function(req, res) {
    db.WhiteLabel.findOne({
      name: req.params.name
    })
    .populate('_travelAgent')
    .then((dbWhiteLabel) => {
      return res.json(dbWhiteLabel);
    })
    .catch((err) => {
      return res.status(422).json(err)
    });
  },
  // update: function(req, res) {
  //   db.Boat.findOneAndUpdate({ _id: req.params.id }, req.body)
  //     .then(dbBoat => res.json(dbBoat))
  //     .catch(err => res.status(422).json(err));
  // },
  // remove: function(req, res) {
  //   db.Boat.findById({ _id: req.params.id })
  //     .then(dbBoat => dbBoat.remove())
  //     .then(dbBoat => res.json(dbBoat))
  //     .catch(err => res.status(422).json(err));
  // }
};
