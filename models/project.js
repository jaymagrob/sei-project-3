const mongoose = require('mongoose')

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
  owner: { type: String, required: true },
  collaborators: [{ type: mongoose.Schema.ObjectId, ref: 'User' }],
  description: { type: String, required: true },
  location: { type: String },
  images: [{ type: String }],
  completed: { type: Boolean },
  recuiting: { type: Boolean },
  skillsInvolved: [{  }],
  lookingFor: [{  }], 
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