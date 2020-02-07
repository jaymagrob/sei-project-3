const router = require('express').Router()
const projects = require('../controllers/projects')
const auth = require('../controllers/auth')
const users = require('../controllers/users')
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
  .post(auth.register)

router.route('/login')
  .post(auth.login)

router.route('/profile')
  .get(auth.profile)

module.exports = router