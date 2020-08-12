const request = require('supertest')
const { app } = require('../../server')

describe('Send Message', () => {
  it('Successful send new message', async () => {
    const res = await request(app)
      .post('/message/send')
      .send({
        content: 'test is cool',
      })
    expect(res.statusCode).toEqual(200)
    expect(res.body).toHaveProperty('data')
  })

  it('Failed send new message', async () => {
    const res = await request(app)
      .post('/message/send')
      .send({})
    expect(res.statusCode).toEqual(400)
    expect(res.body.error_type).toEqual("JOI_VALIDATOR_ERROR")
    expect(res.body.message).toEqual("\"content\" is required")
  })
})