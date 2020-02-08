/* global api, describe, it, expect, beforeEach, afterEach */
const Project = require('../../models/project')
const User = require('../../models/user')
const jwt = require('jsonwebtoken') // we need our jwt token and secret here, remeber our create request need a real valid user token to work correctly, so we will need to create and sign one.
const { secret } = require('../../config/environment') // and our secret to encode that token with

const testProject = {
  name: 'Project 1',
  collaborators: [],
  description: 'This is a description of project 1',
  location: 'Glasgow',
  images: ['http://via.placeholder.com/360x360','http://via.placeholder.com/360x360'],
  completed: true,
  recuiting: false            
}

const testProjectMissingData = {
  name: 'Project 1',
  collaborators: [],
  description: 'This is a description of project 1',
  location: 'Glasgow',
  images: ['http://via.placeholder.com/360x360','http://via.placeholder.com/360x360']
  
}



const testUserData = {
  username: 'test',
  name: 'test',
  email: 'testk@email',
  password: 'test',
  passwordConfirmation: 'test'
}

describe('POST /api/projects', () => {

  let token

  beforeEach(done => {
    User.create(testUserData)
      .then(user => {
        token = jwt.sign({ sub: user._id }, secret, { expiresIn: '6h' })
        done()
      })
  })

  afterEach(done => { 
    User.deleteMany()
      .then(() => Project.deleteMany())
      .then(() => done())
  })

  it('should return a 401 response without a token', done => {
    api.post('/api/projects')
      .send(testProject)
      .end((err, res) => {
        expect(res.status).to.eq(401)
        done()
      })
  })

  it('should return a 422 response with wrong data', done => {
    api.post('/api/projects')
      .set('Authorization', `Bearer ${token}`) // <===== using our token here from the created uer above!
      .send(testProjectMissingData)
      .end((err, res) => {
        expect(res.status).to.eq(422)
        done()
      })
  })

  it('should return a 201 response with a token', done => {
    api.post('/api/projects')
      .set('Authorization', `Bearer ${token}`) // <===== using our token here from the created uer above!
      .send(testProject)
      .end((err, res) => {
        expect(res.status).to.eq(201)
        done()
      })
  })

  it('should return a 201 response with a token', done => {
    api.post('/api/projects')
      .set('Authorization', `Bearer ${token}`) // <===== using our token here from the created uer above!
      .send(testProject)
      .end((err, res) => {
        expect(res.status).to.eq(201)
        done()
      })
  })

  it('should return an object', done => {
    api.post('/api/projects')
      .set('Authorization', `Bearer ${token}`)
      .send(testProject)
      .end((err, res) => {
        expect(res.body).to.be.an('object')
        done()
      })
  })

  it('should return the correct fields', done => {
    api.post('/api/projects')
      .set('Authorization', `Bearer ${token}`)
      .send(testProject)
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
    api.post('/api/projects')
      .set('Authorization', `Bearer ${token}`)
      .send(testProject)
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
