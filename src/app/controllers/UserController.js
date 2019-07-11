const axios = require('axios')

const User = require('../models/User')
const {
  baseUrl,
  port,
  scoreEngineCreateUserScoreRoute
} = require('../../config/scoreEngine')

class UserController {
  async create(req, res) {
    const { email } = req.body

    if (await User.findOne({ email })) {
      return res.status(400).json({ error: 'E-mail already exists' })
    }

    const user = await User.create(req.body)

    return axios
      .post(`${baseUrl}:${port}/${scoreEngineCreateUserScoreRoute}`, {
        userId: user.id
      })
      .then(() => {
        res.json(user)
      })
      .catch(async err => {
        const status = err.response ? err.response.status : 500
        await user.remove()
        res.status(status).json(err)
      })
  }

  async update(req, res) {
    const { email, ...rest } = req.body

    if (!(await User.findOne({ email }))) {
      return res.status(400).json({ error: 'User not found' })
    }

    const savedUser = await User.findOne({ email })

    Object.keys(rest).forEach(key => (savedUser[key] = rest[key]))

    return res.json(await savedUser.save())
  }
}

module.exports = new UserController()
