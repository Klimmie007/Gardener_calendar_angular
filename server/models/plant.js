const mongoose = require('mongoose')

const Schema = mongoose.Schema
const plantSchema = new Schema({
    name: String,
    sowingSeasonStart: Date,
    sowingSeasonEnd: Date,
    minVegetationTimeInDays: Number,
    maxVegetationTimeInDays: Number,
    image: {
        data: Buffer,
        contentType: String
    },
    icon: {
        data: Buffer,
        contentType: String
    }
})
module.exports = mongoose.model('plant', plantSchema, 'plants');