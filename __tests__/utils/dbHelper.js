const mongoose = require('mongoose')
const { uri } = require('../../src/config/database')

const connect = () =>
  mongoose.connect(uri, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useFindAndModify: false
  })

const disconnect = () => mongoose.connection.close()

const truncate = () =>
  Promise.all(
    Object.keys(mongoose.models).map(key => mongoose.models[key].deleteMany())
  )

module.exports = { connect, disconnect, mongoose, truncate }
