const express = require('express')
const router = express.Router()
const { feedbackQue, getFeedbackQue } = require('../controllers/feedbackQue')

/**
 * @swagger
 * /api/addfeedbackque:
 *  post:
 *      summary: Add feedback question list.
 *      description: API for feedback questions it takes 3 properties name, questions, createdBy.
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          name:
 *                                type: string
 *                          questions:
 *                                type: array
 *                                items:
 *                                  type: string
 *                          createdBy:
 *                                type: string
 *      responses:
 *          200:
 *              description: feedback questions list added Successfully
 *          422:
 *              description: feedback Question already exist's with the same name
 *          500:
 *              description: Some error Occured
 */
router.post('/addfeedbackque', feedbackQue)

/**
 * @swagger
 * /api/getfeedbackque?{id}:
 *  get:
 *      summary: get the feedback questions list
 *      description: API getting feedback questions list, all/specific the feedback questions that were created by the admin
 *      parameters:
 *         - in: query
 *           name: id
 *           schema:
 *             type: string
 *           description: id (_id) of the feedback question
 *      responses:
 *          200:
 *              description: gives all the feedback question 
 *          204:
 *              description: no feedback found
 */
router.get('/getfeedbackque', getFeedbackQue)
module.exports = router