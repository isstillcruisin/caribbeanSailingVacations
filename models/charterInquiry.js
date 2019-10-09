const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt-nodejs");
const db = require("../models");
const Mailer = require("../routes/services/Mailer");
const moment = require('moment');

const charterInquirySchema = new Schema({
  email: { type: String, lowercase: true },
  firstName: { type: String },
  lastName: { type: String },
  startDate: { type: Date },
  endDate: { type: Date },
  estimatedPrice: { type: Number },
  numberOfPassengers: { type: Number },
  confirmed: { type: Boolean },
  sentPreferencesEmail: { type: Boolean },
  sentOrientationEmail: { type: Boolean },
  _whiteLabel: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'WhiteLabel' },
  _yacht: { type:  mongoose.Schema.Types.ObjectId, required: true, ref: 'Boat' },
  _eBrochure: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'EBrochure' },
});

charterInquirySchema.post('save', function(charterInquiry, next) {
  charterInquiry.populate('_whiteLabel', function (err, _wl) {
    charterInquiry._whiteLabel.populate('_travelAgent', function (err, _ta) {
      charterInquiry.populate('_yacht', function(err, _ya) {
        if (err) console.log("**** ERR", err)
        else {
          //Send the email:
          const subject = 'Yacht Charter Inquiry', 
            ta = charterInquiry._whiteLabel._travelAgent,
            mailer = new Mailer(
              subject,
              [{email: ta.email}], 
              `Dear ${ta.firstName} ${ta.lastName}:` + 
              '<br>You have received the following Yacht Charter Inquiry:' +
              '<table>' +
              `<tr><td>Name:</td><td>${charterInquiry.firstName} ${charterInquiry.lastName}</td></tr>` +
              `<tr><td>Email:</td><td>${charterInquiry.email}</td></tr>` +
              `<tr><td>Yacht:</td><td>${charterInquiry._yacht.boatName}</td></tr>` +
              `<tr><td>Number of Passengers:</td><td>${charterInquiry.numberOfPassengers}</td></tr>` +
              `<tr><td>Dates:</td><td>${moment(charterInquiry.startDate).format('LL')} - ${moment(charterInquiry.endDate).format('LL')}</td></tr>` +
              `<tr><tr>Price Per Week:</td><td>${Number(charterInquiry._yacht.pricePerWeek).toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</td></tr>` +
              `<tr><tr>Estimated Price:</td><td>${Number(charterInquiry.estimatedPrice).toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</td></tr>` +
              '</table>'
            );
          mailer
            .send()
            .then(() => {next();})
            .catch(error => console.error(error.toString()));
        }
      });
    });
  });
});

const CharterInquiry = mongoose.model("CharterInquiry", charterInquirySchema);

// export model
module.exports = CharterInquiry;

