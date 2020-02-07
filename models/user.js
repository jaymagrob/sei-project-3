const mongoose = require('mongoose')

const { skills, professions } = require('../config/environment')

const likeSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.ObjectId, ref: 'User', required: true }
}, {
  timestamps: true
})

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  bio: { type: String, maxlength: 350 },
  profileImage: { type: String },
  location: { type: String },
  level: { type: String, enum: ['Intern', 'Junior', 'Mid-Level', 'Senior'] },
  professions: [{ type: String, enum: professions }],
  skills: [{ type: String, enum: skills }],
  projects: [{ type: mongoose.Schema.ObjectId, ref: 'Project' }],
  likes: [likeSchema]
})

userSchema.virtual('createdProjects', {
  ref: 'Project',
  localField: '_id',
  foreignField: 'user'
})

userSchema.virtual('likedProjects', {
  ref: 'Project',
  localField: '_id',
  foreignField: 'likes.user'
})

// ! deleting password on user when sent to JSON
userSchema
  .set('toJSON', {
    virtuals: true, 
    transform(doc, json) {
      delete json.password
      return json
    }
  })

// ! Setting the password Confirmation virtual field 
userSchema
  .virtual('passwordConfirmation') 
  .set(function setPasswordConfirmaion(passwordConfirmation) {
    this._passwordConfirmation = passwordConfirmation
  })

userSchema
  .pre('validate', function checkPasswordMatch(next) {
    if (this.isModified('password') && this._passwordConfirmation !== this.password) {
      this.invalidate('PasswordConfirmation', 'does not match')
    }
    next()
  })

module.exports = mongoose.model('User', userSchema)