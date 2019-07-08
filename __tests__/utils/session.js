const app = require('../../src/server')
const request = require('supertest')
var faker = require('faker/locale/pt_BR')

const initialUser = {
  name: faker.name.findName(),
  email: faker.internet.email(),
  password: faker.internet.password()
}

const makeLogin = (user = {}) => {
  const response = request(app)
    .post('/login')
    .send({ ...initialUser, ...user })
  return response
}

module.exports = { makeLogin }
