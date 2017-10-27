'use strict'

const Storage = require('../models/storage')
const sendJSONresponse = require('./shared').sendJSONresponse

async function storage_create (req, res, next) {
    try {
        const establishmentId = req.params.establishmentId

        let storage = new Storage(req.body)
        storage.establishment = establishmentId

        storage = await storage.save()

        sendJSONresponse(res, 201, storage)
    } catch (e) {
        return next(e)
    }
}

async function storage_list (req, res, next) {
    try {
        const establishmentId = req.params.establishmentId

        let storages = Storage.find({establishment: establishmentId}).populate('establishment')

        sendJSONresponse(res, 200, storages)
    } catch(e) {
        return next(e)
    }
}

async function storage_delete (req, res, next) {
    try {
        const storageId = req.params.storageId
        if (!storageId) throw Error('storageId not found')

        let storage = await Storage.findByIdAndRemove(storage)

        sendJSONresponse(res, 203, storage)
    } catch (e) {
        return next(e)
    }
}

module.exports = {
    storage_create,
    storage_list,
    storage_delete
}