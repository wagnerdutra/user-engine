const axios = require('axios')
const { baseUrl, port } = require('../../config/scoreEngine')

const scoreEngineUrl = `${baseUrl}:${port}`

const scoreEngineHttpRequest = {
  get: path => axios.get(`${scoreEngineUrl}${path}`),
  post: (path, params) => axios.post(`${scoreEngineUrl}${path}`, { ...params })
}

module.exports = { scoreEngineHttpRequest }
