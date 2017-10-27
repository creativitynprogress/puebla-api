const mongoose = require('mongoose')
const Schema = mongoose.Schema

const transferSchema = new Schema({
    datetime: {
        type: Date
    },
    receptor: {
        type: Schema.Types.ObjectId,
        ref: 'Employee'
    },
    origin: {
        type: Schema.Types.ObjectId,
        ref: 'Storage'
    },
    destiny: {
        type: Schema.Types.ObjectId,
        ref: 'Storage'
    },
    in_charge: {
        type: Schema.Types.ObjectId,
        ref: 'Employee'
    },
    stock: {
        type: Schema.Types.ObjectId,
        ref: 'Stock'
    },
    quantity: {
        type: Number
    }
})

module.exports = mongoose.model('Tranfer', )