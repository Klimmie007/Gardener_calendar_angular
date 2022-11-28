const mongoose = require('mongoose')

const Schema = mongoose.Schema
const harvestSchema = new Schema({
    weight: String,
    harvestedPlant: {type: mongoose.Schema.Types.ObjectId, ref: "plant"},
    harvestDate: {
      type: Date,
      default:null
    }
})
module.exports = mongoose.model('harvest', harvestSchema, 'harvests');