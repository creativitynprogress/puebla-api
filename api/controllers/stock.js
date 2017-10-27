"use strict";
const Stock = require("../models/stock")
const sendJSONresponse = require("./shared").sendJSONresponse

async function stock_create(req, res, next) {
  try {
    const storageId = req.params.storageId
    if (!storageId) throw Error('storageId not found')

    let stock = await Stock.find({storage: storageId, item: req.body.item})

    if (!stock) {
        let stock = new Stock(req.body)
        stock.storage = storageId
    
        stock = await stock.save()
    
        sendJSONresponse(res, 201, stock)
    } else {
        throw Error('this item is already register in this storage')
    }
  } catch (e) {
    return next(e)
  }
}

async function stock_list (req, res, next) {
    try {
        const storageId = req.params.storageId
        if (!storageId) throw Error('storageId not found')

        let stocks = await Stock.find({storage: storageId}).populate('item')

        sendJSONresponse(res, 200, stocks)
    } catch (e) {
        return next(e)
    }
}

async function stock_update (req, res, next) {
    try {
        const storageId = req.params.storageId
        const stockId = req.params.stockId

        if (!storageId) throw Error('storageId not found')
        if (!stockId) throw Error('stockId not found')

        let stock = Stock.findById(stockId)

        stock = Object.assign(stock, req.body)
        stock = await stock.save()

        sendJSONresponse(res, 200, stock)
    } catch (e) {
        return next(e)
    }
}

async function stock_delete (req, res, next) {
    try {
        const stockId = req.params.stockId
        if (!stockId) throw Error('stockId not found')

        let stock = await Stock.findByIdAndRemove(stockId)

        sendJSONresponse(res, 200, stock)
    } catch (e) {
        return next(e)
    }
}

module.exports = {
    stock_create,
    stock_list,
    stock_update,
    stock_delete
}
