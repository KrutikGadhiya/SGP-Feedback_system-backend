const express = require('express')
const router = express.Router()
const { newfeed, getFeedbackList } = require('../controllers/newFeedback')


/**
 * @swagger
 * /api/newFeedback:
 *  post:
 *      summary: Add new feedback.
 *      description: API for new feedback.
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          name:
 *                                type: string
 *                          description:
 *                                type: string
 *                          feedbackFor:
 *                                type: array
 *                                items:
 *                                  type: string
 *                          createdBy:
 *                                type: string
 *                          feedbackQuestions:
 *                                type: string
 *                                default: "613da2c057719d0f0055c8e0"
 *                          dueFrom:
 *                                type: string
 *                          dueTo:
 *                                type: string
 *      responses:
 *          200:
 *              description: feedback added Successfully
 *          422:
 *              description: feedback already exist's with the same name
 *          500:
 *              description: Some error Occured
 */
router.post('/newFeedback', newfeed)

/**
 * @swagger
 * /api/getfeedbacklist?{institute}&{department}&{sem}&{year}:
 *  get:
 *      summary: get the feedback list
 *      description: API getting feedback list, all the feedback
 *      parameters:
 *         - in: query
 *           name: institute
 *           schema:
 *             type: string
 *           description: name of the Institute
 *         - in: query
 *           name: department
 *           schema:
 *             type: string
 *           description: name of the Department
 *         - in: query
 *           name: sem
 *           schema:
 *             type: number
 *           description: semister
 *         - in: query
 *           name: year
 *           schema:
 *             type: number
 *           description: year
 *      responses:
 *          200:
 *              description: gives all the feedback
 *          204:
 *              description: no feedback found, (nothing is returned in the response)
 */
router.get('/getfeedbacklist', getFeedbackList)
module.exports = router