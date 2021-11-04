const express = require('express')
const router = express.Router()
const { addUniversity, getUniversity, getFacultyList } = require('../controllers/university')

/**
 * @swagger
 * /api/uniDetails:
 *  post:
 *      summary: For adding university's institute details
 *      description: 
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          institute:
 *                                type: string
 *                          department:
 *                                type: string
 *                          faculties:
 *                                type: array
 *                                items:
 *                                  type: string
 *                          sem:
 *                                type: number
 *                          courses:
 *                                type: array
 *                                items:
 *                                  type: string
 *                          year:
 *                                type: number
 *                  example:
 *                      institute: CSPIT
 *                      department: IT
 *                      faculties: ["faculty1", "faculty2", "faculty3"]
 *                      sem: 5
 *                      courses: ["course1", "course2", "course3"]
 *                      year: 2021
 *      responses:
 *          200:
 *              description: Added Successfully
 *          422:
 *              description: Already Exists or Please Add all the fields
 *          500:
 *              description: Some error Occured
 */

router.post('/uniDetails', addUniversity)

/**
 * @swagger
 * /api/uniDetails?{institute}&{department}&{sem}&{year}:
 *  get:
 *      summary: get the institute/department/faculties details.
 *      description: API faculty/students/course details after providing institute or department as paamater. NOTE- if nothing is provided, details of every department in every institute is returned.
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
 *              description: all the details according to parameters.
 *          204:
 *              description: No entry Found, no department in institute exist. (nothing is returned in the response)
 *          500:
 *              description: Some Error Occured (server error).
 */
router.get('/uniDetails', getUniversity)

/**
 * @swagger
 * /api/faculty:
 *  get:
 *      summary: get the faculties details.
 *      description: get the faculty details for the newFeesback
 *      responses:
 *          200:
 *              description: list of faculties.
 *          204:
 *              description: No entry Found
 *          500:
 *              description: Some Error Occured (server error).
 */
router.get('/faculty', getFacultyList)
module.exports = router