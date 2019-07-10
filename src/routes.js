const routes = require('express').Router()
const validator = require('express-validation')
const handler = require('express-async-handler')

const UserController = require('./app/controllers/UserController')
const AuthController = require('./app/controllers/AuthController')

const User = require('./app/validators/User')
const Auth = require('./app/validators/Auth')

const authMiddleware = require('./app/middlewares/auth')

routes.post('/', validator(User), handler(UserController.create))
routes.put('/', handler(authMiddleware), UserController.update)

routes.post('/login', validator(Auth), handler(AuthController.create))

routes.get(
  '/checkToken',
  handler(authMiddleware),
  handler((req, res) => res.json({ ok: true }))
)

module.exports = routes
