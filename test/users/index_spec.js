/* global describe, beforeEach, afterEach, it, api, expect */

const Project = require('../../models/project') 
const User = require('../../models/user')


describe('GET /api/users', () => {
  beforeEach(done => {
    User.create([
      {
        username: 'test1',
        name: 'test1',
        email: 'test1@test1.com',
        password: 'pass',
        passwordConfirmation: 'pass',
        profileImage: 'test',
        location: 'Glasgow',
        bio: 'test',
        level: 'Intern',
        professions: [],
        skills: [],
        projects: [],
        pendingProjects: [],
        likes: []
      },
      {
        username: 'test2',
        name: 'test2',
        email: 'test2@test2.com',
        password: 'pass',
        passwordConfirmation: 'pass',
        profileImage: 'test',
        location: 'Glasgow',
        bio: 'test',
        level: 'Intern',
        professions: [],
        skills: [],
        projects: [],
        pendingProjects: [],
        likes: []
      },
      {
        username: 'test3',
        name: 'test3',
        email: 'test3@test1.com',
        password: 'pass',
        passwordConfirmation: 'pass',
        profileImage: 'test',
        location: 'Glasgow',
        bio: 'test',
        level: 'Intern',
        professions: [],
        skills: [],
        projects: [],
        pendingProjects: [],
        likes: []
      },
      {
        username: 'test4',
        name: 'test4',
        email: 'test4@test1.com',
        password: 'pass',
        passwordConfirmation: 'pass',
        profileImage: 'test',
        location: 'Glasgow',
        bio: 'test',
        level: 'Intern',
        professions: [],
        skills: [],
        projects: [],
        pendingProjects: [],
        likes: []
      }
    ])
      .then(() => done())
  })

  afterEach(done => {
    User.deleteMany()
      .then(() => Project.deleteMany())
      .then(() => done())
  })

  it('should return a 200 response', done => {
    api.get('/api/users')
      .end((err, res) => {
        expect(res.status).to.eq(200)
        done()
      })
  })
  it('should return an array', done => {
    api.get('/api/users')
      .end((err, res) => {
        expect(res.body).to.be.an('array')
        done()
      })
  })
  it('should return an array of objects', done => {
    api.get('/api/users')
      .end((err, res) => {
        res.body.forEach(project => {
          expect(project).to.be.an('object')
        })
        done()
      })
  })
  it('should return an array of objects with the correct fields', done => {
    api.get('/api/users')
      .end((err, res) => {
        res.body.forEach(project => {
          expect(project).to.contains.keys([
            '_id',
            '__v',
            'id',
            'username',
            'name',
            'email',
            'bio',
            'profileImage',
            'location',
            'level',
            'professions',
            'skills',
            'projects',
            'pendingProjects',
            'likes'
          ])
        })
        done()
      })
  })
  it('should return an array of objects with the correct fields and types of values', done => {
    api.get('/api/users')
      .end((err, res) => {
        console.log(res.body)
        res.body.forEach(project => {
          expect(project._id).to.be.a('string')
          expect(project.__v).to.be.a('number')
          expect(project.id).to.be.a('string')
          expect(project.username).to.be.a('string')
          expect(project.name).to.be.a('string')
          expect(project.email).to.be.a('string')
          expect(project.bio).to.be.a('string')
          expect(project.profileImage).to.be.a('string')
          expect(project.location).to.be.a('string')
          expect(project.level).to.be.a('string')
          expect(project.professions).to.be.an('array')
          expect(project.skills).to.be.an('array')
          expect(project.projects).to.be.an('array')
          expect(project.pendingProjects).to.be.an('array')
          expect(project.likes).to.be.an('array')
        })
        done()
      })
  })
})



