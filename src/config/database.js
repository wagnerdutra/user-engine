require('dotenv').config({
  path: process.env.NODE_ENV === 'test' ? '.env.local' : '.env'
})

module.exports = {
  uri: process.env.DB_URL
}
