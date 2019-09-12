const db = require("../models");

// Defining methods for the articleController
module.exports = {
  create: function(req, res) {
    console.log("****** CREATING", req.body.whiteLabelName);
    console.log("*******", req);
    const whiteLabel = {
      _id: req.body._id,
      name: req.body.whiteLabelName
    };
    db.WhiteLabel.create(whiteLabel)
      .then(dbWhiteLabel => res.json(dbWhiteLabel))
      .catch(err => res.status(422).json(err));
  },
};
