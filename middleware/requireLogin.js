const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
const UserModel = require('../models/users')
require('dotenv').config()

const requireLogin = (req, res, next) => {
  const { authorization } = req.headers

  if (!authorization) {
    return res.status(401).json({ message: "You Must Be Loged-In" })
  }
  const token = authorization.replace("Bearer ", "")
  jwt.verify(token, process.env.JWT_SECRET, (err, payload) => {
    if (err) {
      return res.status(401).json({ message: "You Must Be Loged-In" })
    }
    const { id } = payload
    UserModel.findById(id).then(userdata => {
      req.user = userdata

      next()
    })
  })
}

module.exports = requireLogin