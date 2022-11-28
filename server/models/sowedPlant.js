const mongoose = require('mongoose')

const Schema = mongoose.Schema
const sowedPlantSchema = new Schema({
    gardenPatchID: {type: mongoose.Schema.Types.ObjectId, ref: "gardenPatch"},
    plantID: {type: mongoose.Schema.Types.ObjectId, ref: "plant"},
    dateSowed: Date
})
module.exports = mongoose.model('sowedPlant', sowedPlantSchema, 'sowedPlants')