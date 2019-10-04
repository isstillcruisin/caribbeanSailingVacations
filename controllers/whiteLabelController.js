const db = require("../models");
const jwt = require("jwt-simple");
const keys = require("../config/keys");

// Defining methods for the articleController
module.exports = {
  create: function(req, res) {
    const whiteLabel = {
      _id: req.body._id,
      name: req.body.name,
      _travelAgent: req.user._id,
      isConfirmed: true,
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
    .populate('yachts')
    .then((dbWhiteLabel) => {
      db.EBrochure.find({
        _whiteLabel: dbWhiteLabel._id
      })
      .then(dbEBrochures => {
        dbWhiteLabel.ebrochures = dbEBrochures;
        return res.json(dbWhiteLabel);
      })
      .catch(err => res.status(422).json(err));
    })
    .catch(err => res.status(422).json(err));
  },

  findAll: function(req, res) {
    db.WhiteLabel.find(req.query)
      .then(dbWhiteLabels => res.json(dbWhiteLabels))
      .catch(err => res.status(422).json(err));
  },

  findByCurrentTravelAgent: function(req, res) {
    if (!req.user) {
      return res.status(401)
    } 
    db.WhiteLabel.find({_travelAgent: req.user._id})
      .then(dbWhiteLabels => res.json(dbWhiteLabels))
      .catch(err => res.status(422).json(err));
  },
  
  update: function(req, res) {
    db.WhiteLabel.findOneAndUpdate({ _id: req.params.id }, req.body)
      .then(dbWhiteLabel => res.json(dbWhiteLabel))
      .catch(err => res.status(422).json(err));
  },

  getBoats: function(req, res) {
    db.WhiteLabel.findOne({
      name: req.params.name
    })
    .populate('yachts')
    .then((dbWhiteLabel) => {
      return res.json(dbWhiteLabel.yachts);
    })
    .catch((err) => {
      return res.status(422).json(err)
    });
  },
};
