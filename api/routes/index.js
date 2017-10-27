module.exports = (app, io) => {
    const express = require('express')
    const passportService = require('../config/passport')
    const passport = require('passport')
  
    const authenticathion_controller = require('../controllers/authentication')
    const establishment_controller = require('../controllers/establishment')
    const storage_controller = require('../controllers/storage')
    const employee_controller = require('../controllers/employee')
    const stock_controller = require('../controllers/stock')
    const category_controller = require('../controllers/category')
    const item_controller = require('../controllers/item')
  
    // Middleware to require login/authentication
  const require_auth = passport.authenticate('jwt', {
      session: false
    })
    
    const require_login = passport.authenticate('local', {
      session: false
    })
    const api_routes = express.Router()
    const auth_routes = express.Router()
    const establishment_routes = express.Router()
    const item_routes = express.Router()
    const storage_routes = express.Router()
    const employee_routes = express.Router({ mergeParams: true })
    const stock_routes = express.Router({ mergeParams: true })
    const category_routes = express.Router()

    api_routes.use('/auth', auth_routes)
    auth_routes.post('/register', authenticathion_controller.register)
    auth_routes.post('/login', require_login, authenticathion_controller.login)

    api_routes.use('/establishment', establishment_routes)
    establishment_routes.post('/', require_auth, establishment_controller.establishment_create)
    establishment_routes.get('/', require_auth, establishment_controller.establishment_list)
    establishment_routes.put('/', require_auth, establishment_controller.establishment_update)

    api_routes.use('/item', item_routes)
    item_routes.post('/', require_auth, item_controller.item_create)
    item_routes.get('/', require_auth, item_controller.item_list)
    item_routes.put('/:itemId', require_auth, item_controller.item_update)
    item_routes.delete('/:itemId', require_auth, item_controller.item_delete)

    establishment_routes.use('/:establishmentId/storage', storage_routes)
    storage_routes.post('/', require_auth, storage_controller.storage_create)
    storage_routes.get('/', require_auth, storage_controller.storage_list)
    storage_routes.delete('/:storageId', require_auth, storage_controller.storage_delete)

    establishment_routes.use('/:establishmentId/employee', employee_routes)
    employee_routes.post('/', require_auth, employee_controller.employee_create)
    employee_routes.get('/', require_auth, employee_controller.employee_list)
    employee_routes.get('/:employeeId', require_auth, employee_controller.employee_details)
    employee_controller.put('/:employeeId', require_auth, employee_controller.employee_update)
    employee_controller.delete('/:employeeId', require_auth, employee_controller.employee_delete)

    storage_routes.use('/:storageId/stock', stock_routes)
    stock_routes.post('/', require_auth, stock_controller.stock_create)
    stock_routes.get('/', require_auth, stock_controller.stock_list)
    stock_routes.put('/:stockId', require_auth, stock_controller.stock_update)
    stock_routes.delete('/:stockId', require_auth, stock_controller.stock_update)

    api_routes.use('/category', category_routes)
    category_routes.post('/', require_auth, category_controller.category_create)
    category_routes.delete('/:categoryId', require_auth, category_controller.category_delete)

    app.use('/api', api_routes)
}
