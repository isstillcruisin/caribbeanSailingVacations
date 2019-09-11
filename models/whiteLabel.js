const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const whiteLabelSchema = new Schema({
  whiteLabelName: { type: String, required: true },
});

const WhiteLabel = mongoose.model("WhiteLabels", whiteLabelSchema);

module.exports = WhiteLabel;
