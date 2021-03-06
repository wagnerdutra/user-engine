const routes = require('express').Router()
const validator = require('express-validation')
const handler = require('express-async-handler')

const UserController = require('./app/controllers/UserController')
const AuthController = require('./app/controllers/AuthController')
const MetricsController = require('./app/controllers/MetricsController')

const User = require('./app/validators/User')
const Auth = require('./app/validators/Auth')

const authMiddleware = require('./app/middlewares/auth')

routes.post('/createUser', validator(User), handler(UserController.create))
routes.put('/updateUser', handler(authMiddleware), UserController.update)

routes.post('/login', validator(Auth), handler(AuthController.create))

routes.get(
  '/checkToken',
  handler(authMiddleware),
  handler((_, res) => res.json({ ok: true }))
)

routes.get('/health', handler(MetricsController.health))

routes.get('/ready', MetricsController.ready)

module.exports = routes
