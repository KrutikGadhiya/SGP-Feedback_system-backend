const nodeMailer = require('nodemailer')
require('dotenv').config()

const transporter = nodeMailer.createTransport({
  service: process.env.EMAIL_SERVICE,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASS
  }
})

const sendMail = (to, otp) => {
  const option = {
    from: 'Sgp-feedback-system@outlook.com',
    to,
    subject: "Sign-Up Successfull Please Verify your E-mail",
    html: `<div style="background: #34495E; text-align:center; font-family: Helvetica Neue,Helvetica,Arial,sans-serif; color: #fff; padding: 4em 0;">
    <h2>Welcome To FeedSys</h2>
    <p>Please Verify your E-mail using the Verification Code, to continue further</p><br/><br/>
    <p style="width: 30%;  margin-left: 35%;  background: #2ECC71; padding: 0.5em; color: #fff; font-size: 2em; font-weight: 600;" >${otp}</p>
  </div>`
  }
  transporter.sendMail(option, (err, info) => {
    if (err) {
      console.log(err)
      return
    }
    // console.log(info)
  })
}

module.exports = sendMail