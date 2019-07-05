const jwt = require('jsonwebtoken')
const authConfig = require('../../config/auth')
const { promisify } = require('util')

module.exports = async (req, res, next) => {
  const authHeader = req.headers.authorization

  if (!authHeader) {
    return res.status(401).json({ error: 'Token not provided' })
  }

  const [, token] = authHeader.split(' ')

  try {
    // promisify evita a necessidade de passar um callback para a função jwt.token
    // ex: jwt.verify(token, authConfig.secrete, () => {} <- callback) assim e possivel usar await
    const decoded = await promisify(jwt.verify)(token, authConfig.secret)
    req.userId = decoded.id

    return next()
  } catch (err) {
    return res.status(401).json({ error: 'Token invalid' })
  }
}
