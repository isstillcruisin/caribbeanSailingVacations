const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const whiteLabelSchema = new Schema({
  name: { type: String, required: true },
  _travelAgent: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'user' },
});

const WhiteLabel = mongoose.model("WhiteLabels", whiteLabelSchema);

module.exports = WhiteLabel;
