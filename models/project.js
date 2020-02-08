const mongoose = require('mongoose')

const { skills } = require('../config/environment')
const { professions } = require('../config/environment')

//! creating comment schema
const commentSchema = new mongoose.Schema({
  text: { type: String, required: true, maxlength: 150 },
  user: { type: mongoose.Schema.ObjectId, ref: 'User', required: true }
}, {
  timestamps: true
})

//! creating like schema
const likeSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.ObjectId, ref: 'User', required: true }
}, {
  timestamps: true
})

//! creating project schema
const projectSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  owner: { type: mongoose.Schema.ObjectId, ref: 'User', required: true },
  collaborators: [{ type: mongoose.Schema.ObjectId, ref: 'User' }],
  description: { type: String, required: true },
  location: { type: String },
  images: [{ type: String }],
  completed: { type: Boolean, required: true },
  recuiting: { type: Boolean, required: true },
  skillsInvolved: [{ type: String, enum: skills }],
  lookingFor: [{ type: String, enum: professions }], 
  likes: [ likeSchema ],
  comments: [ commentSchema ]
}, {
  timestamps: true
})

//! creating virtual field for likes count on project schema
projectSchema
  .virtual('likeCount')
  .get(function() {
    return this.likes.length
  })

//! setting the virtual like count field
projectSchema.set('toJSON', { virtuals: true })

module.exports = mongoose.model('Project', projectSchema)