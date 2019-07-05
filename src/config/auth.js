require('dotenv').config({
  path: process.env.NODE_ENV === 'test' ? '.env.local' : '.env'
})

module.exports = {
  secret: process.env.APP_SECRET,
  ttl: 86400
}
