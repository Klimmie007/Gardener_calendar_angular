const mongoose = require('mongoose')

const Schema = mongoose.Schema
const preserveSchema = new Schema({
    name: String,
    description: String,
    dateOfProduction: {
      type: Date,
      default:null
    },
    expirationDate: {
      type: Date,
      default:null
    }
})
module.exports = mongoose.model('preserve', preserveSchema, 'preserves');
