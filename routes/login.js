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
        const otp = Math.floor(100000 + Math.random() * 900000)
        bcrypt.hash(password, 12)
          .then(hashedPassword => {
            const newUser = new UserModel({
              userName,
              email,
              password: hashedPassword,
              role,
              otp
            })

            newUser.save()
              .then(savedUser => {
                // console.log(savedUser)
                sendMail(savedUser.email, otp)
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
 *              description: Invalid Email or Password
 *          404:
 *              description: SignUp first, no account found
 *          401:
 *              description: User not Verified
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
        return res.status(404).json({ message: "IT seems like You dont have an account, Sign-Up to continue" })
      }
      if (!savedUser.isVerified) {
        return res.status(401).json({ message: "User Not Verified" })
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
          return res.status(500).json({ message: "ASome Error Occured" })
        })
    })
    .catch(err => {
      console.log(err)
      return res.status(500).json({ message: "BSome Error Occured" })
    })
})


/**
 * @swagger
 * /verify:
 *  post:
 *      summary: User Verification
 *      description: API for User Verification and re-sending verification code to their Email. For re-sending verification code value of reSend = true and to verify code reSend = false
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          email:
 *                                type: string
 *                          otp:
 *                                type: number
 *                          reSend:
 *                                type: boolean
 *      responses:
 *          200:
 *              description: Otp Send to your Email
 *          203:
 *              description: Already Verified
 *          404:
 *              description: User Does Not Exist
 *          401:
 *              description: Wrong Otp
 *          500:
 *              description: Some error Occured
 */
router.post('/verify', (req, res) => {
  const { email, otp, reSend } = req.body
  if (reSend) {
    UserModel.findOne({ email })
      .then(user => {
        if (!user) {
          return res.status(404).json({ message: "User Does Not Exist!" })
        }
        if (user.isVerified) {
          return res.status(203).json({ message: "Already Verified" })
        }
        const newOtp = Math.floor(100000 + Math.random() * 900000)
        sendMail(user.email, newOtp)
        UserModel.updateOne({ _id: user._id }, { otp: newOtp })
          .then(updated => {
            console.log("updated")
            res.status(200).json({ message: "Otp Send to your Email" })
          })
          .catch(err => {
            return res.status(500).json({ message: "Some Error Occured" })
          })
      }).catch(err => {
        console.log(err)
        return res.status(500).json({ message: "Some Error Occured" })
      })
  } else {
    UserModel.findOne({ email })
      .then(user => {
        if (user.otp == otp) {
          UserModel.updateOne({ _id: user._id }, { isVerified: true })
            .then(updated => {
              // console.log(updated)
              // res.send(success())
              res.status(200).json({ message: "Verified Successfully" })
            })
            .catch(err => {
              // res.send(error())
              res.status(400).json({ message: "User not found" })
            })
        } else {
          res.status(401).json({ message: "Wrong Otp" })
        }
      }).catch(err => {
        console.log(err)
        return res.status(500).json({ message: "Some Error Occured" })
      })
  }
})


module.exports = router