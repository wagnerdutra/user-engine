const User = require('../models/User')

const { scoreEngineCreateUserScoreRoute } = require('../../config/scoreEngine')

const { scoreEngineHttpRequest } = require('../services/axios')

class UserController {
  async create(req, res) {
    const { email } = req.body

    if (await User.findOne({ email })) {
      return res.status(400).json({ error: 'E-mail already exists' })
    }

    const user = await User.create(req.body)

    return scoreEngineHttpRequest
      .post(`/${scoreEngineCreateUserScoreRoute}`, {
        userId: user.id
      })
      .then(() => res.json(user))
      .catch(async err => {
        console.log(err)
        const status = err.response ? err.response.status : 500
        await user.remove()
        return res
          .status(status)
          .json(err.response.data || { error: 'Internal server error' })
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
