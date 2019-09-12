const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const whiteLabelSchema = new Schema({
  name: { type: String, required: true },
});

const WhiteLabel = mongoose.model("WhiteLabels", whiteLabelSchema);

module.exports = WhiteLabel;
