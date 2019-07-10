const request = require('supertest')
const app = require('../../src/server')
const { connect, disconnect, truncate } = require('../utils/dbHelper')
const { createUser } = require('../utils/user')
const { makeLogin } = require('../utils/auth')

describe('Auth', () => {
  beforeAll(() => connect())

  afterAll(() => disconnect())

  beforeEach(() => truncate())

  it('should make login and return the token', async () => {
    const { user, passwordDecrypted: password } = await createUser()
    const response = await makeLogin({ ...user, password })
    expect(response.status).toBe(200)
    expect(response.body).toHaveProperty('token')
  })

  it('should not login with a nonexistent password', async () => {
    const response = await makeLogin({
      email: 'teste@gmail.com',
      password: '123345'
    })
    expect(response.status).toBe(400)
    expect(response.body).toEqual({ error: 'User not found' })
  })

  it('should not login with wrong password', async () => {
    const { user } = await createUser()
    const response = await makeLogin({ ...user, password: 'teststesett' })
    expect(response.status).toBe(400)
    expect(response.body).toEqual({ error: 'Invalid password' })
  })

  it('should update and not encrypt the same password', async () => {
    const { user, passwordDecrypted: password } = await createUser()
    const {
      body: { token }
    } = await makeLogin({ ...user, password })
    const response = await request(app)
      .put('/')
      .set('Authorization', `Bearer ${token}`)
      .send({ email: user.email, name: 'José Maria ' })
    expect(response.status).toBe(200)
    expect(user.password).toBe(response.body.password)
  })

  it('should not update when the user not exists', async () => {
    const { user, passwordDecrypted: password } = await createUser()
    const {
      body: { token }
    } = await makeLogin({ ...user, password })
    const response = await request(app)
      .put('/')
      .set('Authorization', `Bearer ${token}`)
      .send({ email: 'teste@gmail.com', name: 'José Maria ' })
    expect(response.status).toBe(400)
    expect(response.body).toEqual({ error: 'User not found' })
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

  it('should not allow to access the content without sending the token', async () => {
    const response = await request(app).get('/checkToken')
    expect(response.status).toBe(401)
    expect(response.body).toEqual({ error: 'Token not provided' })
  })

  it('should not allow to access the content with an invalid token', async () => {
    const response = await request(app)
      .get('/checkToken')
      .set('Authorization', `Bearer ${123345}`)
    expect(response.status).toBe(401)
    expect(response.body).toEqual({ error: 'Token invalid' })
  })
})
