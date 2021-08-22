const nodeMailer = require('nodemailer')

const transporter = nodeMailer.createTransport({
  service: 'hotmail',
  auth: {
    user: 'Sgp-feedback-system@outlook.com',
    pass: 'Abc@123456789'
  }
})

const sendMail = (to, link) => {
  const option = {
    from: 'Sgp-feedback-system@outlook.com',
    to,
    subject: "Sign-Up Successfull Please Verify your E-mail",
    html: `<div style="background: #34495E; text-align:center; font-family: Helvetica Neue,Helvetica,Arial,sans-serif; color: #fff; padding: 4em 0;">
    <h2>Welcome To Feedback-System</h2>
    <p>Please Verify your E-mail, To Continue further</p><br/><br/>
    <a style="text-decoration: none; background: #2ECC71; padding: 1em; color: #fff; font-size: 1.2em; font-weight: 600;" href=${link} target="_blank">Verify Me!!</a>
  </div>`
  }
  transporter.sendMail(option, (err, info) => {
    if (err) {
      console.log(err)
      return
    }
    console.log(info)
  })
}

module.exports = sendMail