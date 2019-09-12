const db = require("../models");

// Defining methods for the articleController
module.exports = {
  create: function(req, res) {
    const whiteLabel = {
      _id: req.body._id,
      name: req.body.whiteLabelName
    };
    db.WhiteLabel.create(whiteLabel)
      .then(dbWhiteLabel => res.json(dbWhiteLabel))
      .catch(err => res.status(422).json(err));
  },

  findByName: function(req, res) {
    console.log("Loading this one too");
    db.WhiteLabel.findOne({name: req.params.name})
      .then((dbWhiteLabel) => {
        console.log('****' + dbWhiteLabel + ' ' + req.params.name);
        return res.json(dbWhiteLabel);
      })
      .catch(err => res.status(422).json(err));
  },
};
