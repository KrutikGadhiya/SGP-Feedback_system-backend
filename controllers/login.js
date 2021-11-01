const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const sendMail = require('../connection/sendMail')
const UserModel = require('../models/users')

// sem ans user shoud be calculated in frontend and sent to backend
const signup = (req, res) => {
  const { userName, email, password, role, institute, department, sem, year } = req.body
  if (!userName || !email || !password || !role || !institute || !department) {
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
              otp,
              institute,
              department,
              sem,
              year
            })

            newUser.save()
              .then(savedUser => {
                // console.log(savedUser)
                sendMail(savedUser.email, otp)
                res.status(200).json({ message: "Signed-Up Successfully, Please Verify your Email to continue" })
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
}

const login = (req, res) => {
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
            const { _id, userName, email, role, isVerified, institute, department, sem, year } = savedUser
            if (!sem && !year) res.status(200).json({ token, _id, userName, email, role, isVerified, institute, department })
            else res.status(200).json({ token, _id, userName, email, role, isVerified, institute, department, sem, year })
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
}

const verify = (req, res) => {
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
}

const getUser = async (req, res) => {
  const { id } = req.query
  try {
    const savedUser = await UserModel.findById(id)
    if (!savedUser) return res.status(404).json({ message: "User does not exist" })
    // console.log(savedUser)
    return res.json({
      isVerified: savedUser.isVerified,
      _id: savedUser._id,
      userName: savedUser.userName,
      email: savedUser.email,
      role: savedUser.role,
      createdAt: savedUser.createdAt,
      updatedAt: savedUser.updatedAt,
      department: savedUser.department,
      institute: savedUser.institute,
      sem: savedUser.sem,
      year: savedUser.year
    })
  } catch (err) {
    console.log(err)
    return res.status(500).json({ message: "Some Error Occured" })
  }
}

module.exports = { login, signup, verify, getUser }