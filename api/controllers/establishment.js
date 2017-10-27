'use strict'

const Establishment = require('../models/establishment')
const sendJSONresponse = require('./shared').sendJSONresponse

async function establishment_create (req, res, next) {
    try {
        const user = req.user

        let establishment = new Establishment(req.body)
        establishment.user = user._id

        establishment = await establishment.save()

        sendJSONresponse(res, 201, establishment)
    } catch(e) {
        return next(e)
    }
}

async function establishment_list (req, res, next) {
    try {
        const user = req.user
        
        let establishments = await Establishment.find({user: user._id})
        
        sendJSONresponse(res, 200, establishments)
    } catch (e) {
        return next(e)
    }
}

async function establishment_update (req, res, next) {
    try {
        const establishmentId = req.params.establishmentId

        let establishment = await Establishment.findById(establishmentId)

        establishment = Object.assign(establishment, req.body)

        establishment = await establishment.save()

        sendJSONresponse(res, 200, establishment)
    } catch(e) {
        return next(e)
    }
}

module.exports = {
    establishment_create,
    establishment_list,
    establishment_update
}