const {PREFERENCES_PDF_URL} = require('../util/constants');
const Mailer = require("../routes/services/Mailer");
const args = process.argv.slice(2);
const db = require("../models");
const mongoose = require("mongoose");
const keys = require("../config/keys");
const moment = require('moment');

mongoose.Promise = global.Promise;
mongoose.connect(keys.mongoURI, { useNewUrlParser: true });
mongoose.set('useFindAndModify', false);

function findConfirmedChartersNeedingPreferencesForm() {
  const date = moment().add(60, 'days').startOf('day');
  console.log(`**** Looking for confirmed charters starting before ${date.format()} but who haven't received the preferences email yet`);

  db.CharterInquiry.find({
    "startDate": {"$lt": date.toDate()},
    "confirmed": true,
    "sentPreferencesEmail": false,
  })
  .then(dbResults => { 
    let requests = dbResults.map((item) => {
        return new Promise((resolve) => {
          sendPreferencesEmail(item._id, resolve)
        });
    })
    Promise.all(requests).then(() => process.exit());
  });
}

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
        `<br>Please download and fill out this preferences form, as soon as possible:\n ${PREFERENCES_PDF_URL}` +
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

findConfirmedChartersNeedingPreferencesForm();
