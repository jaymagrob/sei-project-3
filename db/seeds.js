const mongoose = require('mongoose')
const { dbURI } = require('../config/environment')
const Project = require('../models/project')
const User = require('../models/user')

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true }, (err, db) => {
  if (err) return console.log(err)
  db.dropDatabase()
    .then(() => {
      return User.create([
        {
          usernameName: 'john',
          name: 'john',
          email: 'john@john.com',
          password: 'pass',
          passwordConfirmation: 'pass',
          bio: 'This is a bio for john and this is a test. More information to come',
          profileImage: 'https://www.fillmurray.com/g/200/200',
          location: 'Glasgow',
          level: 'Junior',
          skills: ['Illustration', '3d Modelling']
        },
        {
          usernameName: 'abi',
          name: 'abi',
          email: 'abi@abi.com',
          password: 'pass',
          passwordConfirmation: 'pass',
          bio: 'This is a bio for abi and this is a test. More information to come',
          profileImage: 'https://placebear.com/200/200',
          location: 'London',
          level: 'Mid-Level',
          skills: ['Graphic Design', 'Photography']
        },
        {
          usernameName: 'jos',
          name: 'jos',
          email: 'jos@jos.com',
          password: 'pass',
          passwordConfirmation: 'pass',
          bio: 'This is a bio for jos and this is a test. More information to come',
          profileImage: 'http://placekitten.com/g/200/200',
          location: 'Kent',
          level: 'Junior',
          skills: []
        },
        {
          usernameName: 'nic',
          name: 'nic',
          email: 'nic@nic.com',
          password: 'pass',
          passwordConfirmation: 'pass',
          bio: 'This is a bio for nic and this is a test. More information to come',
          profileImage: 'https://www.stevensegallery.com/200/200',
          location: 'Northern Ireland',
          level: 'Senior',
          skills: ['Illustration']
        }
      ])
    })
    .then(createdUser => {
      console.log(`${createdUser.length} users have been created`)
      return Project.create([
        {
          name: 'Project 1',
          owner: createdUser[0],
          collaborators: [],
          description: 'This is a description of project 1',
          location: 'Glasgow',
          images: ['http://via.placeholder.com/360x360','http://via.placeholder.com/360x360']
        },
        {
          name: 'Project 2',
          owner: createdUser[1],
          collaborators: [createdUser[0],createdUser[2]],
          description: 'This is a description of project 2',
          location: 'Glasgow',
          images: ['http://via.placeholder.com/360x360','http://via.placeholder.com/360x360']
        },
        {
          name: 'Project 3',
          owner: createdUser[3],
          collaborators: [createdUser[1]],
          description: 'This is a description of project 3',
          location: 'Glasgow',
          images: ['http://via.placeholder.com/360x360','http://via.placeholder.com/360x360']
        },
        {
          name: 'Project 4',
          owner: createdUser[2],
          collaborators: [createdUser[0],createdUser[1]],
          description: 'This is a description of project 4',
          location: 'Glasgow',
          images: ['http://via.placeholder.com/360x360','http://via.placeholder.com/360x360']
        }
      ])
    })
    .then(createdProjects => console.log(`${createdProjects.length} projects created`))
    .catch(err => console.log(err))
    .finally(() => mongoose.connection.close())
})