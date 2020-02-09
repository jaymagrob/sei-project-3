const User = require('../models/user')

// all users profiles
function index(req, res) {
  User
    .find()
    .then(foundUsers => res.status(200).json(foundUsers))
    .catch(err => console.log(err))
}

// need to change the findby id to find username - also needs to be changed on front end -- same with likes
function show(req, res) {
  User
    .find({ username: req.params.username })
    .populate('createdProjects')
    .populate('collaboratedProjects')
    .then(user => {
      if (!user) return res.status(404).json({ message: 'Not Found' })
      res.status(202).json(user)
    })
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
    .find({ username: req.params.username })
    .then(user => {
      if (!user) return res.status(404).json({ message: 'Not Found ' })
      const skill = user[0].skills.id(req.params.skill)
      const users = skill.likes.map(like => like.user)
      if (!users.includes(req.currentUser._id)) {
        skill.likes.push({ user: req.currentUser._id })
      } else {
        const newLikes = skill.likes.filter(like => like.user._id.toString() !== req.currentUser._id.toString())
        skill.likes = newLikes
      }
      return user[0].save()
    })
    .then(user => res.status(202).json(user))
    .catch(err => res.json(err))
}

function newSkill(req, res) {
  User
    .find({ username: req.params.username })
    .then(user => {
      if (!user) return res.status(404).json({ message: 'Not Found ' })
      const skills = user[0].skills.map(skill => skill.skill)
      if (!skills.includes(req.body.skill)) {
        user[0].skills.push(req.body)
      } else {
        user[0].skills = user[0].skills.filter(skill => skill.skill !== req.body.skill)
      }
      return user[0].save() 
    })
    .then(user => res.status(202).json(user))
    .catch(err => res.json(err))
}

module.exports = { index, show, update, destroy, like, newSkill }