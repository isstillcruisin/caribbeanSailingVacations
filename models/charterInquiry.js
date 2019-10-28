const mongoose = require('mongoose')
const Schema = mongoose.Schema
const { newCharterInquiryEmail } = require('../util/TransactionalMailer')

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
  _yacht: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Boat' },
  _eBrochure: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'EBrochure' }
})

charterInquirySchema.post('save', function (charterInquiry, next) {
  charterInquiry.populate('_whiteLabel', function (err, _wl) {
    if (err) console.log('**** ERR', err)
    charterInquiry._whiteLabel.populate('_travelAgent', function (err, _ta) {
      if (err) console.log('**** ERR', err)
      charterInquiry.populate('_yacht', function (err, _ya) {
        if (err) console.log('**** ERR', err)
        else newCharterInquiryEmail(charterInquiry, next)
      })
    })
  })
})

const CharterInquiry = mongoose.model('CharterInquiry', charterInquirySchema)

// export model
module.exports = CharterInquiry
