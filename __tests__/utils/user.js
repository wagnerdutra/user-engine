const app = require('../../src/server')
const request = require('supertest')
var faker = require('faker/locale/pt_BR')

const initialUser = {
  name: faker.name.findName(),
  email: faker.internet.email(),
  password: faker.internet.password()
}

const createUser = async (user = {}) => {
  const response = await request(app)
    .post('/createUser')
    .send({ ...initialUser, ...user })
  return {
    response,
    user: response.body,
    passwordDecrypted: initialUser.password
  }
}

module.exports = { createUser }
