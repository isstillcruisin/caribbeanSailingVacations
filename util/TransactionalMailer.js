const mongoose = require('mongoose')
const db = require('../models')
const keys = require('../config/keys')
const constants = require('./constants')
const Mailer = require('../routes/services/Mailer')
const moment = require('moment')

async function newCharterInquiryEmail (charterInquiry, callback) {
  const subject = 'Yacht Charter Inquiry'

  const ta = charterInquiry._whiteLabel._travelAgent

  const mailer = new Mailer(
    subject,
    [{ email: ta.email }],
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
  )
  mailer
    .send()
    .then(() => { callback() })
    .catch(error => console.error(error.toString()))
}

async function newWhiteLabelEmail (whiteLabel, adminUsers, callback) {
  const subject = 'New White Label'

  const ta = whiteLabel._travelAgent

  const mailer = new Mailer(
    subject,
    adminUsers.map(admin => { return { email: admin.email } }),
    'A Travel Agent has signed up for a White Label: <table>' +
      `<tr><td>White Label:</td><td>${whiteLabel.name}` +
      `<tr><td>Travel Agent Name:</td><td>${ta.firstName} ${ta.lastName}</td></tr>` +
      `<tr><td>Travel Agent Email:</td><td>${ta.email}</td></tr>` +
      '</table>'
  )
  mailer
    .send()
    .then(() => { callback() })
    .catch(error => {
      console.error(`ERROR SENDING 'new white label' EMAIL: : ${error.toString()}`)
      callback()
    })
}

async function sendPreferencesEmail (charterInquiryId, callback) {
  var id = new mongoose.Types.ObjectId(charterInquiryId)

  db.CharterInquiry.findById(id)
    .populate({
      path: '_whiteLabel',
      populate: { path: '_travelAgent' }
    })
    .populate('_yacht')
    .then(dbCharterInquiry => {
    // Send the preferences email
      const ta = dbCharterInquiry._whiteLabel._travelAgent

      const subject = 'Yacht Charter Preferences'

      const mailer = new Mailer(
        subject,
        [{ email: dbCharterInquiry.email }],
        `Dear ${dbCharterInquiry.firstName} ${dbCharterInquiry.lastName},\n\n` +
        '<br><br>Your Yacht Charter is coming up soon!! \n' +
        `<br>Please download and fill out this preferences form, as soon as possible:\n ${constants.PREFERENCES_PDF_URL}` +
        `<br><br>Thanks,<br><br>${ta.firstName} ${ta.lastName}` +
        `<br><br>${ta.email}</br></br>`
      )
      mailer
        .send()
        .then(() => {
          db.CharterInquiry.findOneAndUpdate({ _id: id }, { sentPreferencesEmail: true })
            .then(() => {
              const subject2 = `Sent Yacht Charter Preferences To ${dbCharterInquiry.firstName} ${dbCharterInquiry.lastName}`

              const mailer2 = new Mailer(
                subject2,
                [{ email: ta.email }],
              `Dear ${ta.firstName} ${ta.lastName},\n\n` +
              `<br><br>Charter Assistant has sent out a preferences form to ${dbCharterInquiry.firstName} ${dbCharterInquiry.lastName} \n` +
              '<br>If you don\'t hear from them soon, you can re-send that form out via the Confirmed Charter Inquiries tab of your white label.' +
              '<br><br>Thanks,<br><br>Your Charter Assistant'
              )
              mailer2
                .send()
                .then(() => callback())
                .catch(error => console.error(`ERROR SENDING 'sent preferences' EMAIL: : ${error.toString()}`))
            })
            .catch(error => console.error(`ERROR SETTING 'sentPreferencesEmail: true': ${error.toString()}`))
        })
        .catch(error => console.error(`ERROR SENDING PREFERENCES EMAIL: : ${error.toString()}`))
    })
    .catch(error => console.error(`ERROR FINDING CHARTER INQUIRY: : ${error.toString()}`))
}

module.exports = {
  sendPreferencesEmail,
  newCharterInquiryEmail,
  newWhiteLabelEmail
}
