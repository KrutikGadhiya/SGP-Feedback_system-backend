const express = require('express')
const router = express.Router()
const { addFeedbackAns, getFeedbackAns } = require('../controllers/feedbackAns')


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
router.post('/feedbackAns', addFeedbackAns)

/**
 * @swagger
 *  /api/feedbackAns?{id}:
 *    get:
 *      summary: Endpoint for getting the Submited feedback Ans
 *      description: API for getting list of Submitted feedback Ans/response based on the feedbackId or userId (both of them are optional, if noting provided API will  give the list of all the feedback submited answer)
 *      parameters:
 *         - in: query
 *           name: id
 *           schema:
 *             type: string
 *           description: id of the faculty or course(not yet implemented)
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
router.get('/feedbackAns', getFeedbackAns)

module.exports = router