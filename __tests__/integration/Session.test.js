const request = require('supertest')
const app = require('../../src/server')
const truncate = require('../utils/truncate')
const { connect, disconnect } = require('../utils/dbConfig')
const { createUser, makeLogin } = require('../utils/user')

describe('Session', () => {
  beforeAll(() => connect())

  afterAll(() => disconnect())

  beforeEach(() => truncate())

  it('should make login and return the token', async () => {
    await createUser()
    const response = await makeLogin()
    expect(response.status).toBe(200)
    expect(response.body).toHaveProperty('token')
  })

  it('should not login with wrong password', async () => {
    await createUser()
    const response = await makeLogin({ password: 'teststesett' })
    expect(response.status).toBe(400)
    expect(response.body).toEqual({ error: 'Invalid password' })
  })

  it('should validate token as valid', async () => {
    await createUser()
    const {
      body: { token }
    } = await makeLogin()
    const response = await request(app)
      .get('/checkToken')
      .set('Authorization', `Bearer ${token}`)

    expect(response.status).toBe(200)
    expect(response.body).toEqual({ ok: true })
  })
})
