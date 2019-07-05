const { res } = require('../../utils/middlewareMock')
const truncate = require('../../utils/truncate')
const { createUser } = require('../../utils/user')
const { makeLogin } = require('../../utils/session')
const { connect, disconnect } = require('../../utils/dbConfig')

const authMiddleware = require('../../../src/app/middlewares/auth')

describe('AuthMiddleware', () => {
  beforeAll(() => connect())

  afterAll(() => disconnect())

  beforeEach(() => truncate())

  it('should validate token, return the user and call next function', async () => {
    const { user, passwordDecrypted: password } = await createUser()
    const {
      body: { token }
    } = await makeLogin({ ...user, password })
    const nextFunction = jest.fn()
    const req = {
      headers: {
        authorization: `Bearer ${token}`
      }
    }
    await authMiddleware(req, res, nextFunction)
    expect(nextFunction).toHaveBeenCalledTimes(1)
    expect(req.userId).toBe(user._id)
  })
})
