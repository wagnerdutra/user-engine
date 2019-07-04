class HelloWorldController {
  getMessage(req, res) {
    res.json({ ok: true })
  }

  postMessage(req, res) {
    res.json({
      message: `Your message is ${req.body.message}`
    })
  }
}

module.exports = new HelloWorldController()
