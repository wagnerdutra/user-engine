const truncate = require('../utils/truncate')
const { connect, disconnect } = require('../utils/dbConfig')
const { createUser } = require('../utils/user')

describe('User', () => {
  beforeAll(() => connect())

  afterAll(() => disconnect())

  beforeEach(() => truncate())

  it('should create the user', async () => {
    const { response } = await createUser()
    expect(response.status).toBe(200)
    expect(response.body).toHaveProperty('_id')
  })

  it('should not insert the same email', async () => {
    await createUser()
    const { response } = await createUser()
    expect(response.status).toBe(400)
    expect(response.body).toEqual({ error: 'E-mail already exists' })
  })
})
