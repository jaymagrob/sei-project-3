const router = require('express').Router()
const projects = require('../controllers/projects')
const users = require('../controllers/auth')
// const secureRoute = require('../lib/secureRoute')

router.route('/projects')
  .get(projects.index)
  .post(projects.create)

router.route('/projects/:id')
  .get(projects.show)
  .put(projects.update)
  .delete(projects.destroy)

router.route('/projects/:id/comments')
  .post(projects.commentCreate)

router.route('/projects/:id/comments/:commentId')
  .delete(projects.commentDelete)

router.route('/projects/:id/like')
  .get(projects.like)

router.route('/users')
  .get(users.index)

router.route('/users/:id')
  .get(users.show)
  .put(users.update)
  .delete(users.destroy)

router.route('/users/:id/like')
  .get(users.like)

router.route('/register')
  .post(users.register)

router.route('/login')
  .post(users.login)

router.route('/profile')
  .get(users.profile)

module.exports = router