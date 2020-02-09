/* global api, describe, it, expect, beforeEach, afterEach */
const User = require('../../models/user') 
const jwt = require('jsonwebtoken') 
const { secret } = require('../../config/environment') 

const testUserData = [{ 
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
}, {
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
}]

describe('PUT /users/:username', () => {
  let token1, token2, user1

  beforeEach(done => {
    User.create(testUserData)
      .then(users => {
        token1 = jwt.sign({ sub: users[0]._id }, secret, { expiresIn: '6h' }) 
        token2 = jwt.sign({ sub: users[1]._id }, secret, { expiresIn: '6h' }) 
        user1 = users[0]
      })
    done()
  })

  afterEach(done => { 
    User.deleteMany()
      .then(() => done())
  })

  it('should return a 401 response without a token', done => {
    api.put(`/api/users/${user1.username}`)
      .send({ message: 'Changing the message' })
      .end((err, res) => {
        expect(res.status).to.eq(401)
        done()
      })
  })

  it('should return a 202 response with a token', done => {
    api.put(`/api/users/${user1.username}`)
      .set('Authorization', `Bearer ${token1}`)
      .send({ message: 'Changing the message' })
      .end((err, res) => {
        expect(res.status).to.eq(202)
        done()
      })
  })

  it('should return an object', done => {
    api.put(`/api/users/${user1.username}`)
      .set('Authorization', `Bearer ${token1}`)
      .send({ message: 'Changing the message' })
      .end((err, res) => {
        expect(res.body).to.be.an('object')
        done()
      })
  })

  it('should return the correct fields', done => {
    api.put(`/api/users/${user1.username}`)
      .set('Authorization', `Bearer ${token1}`)
      .send({ message: 'Changing the message' })
      .end((err, res) => {
        expect(res.body).to.contains.keys([
          '_id',
          'message'
        ])
        done()
      })
  })

  it('should return the correct data types', done => {
    api.put(`/api/users/${user1.username}`)
      .set('Authorization', `Bearer ${token1}`)
      .send({ message: 'Changing the message' })
      .end((err, res) => {
        const project = res.body
        expect(project._id).to.be.a('string')

        done()
      })
  })

  it('should return a 401 response with a token for a user that did not create the resource', done => {
    api.put(`/api/users/${user1.username}`)
      .set('Authorization', `Bearer ${token2}`)
      .send({ message: 'Changing the message' })
      .end((err, res) => {
        expect(res.status).to.eq(401)
        done()
      })
  })

})