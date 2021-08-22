const express = require('express')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const sendMail = require('../connection/sendMail')
const success = require('../document/success')
const error = require('../document/error')
const router = express.Router()
const UserModel = require('../models/users')

/**
 * @swagger
 * /signUp:
 *  post:
 *      summary: User SignUP
 *      description: API for User SignUp, this API takes 4 properties userName, password, email, role
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          email:
 *                                type: string
 *                          password:
 *                                type: string
 *                          userName:
 *                                type: string
 *                          role:
 *                                type: string
 *      responses:
 *          200:
 *              description: Signed-IN Successfully
 *          422:
 *              description: Invalid Email or Password
 *          500:
 *              description: Some error Occured
 */
router.post('/signUp', (req, res) => {
  const { userName, email, password, role } = req.body
  if (!userName || !email || !password || !role) {
    return res.status(422).json({ message: "Please add all the Fields!!" })
  }
  UserModel.findOne({ email: email })
    .then(user => {
      if (user) {
        return res.status(422).json({ message: "User Already Exists with the same E-mail" })
      } else {
        bcrypt.hash(password, 12)
          .then(hashedPassword => {
            const newUser = new UserModel({
              userName,
              email,
              password: hashedPassword,
              role
            })

            newUser.save()
              .then(savedUser => {
                // console.log(savedUser)
                sendMail(savedUser.email, `https://sgp-feedback-system.herokuapp.com/verify/${savedUser._id}`)
                res.json({ message: "Signed-Up Successfully, Please Verify your Email to continue" })
              })
              .catch(err => {
                console.log(err)
                return res.status(500).json({ message: "Some Error Occured" })
              })
          })
      }
    })
    .catch(err => {
      console.log(err)
      return res.status(500).json({ message: "Some Error Occured" })
    })
})

/**
 * @swagger
 * /login:
 *  post:
 *      summary: User Login
 *      description: API for User Login successfull login will response in json object having the token and few user details
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          email:
 *                                type: string
 *                          password:
 *                                type: string
 *      responses:
 *          200:
 *              description: Signed-IN Successfully
 *          422:
 *              description: Invalid Email or Password\
 *          500:
 *              description: Some error Occured
 */
router.post('/login', (req, res) => {
  const { email, password } = req.body
  if (!email || !password) {
    return res.status(422).json({ message: "Please add Email or Password" })
  }
  UserModel.findOne({ email: email })
    .then(savedUser => {
      if (!savedUser) {
        return res.status(422).json({ message: "IT seems like You dont have an account, Sign-Up to continue" })
      }
      bcrypt.compare(password, savedUser.password)
        .then(doMatch => {
          if (doMatch) {
            const token = jwt.sign({ id: savedUser._id }, process.env.JWT_SECRET, { expiresIn: '48h' })
            const { _id, userName, email, role, isVerified } = savedUser
            res.json({ token, _id, userName, email, role, isVerified })
          }
          else {
            return res.status(422).json({ message: "Invalid Email or Password!!" })
          }
        })
        .catch(err => {
          console.log(err)
          return res.status(500).json({ message: "Some Error Occured" })
        })
    })
    .catch(err => {
      console.log(err)
      return res.status(500).json({ message: "Some Error Occured" })
    })
})

router.get('/verify/:id', (req, res) => {
  id = req.params.id
  UserModel.findById(id)
    .then(result => {
      UserModel.updateOne({ _id: id }, { isVerified: true }).then(updated => {
        console.log(updated)
        res.send(success())
      })
    })
    .catch(err => {
      res.send(error())
    })
})
module.exports = router