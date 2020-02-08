const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

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
  pendingProjects: [{ type: mongoose.Schema.ObjectId, ref: 'Project' }],
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

// ! Compares hashed log in password with the password attached to the user
userSchema.methods.validatePassword = function validatePassword(password) {
  // console.log(password, this.password)
  return bcrypt.compareSync(password, this.password)
}

// ! Setting the password Confirmation virtual field 
userSchema
  .virtual('passwordConfirmation') 
  .set(function setPasswordConfirmaion(passwordConfirmation) {
    this._passwordConfirmation = passwordConfirmation
  })

// ! pre validation, checks that the password and passwordConfirmation match. If not, automatically invalidate the process
userSchema
  .pre('validate', function checkPasswordMatch(next) {
    if (this.isModified('password') && this._passwordConfirmation !== this.password) {
      this.invalidate('PasswordConfirmation', 'does not match')
    }
    next()
  })

// ! Pre saving the document, hash the bleedin password
userSchema
  .pre('save', function hashPassword(next) {
    if (this.isModified('password')) {
      this.password = bcrypt.hashSync(this.password, bcrypt.genSaltSync(8))
    }
    next()
  })

module.exports = mongoose.model('User', userSchema)