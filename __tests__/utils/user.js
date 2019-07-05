const app = require('../../src/server')
const request = require('supertest')
var faker = require('faker/locale/pt_BR')

const initialUser = {
  name: faker.name.findName(),
  email: faker.internet.email(),
  password: faker.internet.password()
}

const createUser = (user = {}) =>
  request(app)
    .post('/')
    .send({ ...initialUser, ...user })

const makeLogin = async (user = {}) =>
  request(app)
    .post('/login')
    .send({ ...initialUser, ...user })

module.exports = { createUser, makeLogin }
