const express = require('express')
const router = express.Router()
const auth = require('../middleware/requireLogin')
const { addFeedbackAns, getFeedbackAns, addCourseFeedbackAns, getCourseFeedbackAns } = require('../controllers/feedbackAns')


/**
 * @swagger
 * /api/feedbackAns:
 *  post:
 *      summary: endpoint for submited feedback answers
 *      description: API endpoint for submited feedbacks
 *      requestBody:
 *          require: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          feedbackId:
 *                              type: string
 *                          userId:
 *                              type: string
 *                          ans:
 *                              type: array
 *                  example:
 *                      feedbackId: 6183968b4d9fc31968d3aca3
 *                      userId: 617e7620121141000476e8e7
 *                      ans: [3, 2, 4, 4, 5, 5, 1, 4, 4, 3, 4, 5]
 *      responses:
 *          200:
 *              description: feedback Submitted Successfully
 *          422:
 *              description: Please add all the fields / feedback already Given
 *          500:
 *              description: Some error Occured
 */
// TODO: feedback ans post
router.post('/feedbackAns', auth, addFeedbackAns)

/**
 * @swagger
 *  /api/feedbackAns?{id}:
 *    get:
 *      summary: Endpoint for getting the Submited feedback Ans
 *      description: API for getting list of Submitted feedback Ans/response based on the faculty / course id
 *      parameters:
 *         - in: query
 *           name: id
 *           schema:
 *             type: string
 *           description: id of the faculty 
 *      responses:
 *          200:
 *              description: list of Feedback Ans/response
 *          422:
 *              description: id not found
 *          204:
 *              description: NO Content/ no feedback Answer found
 *          500:
 *              description: Some error Occured
 */
// TODO: feedback ans get
router.get('/feedbackAns', auth, getFeedbackAns)
/**
 * @swagger
 * /api/courseFeedbackAns:
 *  post:
 *      summary: endpoint for submited feedback answers
 *      description: API endpoint for submited feedbacks
 *      requestBody:
 *          require: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          feedbackId:
 *                              type: string
 *                          userId:
 *                              type: string
 *                          ans:
 *                              type: array
 *                  example:
 *                      feedbackId: 618d474746bd7d57300acec5
 *                      userId: 617e7620121141000476e8e7
 *                      ans: [3, 2, 4, 4, 5, 5, 1, 4, 4, 3, 4, 5]
 *      responses:
 *          200:
 *              description: feedback Submitted Successfully
 *          422:
 *              description: Please add all the fields / feedback already Given
 *          500:
 *              description: Some error Occured
 */
// TODO: feedback ans post
router.post('/courseFeedbackAns', auth, addCourseFeedbackAns)

/**
 * @swagger
 *  /api/courseFeedbackAns?{id}:
 *    get:
 *      summary: Endpoint for getting the Submited feedback Ans
 *      description: API for getting list of Submitted feedback Ans/response based on the faculty / course id
 *      parameters:
 *         - in: query
 *           name: id
 *           schema:
 *             type: string
 *           description: id of the course
 *      responses:
 *          200:
 *              description: list of Feedback Ans/response
 *          422:
 *              description: id not found
 *          204:
 *              description: NO Content/ no feedback Answer found
 *          500:
 *              description: Some error Occured
 */
// TODO: feedback ans get
router.get('/courseFeedbackAns', auth, getCourseFeedbackAns)

module.exports = router