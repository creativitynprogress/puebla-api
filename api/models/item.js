const mongoose = require('mongoose')
const Schema = mongoose.Schema

const itemSchema = new Schema({
    leave_time: {
        type: Number
    },
    description: {
        type: String
    },
    image: {
        type: String
    },
    name: {
        type: String
    },
    price: {
        type: String
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: 'Category'
    },
    stock: {
        type: Schema.Types.ObjectId,
        ref: 'Stock'
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
})

module.exports = mongoose.model('Item', itemSchema)