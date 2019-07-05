const { mongoose } = require('./dbConfig')

module.exports = () =>
  Promise.all(
    Object.keys(mongoose.models).map(key => mongoose.models[key].deleteMany())
  )
