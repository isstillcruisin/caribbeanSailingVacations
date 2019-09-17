const db = require("../models");
const jwt = require("jwt-simple");
const keys = require("../config/keys");
const Mailer = require("../routes/services/Mailer");

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

  sendOrientationPacket: function(req, res) {
    db.CharterInquiry.findOne({
      _id: req.params.id
    })
    .populate({
      path: '_whiteLabel',
      populate: { path: '_travelAgent' }
    })
    .populate('_yacht')
    .then(dbCharterInquiry => {
      // Send the orientation email
      let formsUrl = 'https://charter-assistant.s3.amazonaws.com/Forms.zip'
        ta = dbCharterInquiry._whiteLabel._travelAgent,
        subject = 'Charter Orientation Packet', 
        mailer = new Mailer(
          subject,
          [{email: dbCharterInquiry.email}], 
          `Dear ${dbCharterInquiry.firstName} ${dbCharterInquiry.lastName},\n\n` + 
          '<br><br>Please download the following zip file: \n' + formsUrl + '.\n' +
          '<br>After you unzip it:<br> 1. Read through either \'Charter Orientation 2019.pdf\' or  \'Charter Orientation 2019.pages\'' +
          `<br>2. Fill out one of the three forms included (send email to ${ta.email} with any questions).` +
          `<br><br>Thanks,<br><br>${ta.firstName} ${ta.lastName}`
        );
        mailer
          .send()
          .then(() => {res.status(200).send({ })})
          .catch(error => console.error(error.toString()));
    });
  }
};