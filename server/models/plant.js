const mongoose = require('mongoose')

const Schema = mongoose.Schema
const plantSchema = new Schema({
    minVegetationCycleInDays: Number,
    maxVegetationCycleInDays: Number,
    name: String,
    image: String,
    icon: String,
    sowingSeasonStart: Date,
    sowingSeasonEnd: Date,
    yieldSeasonStart: Date,
    yieldSeasonEnd: Date,
    expectedYieldInkg: Number,
    type: String,
})
module.exports = mongoose.model('plant', plantSchema, 'plants');