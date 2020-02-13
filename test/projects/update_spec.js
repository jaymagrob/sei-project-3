/* global api, describe, it, expect, beforeEach, afterEach */
const Project = require('../../models/project')
const User = require('../../models/user') 
const jwt = require('jsonwebtoken') 
const { secret } = require('../../config/environment') 

const testUserData = [{ 
  username: 'test1',
  name: 'test1',
  email: 'test1@email',
  password: 'pass',
  passwordConfirmation: 'pass'
}, {
  username: 'test2',
  name: 'test2',
  email: 'test2@email',
  password: 'pass',
  passwordConfirmation: 'pass'
}]

describe('PUT /projects/:id', () => {
  let token, incorrectToken, project 

  beforeEach(done => {
    User.create(testUserData)
      .then(users => {
        token = jwt.sign({ sub: users[0]._id }, secret, { expiresIn: '6h' }) 
        return Project.create({
          name: 'Project 1',
          collaborators: [],
          description: 'This is a description of project 1',
          location: 'Glasgow',
          images: ['http://via.placeholder.com/360x360','http://via.placeholder.com/360x360'],
          completed: true,
          recruiting: false,
          owner: users[0] 
        })
      })
      .then(createdProject => {
        project = createdProject 
        // console.log(project)
      })
    done()
  })

  afterEach(done => { 
    User.deleteMany()
      .then(() => Project.deleteMany())
      .then(() => done())
  })

  it('should return a 401 response without a token', done => {
    api.put(`/api/projects/${project._id}`)
      .send({ name: 'Test' })
      .end((err, res) => {
        console.log(res)
        expect(res.status).to.eq(401)
        done()
      })
  })

  it('should return a 202 response with a token', done => {
    api.put(`/api/projects/${project._id}`)
      .set('Authorization', `Bearer ${token}`)
      .send({ name: 'Test' })
      .end((err, res) => {
        expect(res.status).to.eq(202)
        done()
      })
  })

  it('should return an object', done => { //! DONE
    api.put(`/api/projects/${project._id}`)
      .set('Authorization', `Bearer ${token}`)
      .send({ name: 'Project 2' })
      .end((err, res) => {
        expect(res.body).to.be.an('object')
        done()
      })
  })

  it('should return the correct fields', done => {
    api.put(`/api/projects/${project._id}`)
      .set('Authorization', `Bearer ${token}`)
      .send({ name: 'Project 2' })
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
          'recruiting'
        ])
        done()
      })
  })

  it('should return the correct data types', done => {
    api.put(`/api/projects/${project._id}`)
      .set('Authorization', `Bearer ${token}`)
      .send({ name: 'Test' })
      .end((err, res) => {
        const project = res.body
        console.log(project)
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
        expect(project.recruiting).to.be.a('boolean')
        done()
      })
  })

  it('should return a 401 response with a token for a user that did not create the resource', done => {  // ! DONE
    api.put(`/api/projects/${project._id}`)
      .set('Authorization', `Bearer ${incorrectToken}`)
      .send({ name: 'Test' })
      .end((err, res) => {
        expect(res.status).to.eq(401)
        done()
      })
  })

})