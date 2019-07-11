const { connect, disconnect, truncate } = require('../utils/dbHelper')
const { createUser } = require('../utils/user')

const axios = require('axios')
const MockAdapter = require('axios-mock-adapter')
const mock = new MockAdapter(axios)

const {
  baseUrl,
  port,
  scoreEngineCreateUserScoreRoute
} = require('../../src/config/scoreEngine')

mock
  .onPost(`${baseUrl}:${port}/${scoreEngineCreateUserScoreRoute}`)
  .reply(200, { ok: true })

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

  it('should not insert the user when score engine request fail', async () => {
    mock
      .onPost(`${baseUrl}:${port}/${scoreEngineCreateUserScoreRoute}`)
      .reply(500, { erro: 'Internal server Error' })
    const { response: err } = await createUser()
    expect(err.status).toBe(500)
    expect(err.body).toEqual({ erro: 'Internal server Error' })
  })
})
