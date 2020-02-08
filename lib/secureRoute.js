const jwt = require('jsonwebtoken')
const { secret } = require('../config/environment')
const user = require('../models/user')

function secureRoute(req, res, next) {
  if (!req.headers.authorization) return res.status(401).json({ message: 'Unauthorized' })
}

module.exports = secureRoute