'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const registerSchema = new Schema({
    stock: {
        type: Schema.Types.ObjectId,
        ref: 'Stock'
    },
    receptor: {
        type: Schema.Types.ObjectId,
        ref: 'Employee'
    },
    datetime_out: {
        type: Date
    },
    datetime_in: {
        type: Date
    },
    storage: {
        type: Schema.Types.ObjectId,
        ref: 'Storage'
    },
    quantity: {
        type: Number,
        required: true
    },
    in_charge: {
        type: Schema.Types.ObjectId,
        ref: 'Employee'
    }
})

module.exports = mongoose.model('Register', registerSchema)
