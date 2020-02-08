const User = require('../models/user')

// all users profiles
function index(req, res) {
  User
    .find()
    .then(foundUsers => res.status(200).json(foundUsers))
    .catch(err => console.log(err))
}

// any individual user profile
function show(req, res) {
  User
    .findById(req.params.id)
    .then(user => res.status(202).json(user))
    .catch(err => console.log(err))
}

function update(req, res, next) {
  User
    .findById(req.currentUser._id)
    .then(user => {
      if (!user) return res.status(404).json({ message: 'Not Found' })
      Object.assign(user, req.body)
      user.save()
    })
    .then(user => res.status(202).json(user))
    .catch(next)
}


function destroy(req, res) {
  User
    .findById(req.currentUser._id)
    .then(user => {
      if (!user) return res.status(404).json({ message: 'Not Found' })
      else user.remove()
    })
    .then(() => res.sendStatus(204))
    .catch(err => res.status(400).json(err))
}


function like(req, res) {
  User
    .findById(req.params.id)
    .then(user => {
      if (!user) return res.status(404).json({ message: 'Not Found ' })
      if (user.likes.some(like => like.currentUser.equals(req.currentUser._id))) return user
      user.likes.push({ currentUser: req.currentUser })
      return user.save()
    })
    .then(user => res.status(202).json(user))
    .catch(err => res.json(err))
}


module.exports = { index, show, update, destroy, like }