const mongoose = require("mongoose");
const db = require("../models");
const keys = require("../config/keys");
const constants = require('./constants');
const Mailer = require("../routes/services/Mailer");

async function sendPreferencesEmail(charterInquiryId, callback) {
  var id = new mongoose.Types.ObjectId(charterInquiryId);

  db.CharterInquiry.findById(id)
  .populate({
    path: '_whiteLabel',
    populate: { path: '_travelAgent' }
  })
  .populate('_yacht')
  .then(dbCharterInquiry => {
    // Send the preferences email
    const ta = dbCharterInquiry._whiteLabel._travelAgent,
      subject = 'Yacht Charter Preferences', 
      mailer = new Mailer(
        subject,
        [{email: dbCharterInquiry.email}], 
        `Dear ${dbCharterInquiry.firstName} ${dbCharterInquiry.lastName},\n\n` +
        '<br><br>Your Yacht Charter is coming up soon!! \n'+
        `<br>Please download and fill out this preferences form, as soon as possible:\n ${constants.PREFERENCES_PDF_URL}` +
        `<br><br>Thanks,<br><br>${ta.firstName} ${ta.lastName}` +
        `<br><br>${ta.email}</br></br>`
      );
      mailer
      .send()
      .then(() => {
        db.CharterInquiry.findOneAndUpdate({_id: id}, {sentPreferencesEmail: true})
        .then(() => {
          const subject2 = `Sent Yacht Charter Preferences To ${dbCharterInquiry.firstName} ${dbCharterInquiry.lastName}`, 
            mailer2 = new Mailer(
              subject2,
              [{email: ta.email}], 
              `Dear ${ta.firstName} ${ta.lastName},\n\n` +
              `<br><br>Charter Assistant has sent out a preferences form to ${dbCharterInquiry.firstName} ${dbCharterInquiry.lastName} \n` +
              `<br>If you don't hear from them soon, you can re-send that form out via the Confirmed Charter Inquiries tab of your white label.` +
              '<br><br>Thanks,<br><br>Your Charter Assistant'
            );
            mailer2
              .send()
              .then(() => callback())
              .catch(error => console.error(`ERROR SENDING 'sent preferences' EMAIL: : ${error.toString()}`));
        })
        .catch(error => console.error(`ERROR SETTING 'sentPreferencesEmail: true': ${error.toString()}`));
      })
      .catch(error => console.error(`ERROR SENDING PREFERENCES EMAIL: : ${error.toString()}`));
  })
  .catch(error => console.error(`ERROR FINDING CHARTER INQUIRY: : ${error.toString()}`));
}

module.exports = { sendPreferencesEmail }

