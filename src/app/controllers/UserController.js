const User = require('../models/User')

class UserController {
  async create(req, res) {
    const { email } = req.body

    if (await User.findOne({ email })) {
      return res.status(400).json({ error: 'E-mail already exists' })
    }

    res.json(await User.create(req.body))
  }
}

module.exports = new UserController()
