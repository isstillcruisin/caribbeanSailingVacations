const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const eBrochureSchema = new Schema({
  name: { type: String, required: true },
  _whiteLabel: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'WhiteLabel'},
  isConfirmed: { type: Boolean, default: false },
  yachts: [{ type: Schema.Types.ObjectId, ref: 'Boat' }],
});

const EBrochure = mongoose.model("EBrochure", eBrochureSchema);

module.exports = EBrochure;
