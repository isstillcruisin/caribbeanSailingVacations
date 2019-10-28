const mongoose = require('mongoose')
const Schema = mongoose.Schema

const boatSchema = new Schema({
  boatName: { type: String, required: true },
  imgs: { type: [String], required: true },
  year: { type: Number, required: true },
  maxPassengers: { type: Number, required: true },
  manufacture: { type: String, required: true },
  crewBio: { type: String, required: true },
  pricePerWeek: { type: Number, required: true },
  cyaId: { type: Number, required: true }
})

const Boat = mongoose.model('Boat', boatSchema)

module.exports = Boat
