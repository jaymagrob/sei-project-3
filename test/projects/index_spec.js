/* global describe, beforeEach, afterEach, it, api, expect */

const Project = require('../../models/project') // HOLD FOR PROJECTS
const User = require('../../models/user')  // HOLD FOR USER


describe('GET /projects', () => {
  beforeEach(done => {
    User.create({
      username: 'test',
      name: 'test',
      email: 'test@test.com',
      password: 'pass',
      passwordConfirmation: 'pass'
    })
      .then(user => {
        Project.create([
          {
            name: 'Project 1',
            owner: user,
            collaborators: [],
            description: 'This is a description of project 1',
            location: 'Glasgow',
            images: ['http://via.placeholder.com/360x360','http://via.placeholder.com/360x360']
          },
          {
            name: 'Project 2',
            owner: user,
            collaborators: [],
            description: 'This is a description of project 2',
            location: 'Glasgow',
            images: ['http://via.placeholder.com/360x360','http://via.placeholder.com/360x360']
          }
        ])
      })
      .then(() => done())
  })
  afterEach(done => {
    User.deleteMany()
      .then(() => Project.deleteMany())
      .then(() => done())
  })

  // Should return a 200 response test
  it('should return a 200 response', done => {
    api.get('/projects')
      .end((err, res) => {
        expect(res.status).to.eq(200)
        done()
      })
  })
  it('should return an array', done => {
    api.get('/projects')
      .end((err, res) => {
        expect(res.body).to.be.an('array')
        done()
      })
  })
  it('should return an array of objects', done => {
    api.get('/projects')
      .end((err, res) => {
        res.body.forEach(project => {
          expect(project).to.be.an('object')
        })
        done()
      })
  })
  it('should return an array of objects with the correct fields', done => {
    api.get('/projects')
      .end((err, res) => {
        res.body.forEach(project => {
          expect(project).to.contains.keys([
            // List all keys
          ])
        })
        done()
      })
  })
  it('should return an array of objects with the correct fields and types of values', done => {
    api.get('/projects')
      .end((err, res) => {
        res.body.forEach(project => {
          //expect(project.KEY).to.be.a(DATA TYPE)
          //expect(project.KEY2).to.be.a(DATA TYPE)
        })
        done()
      })
  })
})