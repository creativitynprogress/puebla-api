const mongoose = require('mongoose')
const Schema = mongoose.Schema

const establishmentSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    location: {
        type: String
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
})

module.exports = mongoose.model('Establishment', establishmentSchema)
