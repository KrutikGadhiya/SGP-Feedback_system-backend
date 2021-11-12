const express = require('express')
const router = express.Router()
const auth = require('../middleware/requireLogin')
const { addCourses, getCouses, deleteCourses } = require('../controllers/cources')

/**
 * @swagger
 * /api/courses:
 *  post:
 *      summary: endpoint for adding Courses
 *      description: API endpoint for adding Courses 
 *      requestBody:
 *          require: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          name:
 *                              type: string
 *                          courseId:
 *                              type: string
 *                          sem:
 *                              type: number
 *                          year:
 *                              type: number
 *                          institute:
 *                              type: string
 *                          department:
 *                              type: string
 *                  example:
 *                      name: Computer Networks
 *                      courseId: IT352
 *                      sem: 5
 *                      year: 2019
 *                      institute: CSPIT
 *                      department: IT
 *      responses:
 *          200:
 *              description: Course added Successfully
 *          422:
 *              description: Please add all the fields / Course already Exist's with same name
 *          500:
 *              description: Some error Occured
 */
// TODO: router for adding course
router.post('/courses', auth, addCourses)

/**
 * @swagger
 * /api/courses?{institute}&{department}&{sem}&{year}:
 *  get:
 *      summary: get the Course list
 *      description: API for getting Course list
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
 *              description: no course found, (nothing is returned in the response)
 */
// TODO: router for getting course
router.get('/courses', auth, getCouses)

/**
 * @swagger
 * /api/courses?{id}:
 *  delete:
 *      summary: Delete the course.
 *      description: AIP endpoint for deleting the Course.
 *      parameters:
 *         - in: query
 *           name: id
 *           schema:
 *             type: string
 *           description: Course id
 *      responses:
 *          200:
 *              description: Course with {name} deleted Successfully
 *          500:
 *              description: Some Error Occured (server error).
 */
router.delete('/courses', auth, deleteCourses)

module.exports = router