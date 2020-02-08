const Project = require('../models/project') 

function index(req, res) { 
  Project 
    .find() 
    .populate('owner')
    .then(foundProjects => res.status(200).json(foundProjects))
    .catch(err => res.status(400).json(err))
}

function create(req, res) {
  req.body.user = req.currentUser 
  req.body.owner = req.currentUser
  req.body.collaborators = [req.body.owner]
  Project
    .create(req.body)
    .then(createdProject => res.status(201).json(createdProject)) 
    .catch(err => res.status(400).json(err))
}

function show(req, res) {
  Project
    .findById(req.params.id)
    .populate('owner')
    .populate('comments.user')
    .then(project => res.status(202).json(project))
    .catch(err => res.status(400).json(err))
}

function update(req, res, next) {
  Project
    .findById(req.params.id)
    .then(project => {
      if (!project) return res.status(404).json({ message: 'Not Found' })
      if (!project.owner.equals(req.currentUser._id)) return res.status(401).json({ message: 'Unauthorized' })
      Object.assign(project, req.body)
      project.save() 
    })
    .then(project => res.status(202).json(project))
    .catch(next)
}

function destroy(req, res) {
  Project
    .findById(req.params.id)
    .then(project => {
      if (!project) return res.status(404).json({ message: 'Not Found' })
      if (!project.owner.equals(req.currentUser._id)) return res.status(401).json({ message: 'Unauthorized' })
      else project.remove()
    })
    .then(() => res.sendStatus(204))
    .catch(err => res.status(400).json(err))
}

function commentCreate(req, res, next) { 
  // console.log('current user =', req.currentUser)
  req.body.user = req.currentUser
  // console.log('user =', req.body.user)
  Project
    .findById(req.params.id)
    .then(project => {
      if (!project) return res.status(404).json({ message: 'Not Found' })
      console.log('body =', req.body)
      project.comments.push(req.body)
      return project.save()
    })
    .then(project => res.status(201).json(project))
    .catch(next)
}

function commentDelete(req, res) { 
  Project
    .findById(req.params.id)
    .then(project => {
      if (!project) return res.status(404).json({ message: 'Not Found' })
      const comment = project.comments.id(req.params.commentId)
      if (!comment.user.equals(req.currentUser._id)) return res.status(401).json({ message: 'Unauthorized' })
      comment.remove()
      return project.save()
    })
    .catch(err => res.json(err))
}

function like(req, res) {
  Project
    .findById(req.params.id)
    .then(project => {
      if (!project) return res.status(404).json({ message: 'Not Found ' })
      if (project.likes.some(like => like.user.equals(req.currentUser._id))) return project
      project.likes.push({ user: req.currentUser })
      console.log('like was called')
      return project.save()
    })
    .then(project => res.status(202).json(project))
    .catch(err => res.json(err))
}


module.exports = { index, create, show, update, destroy, commentCreate, commentDelete, like }
