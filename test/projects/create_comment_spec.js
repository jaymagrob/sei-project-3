/* global api, describe, it, expect, beforeEach, afterEach */
const Project = require('../../models/project')
const User = require('../../models/user')
const jwt = require('jsonwebtoken') 
const { secret } = require('../../config/environment') 

const testUserData = {
  username: 'test',
  name: 'test',
  email: 'test@test',
  password: 'pass',
  passwordConfirmation: 'pass'
}

const commentCorrect = {
  text: 'This is text data'
}

const commentBlank = {
  text: ''
}

const commentTooLong = {
  text: 'Test data too long. Test data too long. Test data too long. Test data too long. Test data too long. Test data too long. Test data too long. Test data too long. Test data too long. Test data too long'
}

const commentTooLongWhiteSpace = {
  text: '                                                                                                                                                                '
}


describe('POST /projects/:id/comments', () => {

  let token, project

  beforeEach(done => {
    User.create(testUserData)
      .then(user => {
        token = jwt.sign({ sub: user._id }, secret, { expiresIn: '6h' }) 
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

  it('should return a 401 response without a token', done => {
    api.post(`/api/projects/${project._id}/comments`)
      .send(commentCorrect)
      .end((err, res) => {
        expect(res.status).to.eq(401)
        done()
      })
  })

  it('should return a 422 response, no body sent', done => {
    api.post(`/api/projects/${project._id}/comments`)
      .set('Authorization', `Bearer ${token}`)      
      .end((err, res) => {
        expect(res.status).to.eq(422)
        done()
      })
  })

  it('should return a 422 response, text too long', done => {
    api.post(`/api/projects/${project._id}/comments`)
      .set('Authorization', `Bearer ${token}`)
      .send(commentTooLong)
      .end((err, res) => {
        expect(res.status).to.eq(422)
        done()
      })
  })

  it('should return a 422 response, text too long (white space)', done => {
    api.post(`/api/projects/${project._id}/comments`)
      .set('Authorization', `Bearer ${token}`)
      .send(commentTooLongWhiteSpace)
      .end((err, res) => {
        expect(res.status).to.eq(422)
        done()
      })
  })

  it('should return a 422 response with blank data', done => {
    api.post(`/api/projects/${project._id}/comments`)
      .set('Authorization', `Bearer ${token}`)
      .send(commentBlank)
      .end((err, res) => {
        expect(res.status).to.eq(202)
        done()
      })
  })


  it('should return a 202 response with a token', done => {
    api.post(`/api/projects/${project._id}/comments`)
      .set('Authorization', `Bearer ${token}`)
      .send(commentCorrect)
      .end((err, res) => {
        expect(res.status).to.eq(202)
        done()
      })
  })

  it('should return an object', done => {
    api.post(`/api/projects/${project._id}/comments`)
      .set('Authorization', `Bearer ${token}`)
      .send(commentCorrect)
      .end((err, res) => {
        expect(res.body).to.be.an('object')
        done()
      })
  })



  // it('should return the correct data types', done => {
  //   api.put(`/api/projects/${project._id}`)
  //     .set('Authorization', `Bearer ${token}`)
  //     .send({ name: 'Test' })
  //     .end((err, res) => {
  //       const project = res.body
  //       expect(project._id).to.be.a('string')
  //       expect(project.name).to.be.a('string')
  //       expect(project.owner).to.be.an('object')
  //       expect(project.collaborators).to.be.an('array')
  //       expect(project.description).to.be.a('string')
  //       expect(project.location).to.be.a('string')
  //       expect(project.images).to.be.an('array')
  //       expect(project.skillsInvolved).to.be.an('array')
  //       expect(project.lookingFor).to.be.an('array')
  //       expect(project.likes).to.be.an('array')
  //       expect(project.comments).to.be.an('array')
  //       expect(project.completed).to.be.a('boolean')
  //       expect(project.recuiting).to.be.a('boolean')
  //       done()
  //     })
  // })

  // it('should return a 401 response with a token for a user that did not create the resource', done => {
  //   api.put(`/api/projects/${project._id}`)
  //     .set('Authorization', `Bearer ${incorrectToken}`)
  //     .send({ name: 'Test' })
  //     .end((err, res) => {
  //       expect(res.status).to.eq(401)
  //       done()
  //     })
  // })

})