require('dotenv').config({
  path: process.env.NODE_ENV === 'test' ? '.env.local' : '.env'
})

const mongoose = require('mongoose')
const express = require('express')
const Youch = require('youch')
const validate = require('express-validation')
const routes = require('./routes')
const { uri } = require('./config/database')
const Sentry = require('@sentry/node')
const sentryConfig = require('./config/sentry')

class App {
  constructor() {
    this.express = express()

    if (process.env.NODE_ENV !== 'test') {
      this.database()
    }

    if (process.env.NODE_ENV === 'production') {
      this.sentry()
    }

    this.middlewares()
    this.routes()
    this.exception()
  }

  sentry() {
    Sentry.init(sentryConfig)
  }

  database() {
    mongoose
      .connect(uri, {
        useCreateIndex: true,
        useNewUrlParser: true,
        useFindAndModify: false
      })
      .then(
        () => {
          console.log('Connected!')
        },
        err => {
          console.log(err)
        }
      )
  }

  middlewares() {
    this.express.use(express.json())
    this.express.use(Sentry.Handlers.requestHandler())
  }

  routes() {
    this.express.use(routes)
  }

  exception() {
    if (process.env.NODE_ENV === 'production') {
      this.express.use(Sentry.Handlers.errorHandler())
    }

    this.express.use(async (err, req, res, next) => {
      if (err instanceof validate.ValidationError) {
        return res.status(err.status).json(err)
      }

      if (err instanceof validate.ValidationError) {
        return res.status(err.status).json(err)
      }

      if (process.env.NODE_ENV !== 'production') {
        const youch = new Youch(err, req)
        return res.status(err.status || 500).json(await youch.toJSON())
      }

      console.log(err)

      return res
        .status(err.status || 500)
        .json({ message: 'Internal Server Error' })
    })
  }
}

module.exports = new App().express
