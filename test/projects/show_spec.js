/* global api, describe, it, expect, beforeEach, afterEach */
const Project = require('../../models/project')
const User = require('../../models/user') 

describe('GET /project/:id', () => {

  let project

  beforeEach(done => {
    User.create({
      username: 'test1',
      name: 'test1',
      email: 'test1@email',
      password: 'pass',
      passwordConfirmation: 'pass'
    })
      .then(user => {
        return Project.create({
          name: 'Project 1',
          collaborators: [],
          description: 'This is a description of project 1',
          location: 'Glasgow',
          images: ['http://via.placeholder.com/360x360','http://via.placeholder.com/360x360'],
          completed: true,
          recuiting: false,
          owner: user 
        })
      })
      .then(createdProject => {
        project = createdProject 
        done()
      })
  })

  afterEach(done => {
    User.deleteMany()
      .then(() => Project.deleteMany())
      .then(() => done())
  })

  it('should return a 404 not found for an invalid project id', done => {
    api.get('/api/projects/1234')
      .end((err, res) => {
        expect(res.status).to.eq(404)
        done()
      })
  })

  it('should return a 200 response', done => {
    api.get(`/api/projects/${project._id}`) 
      .end((err, res) => {
        expect(res.status).to.eq(200)
        done()
      })
  })

  it('should return an object', done => {
    api.get(`/api/projects/${project._id}`) 
      .end((err, res) => {
        expect(res.body).to.be.an('object')
        done()
      })
  })

  it('should return the correct fields', done => {
    api.get(`/api/projects/${project._id}`)
      .end((err, res) => {
        expect(res.body).to.contains.keys([
          '_id',
          'name',
          'owner',
          'collaborators',
          'description',
          'location',
          'images',
          'skillsInvolved',
          'lookingFor',
          'likes',
          'comments',
          'completed',
          'recuiting'
        ])
        done()
      })
  })

  it('should return the correct data types', done => {
    api.get(`/api/projects/${project._id}`)
      .end((err, res) => {
        const project = res.body
        expect(project._id).to.be.a('string')
        expect(project.name).to.be.a('string')
        expect(project.owner).to.be.an('object')
        expect(project.collaborators).to.be.an('array')
        expect(project.description).to.be.a('string')
        expect(project.location).to.be.a('string')
        expect(project.images).to.be.an('array')
        expect(project.skillsInvolved).to.be.an('array')
        expect(project.lookingFor).to.be.an('array')
        expect(project.likes).to.be.an('array')
        expect(project.comments).to.be.an('array')
        expect(project.completed).to.be.a('boolean')
        expect(project.recuiting).to.be.a('boolean')
        done()
      })
  })

})