const mongoose = require('mongoose')

const { skills } = require('../config/environment')

const likeSchema = mongoose.Schema({
  user: { type: mongoose.Schema.ObjectId, ref: 'User', required: true }
}, {
  timestamps: true
})

const userSchema = mongoose.Schema({
  usernameName: { type: String, require: true, unique: true },
  name: { type: String, require: true },
  email: { type: String, require: true, unique: true },
  password: { type: String, require: true },
  bio: { type: String, maxlength: 350 },
  profileImage: { type: String },
  location: { type: String },
  level: { type: String, enum: ['Junior', 'Mid-Level', 'Senior'] },
  skills: { type: String, enum: skills },
  projects: [{ type: mongoose.Schema.ObjectId, ref: 'Project' }],
  likes: [likeSchema]
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
  .virtual('passwordConfirmaion') 
  .set(function setPasswordConfirmaion(passwordConfirmaion) {
    this._passwordConfirmation = passwordConfirmaion
  })

userSchema
  .pre('validate', function checkPasswordMatch(next) {
    if (this.isModified('password') && this._passwordConfirmation !== this.password) {
      this.invalidate('PasswordConfirmation', 'does not match')
    }
    next()
  })

module.exports = mongoose.model('User', userSchema)