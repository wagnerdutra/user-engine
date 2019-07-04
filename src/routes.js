const routes = require('express').Router()
const validator = require('express-validation')
const handler = require('express-async-handler')

const HelloWorldController = require('./app/controllers/HelloWorldController')

const HelloWorld = require('./app/validators/HelloWorld')

routes.get('/', handler(HelloWorldController.getMessage))
routes.post(
  '/',
  validator(HelloWorld),
  handler(HelloWorldController.postMessage)
)

module.exports = routes
