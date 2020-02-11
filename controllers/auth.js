const User = require('./../models/user')
const jwt = require('jsonwebtoken')
const { secret } = require('../config/environment')

function register(req, res) {
  User
    .create(req.body)
    .then(user => res.status(201).json({ message: `Thanks for registering ${user.name}` }))
    .catch(err => res.json(err))
}

function login(req, res) {
  User
    .findOne({ email: req.body.email })
    .then(user => {
      if (!user || !user.validatePassword(req.body.password)) {
        return res.status(401).json({ message: 'Unauthorized' })
      }
      const token = jwt.sign({ sub: user._id }, secret, { expiresIn: '24h' })
      res.status(202).json({ message: `Welcome back ${user.name}`, token })
    })
    .catch(() => res.status(401).json({ message: 'Unauthorized' }))
}

// current user profile
function myPortfolio(req, res) {
  User
    .findById(req.currentUser._id)
    .populate('createdProjects')
    .populate('collaboratedProjects')
    .populate('pendingProjects.project')
    .then(user => res.status(200).json(user))
    .catch(err => res.json(err))
}

// edit user profile
function myPortfolioUpdate(req, res, next) {
  User
    .findById(req.currentUser._id)
    .then(user => {
      if (!user) throw new Error('ValidationError')
      if (!user._id.equals(req.currentUser._id)) return res.status(401).json({ message: 'Unauthorised' })
      Object.assign(user, req.body)
      return user.save()
    })
    .then(user => res.status(202).json(user))
    .catch(next)
}

module.exports = { register, login, myPortfolio, myPortfolioUpdate }