const request = require('supertest')
const app = require('../../src/server')
const truncate = require('../utils/truncate')
const { connect, disconnect } = require('../utils/dbConfig')
const { createUser } = require('../utils/user')
const { makeLogin } = require('../utils/session')

describe('Session', () => {
  beforeAll(() => connect())

  afterAll(() => disconnect())

  beforeEach(() => truncate())

  it('should make login and return the token', async () => {
    const { user, passwordDecrypted: password } = await createUser()
    const response = await makeLogin({ ...user, password })
    expect(response.status).toBe(200)
    expect(response.body).toHaveProperty('token')
  })

  it('should not login with wrong password', async () => {
    const { user } = await createUser()
    const response = await makeLogin({ ...user, password: 'teststesett' })
    expect(response.status).toBe(400)
    expect(response.body).toEqual({ error: 'Invalid password' })
  })

  it('should validate token as valid', async () => {
    const { user, passwordDecrypted: password } = await createUser()
    const {
      body: { token }
    } = await makeLogin({ ...user, password })
    const response = await request(app)
      .get('/checkToken')
      .set('Authorization', `Bearer ${token}`)
    expect(response.status).toBe(200)
    expect(response.body).toEqual({ ok: true })
  })
})
