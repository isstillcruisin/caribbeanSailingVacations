const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator');
const Schema = mongoose.Schema

const whiteLabelSchema = new Schema({
  name: { type: String, required: true, unique: true },
  _travelAgent: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'user' },
  isConfirmed: { type: Boolean, default: false },
  ebrochures: [{ type: Schema.Types.ObjectId, ref: 'EBrochure' }],
  companyName: { type: String },
  streetAddress: { type: String },
  city: { type: String },
  state: { type: String },
  country: { type: String },
  zipCode: { type: String },
  logoUrl: { type: String },
  title: { type: String },
  aboutText: { type: String }
})

whiteLabelSchema.plugin(uniqueValidator)

const WhiteLabel = mongoose.model('WhiteLabel', whiteLabelSchema)

module.exports = WhiteLabel
