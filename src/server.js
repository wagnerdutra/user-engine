require('dotenv').config({
  path: process.env.NODE_ENV === 'test' ? '.env.local' : '.env'
})

const mongoose = require('mongoose')
const express = require('express')
const Youch = require('youch')
const validate = require('express-validation')
const routes = require('./routes')
const { uri } = require('./config/database')

class App {
  constructor() {
    this.express = express()

    if (process.env.NODE_ENV !== 'test') {
      this.database()
    }

    this.middlewares()
    this.routes()
    this.exception()
  }

  database() {
    mongoose.connect(
      uri,
      {
        useCreateIndex: true,
        useNewUrlParser: true,
        useFindAndModify: false
      },
      err => {
        if (err) throw err
      }
    )
  }

  middlewares() {
    this.express.use(express.json())
  }

  routes() {
    this.express.use(routes)
  }

  exception() {
    this.express.use(async (err, req, res, next) => {
      if (err instanceof validate.ValidationError) {
        return res.status(err.status).json(err)
      }

      if (process.env.NODE_ENV !== 'production') {
        const youch = new Youch(err, req)
        return res.json(await youch.toJSON())
      }

      return res
        .status(err.status || 500)
        .json({ message: 'Internal Server Error' })
    })
  }
}

module.exports = new App().express
