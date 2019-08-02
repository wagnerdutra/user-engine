const server = require('./server')

server.listen(process.env.APP_PORT || 3000)
