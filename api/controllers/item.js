'use strict'

const Item = require('../models/item')
const sendJSONresponse = require('./shared').sendJSONresponse

async function item_create (req, res, next) {
    try {
        const user = req.user

        let item = new Item(req.body)
        item.user = user._id

        item = await item.save()

        sendJSONresponse(res, 201, item)
    } catch(e) {
        return next(e)
    }
}

async function item_list (req, res, next) {
    try {
        const user = req.user

        let items = await Item.find({user: user._id}).populate('storage product')

        sendJSONresponse(res, 200, items)
    } catch(e) {
        return next(e)
    }
}

async function item_update (req, res, next) {
    try {
        const itemId = req.params.itemId

        let item = await Item.findById(itemId)

        item = Object.assign(item, req.body)

        item = await item.save()

        sendJSONresponse(res, 200, item)
    } catch(e) {
        return next(e)
    }
}

async function item_delete (req, res, next) {
    try {
        const itemId = req.params.itemId

        let item = await Item.findByIdAndRemove(itemId)

        sendJSONresponse(res, 200, item)
    } catch(e) {
        return next(e)
    }
}

module.exports = {
    item_create,
    item_delete,
    item_list,
    item_update
}