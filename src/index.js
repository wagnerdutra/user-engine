require('dotenv').config({
  path: process.env.NODE_ENV === 'test' ? '.env.local' : '.env'
})

const server = require('./server')

server.listen(process.env.PORT || 3000)
