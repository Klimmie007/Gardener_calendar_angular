const mongoose = require('mongoose')

const Schema = mongoose.Schema
const gardenPatchSchema = new Schema({
    name: String,
    type: String,
    amount: Number
})
module.exports = mongoose.model('gardenPatch', gardenPatchSchema, 'gardenPatches');
