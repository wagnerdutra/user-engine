const server = require('./server')

console.log(process.env.PORT)

server.listen(process.env.PORT || 3000)
