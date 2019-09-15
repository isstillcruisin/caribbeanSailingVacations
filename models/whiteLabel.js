const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const whiteLabelSchema = new Schema({
  name: { type: String, required: true },
  _travelAgent: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'user' },
  isConfirmed: { type: Boolean, default: false },
});

const WhiteLabel = mongoose.model("WhiteLabel", whiteLabelSchema);

module.exports = WhiteLabel;
