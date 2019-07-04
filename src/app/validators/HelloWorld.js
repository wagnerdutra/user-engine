const Joi = require('joi')

module.exports = {
  body: {
    message: Joi.string().required()
  }
}
