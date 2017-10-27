'use strict'
const Category = require('../models/category')
const sendJSONresponse = require('./shared').sendJSONresponse

async function category_create (req, res, next) {
    try {
        let category = new Category(req.body)

        category = await category.save(category)
        sendJSONresponse(res, 201, category)
    } catch (e) {
        return next(e)
    }
}

async function category_delete (req, res, next) {
    try {
        const categoryId = req.params.categoryId

        if (!categoryId) throw Error('categoryId not found')

        let category = await Category.findByIdAndRemove(categoryId)

        sendJSONresponse(res, 204, category)
    } catch (e) {
        return next(e)
    }
}

module.exports = {
    category_create,
    category_delete
}