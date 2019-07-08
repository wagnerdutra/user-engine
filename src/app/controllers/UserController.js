const User = require('../models/User')

class UserController {
  async create(req, res) {
    const { email } = req.body

    if (await User.findOne({ email })) {
      return res.status(400).json({ error: 'E-mail already exists' })
    }

    return res.json(await User.create(req.body))
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
