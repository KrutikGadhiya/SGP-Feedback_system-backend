const mongoose = require('mongoose')

const UserSchema = mongoose.Schema({
  userName: {
    type: String
  },
  email: {
    type: String
  },
  password: {
    type: String
  },
  isVerified: {
    type: Boolean,
    default: false
  },
  institute: {
    type: String
  },
  department: {
    type: String
  },
  sem: {
    type: Number
  },
  year: {
    type: Number
  },
  role: {
    type: String
  },
  otp: {
    type: Number
  }
}, { timestamps: true })

const UserModel = mongoose.model('User', UserSchema)
module.exports = UserModel
