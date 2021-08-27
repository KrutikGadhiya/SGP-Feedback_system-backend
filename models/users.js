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
  role: {
    type: String
  },
  otp: {
    type: Number
  }
}, { timestamps: true })

const UserModel = mongoose.model('User', UserSchema)
module.exports = UserModel
