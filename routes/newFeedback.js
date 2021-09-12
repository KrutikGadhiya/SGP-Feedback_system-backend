const express = require('express')
const router = express.Router()
const { newfeed } = require('../controllers/newFeedback')


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

module.exports = router