const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { newWhiteLabelEmail } = require("../util/TransactionalMailer")

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

whiteLabelSchema.post('save', function(whiteLabel, next) {
  whiteLabel.populate('_travelAgent', function (err, _ta) {
    if (err) console.log("**** ERR", err)
    else newWhiteLabelEmail(whiteLabel, next);
  });
});


const WhiteLabel = mongoose.model("WhiteLabel", whiteLabelSchema);

module.exports = WhiteLabel;
