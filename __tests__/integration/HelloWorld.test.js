const request = require('supertest')
const app = require('../../src/server')

describe('HelloWorld', () => {
  it('should get message', async () => {
    const response = await request(app).get('/')
    expect(response.body).toEqual({ ok: true })
  })

  it('should has status 400', async () => {
    const response = await request(app)
      .post('/')
      .send({})
    expect(response.status).toBe(400)
  })
})
