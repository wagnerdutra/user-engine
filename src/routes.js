const routes = require('express').Router()
const validator = require('express-validation')
const handler = require('express-async-handler')

const UserController = require('./app/controllers/UserController')
const SessionController = require('./app/controllers/SessionController')

const User = require('./app/validators/User')
const Session = require('./app/validators/Session')

routes.post('/', validator(User), handler(UserController.create))

routes.post('/login', validator(Session), handler(SessionController.create))

module.exports = routes
