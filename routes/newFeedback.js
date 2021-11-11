const express = require('express')
const router = express.Router()
const auth = require('../middleware/requireLogin')
const { newfeed, getFeedbackList, deleteFeedback, newCoursefeed, getCourseFeedbackList } = require('../controllers/newFeedback')


/**
 * @swagger
 * /api/newFeedback:
 *  post:
 *      summary: Add new Faculty feedback.
 *      description: API for new Faculty feedback.
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
 *                                type: object
 *                                properties:
 *                                  sem:
 *                                    type: number
 *                                  year:
 *                                    type: number
 *                                  institute:
 *                                    type: string
 *                                  department:
 *                                    type: string
 *                          createdBy:
 *                                type: string
 *                          feedbackQuestions:
 *                                type: string
 *                                default: "613da2c057719d0f0055c8e0"
 *                          dueFrom:
 *                                type: string
 *                          dueTo:
 *                                type: string
 *                  example:
 *                      name: Feedback 4.0
 *                      description: Feedback for 19IT, Annual Faculty Feedback
 *                      feedbackFor: {sem: 5, year: 2021, institute: CSPIT, department: IT}
 *                      createdBy: 61812acd6503120004690ae8
 *                      feedbackQuestions: 6176a7847af5f424242e7275
 *                      feedbackOf: 617e7b5e121141000476e8f7
 *                      dueFrom: 2021-11-04T08:04:52.642Z
 *                      dueTo: 2021-12-04T08:04:52.642Z
 *      responses:
 *          200:
 *              description: feedback added Successfully
 *          422:
 *              description: feedback already exist's with the same name
 *          500:
 *              description: Some error Occured
 */
router.post('/newFeedback', auth, newfeed)
/**
 * @swagger
 * /api/courseFeedback:
 *  post:
 *      summary: Add new Course feedback.
 *      description: API for new Course feedback.
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
 *                                type: object
 *                                properties:
 *                                  sem:
 *                                    type: number
 *                                  year:
 *                                    type: number
 *                                  institute:
 *                                    type: string
 *                                  department:
 *                                    type: string
 *                          createdBy:
 *                                type: string
 *                          feedbackQuestions:
 *                                type: string
 *                                default: "613da2c057719d0f0055c8e0"
 *                          dueFrom:
 *                                type: string
 *                          dueTo:
 *                                type: string
 *                  example:
 *                      name: PY Feedback
 *                      description: Feedback for Python Programming course
 *                      feedbackFor: {sem: 5, year: 2021, institute: CSPIT, department: IT}
 *                      createdBy: 61812acd6503120004690ae8
 *                      feedbackQuestions: 6176a7847af5f424242e7275
 *                      feedbackOf: 618be79b42db1e2a78a3715b
 *                      dueFrom: 2021-11-04T08:04:52.642Z
 *                      dueTo: 2021-12-04T08:04:52.642Z
 *      responses:
 *          200:
 *              description: feedback added Successfully
 *          422:
 *              description: feedback already exist's with the same name
 *          500:
 *              description: Some error Occured
 */
router.post('/courseFeedback', auth, newCoursefeed)

/**
 * @swagger
 * /api/courseFeedback?{institute}&{department}&{sem}&{year}:
 *  get:
 *      summary: get the course feedback list
 *      description: API getting course feedback list, all the feedback
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
 *              description: gives all the course feedback depending upon the parameters
 *          204:
 *              description: no feedback found, (nothing is returned in the response)
 */
router.get('/courseFeedback', auth, getCourseFeedbackList)

/**
 * @swagger
 * /api/feedback?{id}:
 *  delete:
 *      summary: Delete the Feedback.
 *      description: AIP endpoint for deleting the Feedback.
 *      parameters:
 *         - in: query
 *           name: id
 *           schema:
 *             type: string
 *           description: Feedback id
 *      responses:
 *          200:
 *              description: feedback with {name} deleted Successfully
 *          500:
 *              description: Some Error Occured (server error).
 */
router.delete('/feedback', auth, deleteFeedback)
module.exports = router