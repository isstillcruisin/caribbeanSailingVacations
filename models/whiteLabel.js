const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { newWhiteLabelEmail } = require("../util/TransactionalMailer")
const db = require("../models");

const whiteLabelSchema = new Schema({
  name: { type: String, required: true },
  _travelAgent: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'user' },
  isConfirmed: { type: Boolean, default: false },
  ebrochures: [{ type: Schema.Types.ObjectId, ref: 'EBrochure' }],
  companyName: { type: String },
  streetAddress: { type: String },
  city: { type: String },
  state: { type: String },
  country: { type: String },
  zipCode: { type: String },
  phoneNumber: { type: String },
  logoUrl: { type: String },
});

const WhiteLabel = mongoose.model("WhiteLabel", whiteLabelSchema);

module.exports = WhiteLabel;
