const mongoose = require('mongoose')
const { MongoMemoryServer } = require('mongodb-memory-server')

class DbHelper {
  constructor() {
    this.mongoServer = new MongoMemoryServer()
  }

  async connect() {
    const mongoUri = await this.mongoServer.getConnectionString()
    await mongoose.connect(
      mongoUri,
      {
        useCreateIndex: true,
        useNewUrlParser: true,
        useFindAndModify: false
      },
      err => {
        if (err) console.error(err)
      }
    )
  }

  async disconnect() {
    await mongoose.disconnect()
    await this.mongoServer.stop()
  }

  truncate() {
    Promise.all(
      Object.keys(mongoose.models).map(key => mongoose.models[key].deleteMany())
    )
  }
}

module.exports = new DbHelper()
