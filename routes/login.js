const express = require('express')
const router = express.Router()
const { login, signup, verify } = require('../controllers/login')

/**
 * @swagger
 * /api/signUp:
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
router.post('/signUp', signup)

/**
 * @swagger
 * /api/login:
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
router.post('/login', login)


/**
 * @swagger
 * /api/verify:
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
router.post('/verify', verify)


module.exports = router