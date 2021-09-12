const express = require('express')
const router = express.Router()
const { feedbackQue } = require('../controllers/feedbackQue')

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

module.exports = router