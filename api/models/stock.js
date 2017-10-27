const mongoose = require('mongoose')
const Schema = mongoose.Schema

const stockSchema = new Schema({
    quantity: {
        type: Number
    },
    min: {
        type: Number,
        default: 0
    },
    max: {
        type: Number
    },
    item: {
        type: Schema.Types.ObjectId,
        ref: 'Item'
    },
    storage: {
        type: Schema.Types.ObjectId,
        ref: 'Storage'
    }
})

module.exports = mongoose.model('Stock', stockSchema)
