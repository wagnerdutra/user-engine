const { res } = require('../../utils/middlewareMock')
const { createUser } = require('../../utils/user')
const { makeLogin } = require('../../utils/auth')
const { connect, disconnect, truncate } = require('../../utils/dbHelper')

const authMiddleware = require('../../../src/app/middlewares/auth')

const axios = require('axios')
const MockAdapter = require('axios-mock-adapter')
const mock = new MockAdapter(axios)

const {
  baseUrl,
  port,
  scoreEngineCreateUserScoreRoute
} = require('../../../src/config/scoreEngine')

mock
  .onPost(`${baseUrl}:${port}/${scoreEngineCreateUserScoreRoute}`)
  .reply(200, { ok: true })

describe('AuthMiddleware', () => {
  beforeAll(() => connect())

  afterAll(() => disconnect())

  beforeEach(() => truncate())

  it('should validate token, return the user and call next function', async () => {
    const { user, passwordDecrypted: password } = await createUser()
    const response = await makeLogin({ ...user, password, print: true })
    const nextFunction = jest.fn()
    const req = {
      headers: {
        authorization: `Bearer ${response.body.token}`
      }
    }
    await authMiddleware(req, res, nextFunction)
    expect(nextFunction).toHaveBeenCalledTimes(1)
    expect(req.userId).toBe(user._id)
  })
})
