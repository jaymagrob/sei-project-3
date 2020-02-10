const User = require('../models/user')

// all users profiles
function index(req, res) {
  User
    .find()
    .populate('pendingProjects')
    .then(foundUsers => res.status(200).json(foundUsers))
    .catch(err => res.status(400).json(err))
}

// need to change the findby id to find username - also needs to be changed on front end -- same with likes
function show(req, res) {
  User
    .findOne({ username: req.params.username })
    .populate('createdProjects')
    .populate('collaboratedProjects')
    .populate('pendingCollaborators')
    .then(user => {
      if (!user) return res.status(404).json({ message: 'Not Found' })
      res.status(202).json(user)
    })
    .catch(err => res.status(400).json(err))
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
    .findOne({ username: req.params.username })
    .then(user => {
      if (!user) return res.status(404).json({ message: 'Not Found ' })
      if (req.currentUser._id.toString() === user._id.toString()) return res.status(401).json({ message: 'Unauthorized' })
      const skill = user.skills.id(req.params.skill)
      const users = skill.likes.map(like => like.user)
      if (!users.includes(req.currentUser._id)) {
        skill.likes.push({ user: req.currentUser._id })
      } else {
        const newLikes = skill.likes.filter(like => like.user._id.toString() !== req.currentUser._id.toString())
        skill.likes = newLikes
      }
      return user.save()
    })
    .then(user => res.status(202).json(user))
    .catch(err => res.status(400).json(err))
}

function newSkill(req, res) {
  User
    .findOne({ username: req.params.username })
    .then(user => {
      if (!user) return res.status(404).json({ message: 'Not Found ' })
      if (req.currentUser._id.toString() !== user._id.toString()) return res.status(401).json({ message: 'Unauthorized' })
      const skills = user.skills.map(skill => skill.skill)
      if (!skills.includes(req.body.skill)) {
        user.skills.push(req.body)
      } else {
        user.skills = user.skills.filter(skill => skill.skill !== req.body.skill)
      }
      return user.save() 
    })
    .then(user => res.status(202).json(user))
    .catch(err => res.status(400).json(err))
}

function userPendingProject(req, res) {
  User
    .findById(req.body.user)
    .then(user => {
      if (!user) return res.status(404).json({ message: 'Not Found ' })
      if (req.currentUser._id.toString() !==  req.body.user.toString() && req.currentUser._id.toString() !== req.body.owner.toString()) {
        return res.status(401).json({ message: 'Unauthorized' })
      }
      const projects = user.pendingProjects.map(project => project.project)
      if (projects.includes(req.body.project.project)) return user.save()
      if (req.body.user.toString() === req.currentUser._id.toString()) {
        req.body.project.user = true
        user.pendingProjects.push(req.body.project) // somehow find the project relating to that id 
      } else if (req.body.owner.toString() === req.currentUser._id.toString()) {
        req.body.project.owner = true
        user.pendingProjects.push(req.body.project)
      }
      return user.save()
    })
    .then(user => res.status(202).json(user))
    .catch(err => res.status(400).json(err))
}

function deletePendingProject(req, res) {
  User
    .findOne({ username: req.params.username })
    .then(user => {
      if (!user) return res.status(404).json({ message: 'Not Found ' })
      const newPending = user.pendingProjects.filter(project => project.project.toString() !== req.params.projectId.toString())
      user.pendingProjects = newPending
      return user.save()
    })
    .then(user => res.status(202).json(user))
    .catch(err => res.status(400).json(err))
}

function acceptPendingProject(req, res) {
  User
    .findOne({ username: req.params.username })
    .populate('pendingProjects.project')
    .then(user => {
      if (!user) return res.status(404).json({ message: 'Not Found ' })
      const pendingProject = user.pendingProjects.find(pendingProject => pendingProject.project._id.toString() === req.params.projectId.toString())
      if (user._id.toString() === req.currentUser._id.toString()) {
        pendingProject.user = true
      } else if (req.currentUser._id.toString() === pendingProject.project.owner.toString()) {
        pendingProject.owner = true
      } else {
        return res.status(401).json({ message: 'Unauthorized' })
      }
      if (pendingProject.owner === true && pendingProject.user === true) {
        pendingProject.project.collaborators.push(user)
        pendingProject.remove()
        pendingProject.project.save()
        return user.save()
      }
    })
    .then(user => res.status(202).json(user))
    .catch(err => res.status(400).json(err))
}

module.exports = { index, show, update, destroy, like, newSkill, userPendingProject, deletePendingProject, acceptPendingProject }