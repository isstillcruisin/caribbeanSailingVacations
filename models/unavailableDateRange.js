const mongoose = require('mongoose')
const Schema = mongoose.Schema

const unavailableDateRangeSchema = new Schema({
  _yacht: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Boat' },
  from: { type: Date },
  to: { type: Date },
  description: { type: String },
  type: { type: String }
})

const UnavailableDateRange = mongoose.model('UnavailableDateRange', unavailableDateRangeSchema)

module.exports = UnavailableDateRange
