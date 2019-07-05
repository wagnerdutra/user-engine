const mongoose = require('mongoose')
const { uri } = require('../../src/config/database')

const connect = () => {
  mongoose.connect(uri, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useFindAndModify: false
  })
}

const disconnect = () => {
  mongoose.connection.close()
}

module.exports = { connect, disconnect, mongoose }
