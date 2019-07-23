const mongoose = require('mongoose')

class ChallengeController {
  health(_, res) {
    if (ChallengeController.getMongoStatus() !== 1) {
      return res.sendStatus(503)
    }
    return res.sendStatus(200)
  }

  ready(_, res) {
    switch (ChallengeController.getMongoStatus()) {
      case 0:
        return res.status(503).json({ status: 'disconnected' })
      case 1:
        return res.json({ status: 'connected' })
      case 2:
        return res.status(503).json({ status: 'connecting' })
      default:
        return res.status(503).json({ status: 'disconnecting' })
    }
  }

  /**
   * 0: disconnected
   * 1: connected
   * 2: connecting
   * 3: disconnecting
   */
  static getMongoStatus() {
    return mongoose.connection.readyState
  }
}

module.exports = new ChallengeController()
