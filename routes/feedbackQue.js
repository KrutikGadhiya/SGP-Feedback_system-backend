const express = require('express')
const router = express.Router()
const auth = require('../middleware/requireLogin')
const { feedbackQue, getFeedbackQue, deleteFeedbackQue } = require('../controllers/feedbackQue')

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
 *                  example:
 *                      name: my feedback question
 *                      questions: ["que1", "que2", "que3", "que4", "que5", "que6", "que7", "que8"]
 *                      createdBy: 61812acd6503120004690ae8
 *      responses:
 *          200:
 *              description: feedback questions list added Successfully
 *          422:
 *              description: feedback Question already exist's with the same name
 *          500:
 *              description: Some error Occured
 */
router.post('/addfeedbackque', auth, feedbackQue)

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
router.get('/getfeedbackque', auth, getFeedbackQue)

/**
 * @swagger
 * /api/feedbackQue?{id}:
 *  delete:
 *      summary: Delete the Feedback question Template.
 *      description: AIP endpoint for deleting the Feedback question template.
 *      parameters:
 *         - in: query
 *           name: id
 *           schema:
 *             type: string
 *           description: FeedbackQue id
 *      responses:
 *          200:
 *              description: feedbackQue with {name} deleted Successfully
 *          500:
 *              description: Some Error Occured (server error).
 */
router.delete('/feedbackQue', auth, deleteFeedbackQue)
module.exports = router