'use strict'

const Employee = require('../models/employee')
const sendJSONresponse = require('./shared')

async function employee_create (req, res, next) {
    try {
        const establishmentId = req.params.establishmentId

        let employee = new Employee(req.body)
        employee.establishment = establishmentId

        employee = employee.save()

        sendJSONresponse(res, 201, employee)
    } catch (e) {
        return next(e)
    }
}

async function employee_details (req, res, list) {
    try {
        const employeeId = req.params.employeeId

        let employee = await Employee.findById(employee).populate('establishment')

        sendJSONresponse(res, 200, employee)
    } catch(e) {
        return next(e)
    }
}

async function employee_list (req, res, next) {
    try {
        const establishmentId = req.params.establishmentId

        let employees = await Employee.find({establishment: establishmentId}, '-password')

        sendJSONresponse(res, 200, employees)
    } catch(e) {
        return next(e)
    }
}

async function employee_update (req, res, next) {
    try {
        const employeeId = req.params.employeeId

        let employee = await Employee.findById(employeeId)

        employee = Object.assign(employee, req.body)

        employee = await employee.save()

        sendJSONresponse(res, 200, employee)
    } catch(e) {
        return next(e)
    }
}

async function employee_delete (req, res, next) {
    try {
        const employeeId = req.params.employeeId

        let employee = await Employee.findByIdAndRemove(employeeId)

        sendJSONresponse(res, 200, employee)
    } catch (e) {
        return next(e)
    }
}

module.exports = {
    employee_create,
    employee_list,
    employee_details,
    employee_update,
    employee_delete
}