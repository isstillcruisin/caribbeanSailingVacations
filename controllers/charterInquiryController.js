const db = require("../models");
const jwt = require("jwt-simple");
const Mailer = require("../routes/services/Mailer");
const moment = require('moment');
const {ORIENTATION_PDF_URL} = require('../util/constants');

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
      estimatedPrice: req.body.estimatedPrice,
      numberOfPassengers: req.body.numberOfPassengers,
      confirmed: false,
      sentPreferencesEmail: false,
      sentOrientationEmail: false,
      _whiteLabel: req.body.eBrochure._whiteLabel._id,
      _eBrochure: req.body.eBrochure._id,
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
        .populate('_eBrochure')
        .populate('_yacht')
        .then((dbCharterInquiries) => {
          const [confirmed, unconfirmed] =
            dbCharterInquiries.reduce((result, element) => {
              result[element.confirmed ?  0 : 1].push(element); // Determine and push to small/large arr
              return result;
            },
            [[], []]);      
          res.json({ confirmed, unconfirmed, archived: [] })
        })
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
      let ta = dbCharterInquiry._whiteLabel._travelAgent,
        subject = 'Yacht Charter Orientation', 
        mailer = new Mailer(
          subject,
          [{email: dbCharterInquiry.email}], 
          `Dear ${dbCharterInquiry.firstName} ${dbCharterInquiry.lastName},\n\n` + 
          '<br><br>Congratulations on your scheduled Yacht Charter! \n'+
          `<br>Please download and read the material in this orientation PDF:\n ${ORIENTATION_PDF_URL}` + 
          `<br><br>Thanks,<br><br>${ta.firstName} ${ta.lastName}` +
          `<br><br>${ta.email}</br></br>`
        );
        mailer
          .send()
          .then(() => {res.status(200).send({ })})
          .catch(error => console.error(error.toString()));
    });
  },

  confirm: function(req, res) {
    db.CharterInquiry.findOneAndUpdate(
      { _id: req.params.id }, 
      { confirmed: true }
    )
    .populate({
      path: '_whiteLabel',
      populate: { path: '_travelAgent' }
    })
    .populate('_yacht')
    .then((dbCharterInquiry) => { 
      ta = dbCharterInquiry._whiteLabel._travelAgent,
        subject = 'Yacht Charter Confirmed', 
        mailer = new Mailer(
          subject,
          [{email: dbCharterInquiry.email}], 
          `Dear ${dbCharterInquiry.firstName} ${dbCharterInquiry.lastName},` + 
          `<br><br>Congratulations! The dates you requested have been reserved and all parties have signed the contract!</br></br>` +
          `<br>Yacht: ${dbCharterInquiry._yacht.boatName}</br>` +
          `<br>Dates: ${moment(dbCharterInquiry.startDate).format('LL')} - ${moment(dbCharterInquiry.endDate).format('LL')}` +
          `<br><br>Thanks,<br><br>${ta.firstName} ${ta.lastName}`
        )
        mailer
          .send()
          .then(() => {res.status(200).send({ })})
          .catch(error => console.error(error.toString()));
    });
  },
};