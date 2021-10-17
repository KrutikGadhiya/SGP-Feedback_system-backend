const express = require('express')
const router = express.Router()
const { addUniversity, getUniversity } = require('../controllers/university')

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
 *                          students:
 *                                type: array
 *                                items:
 *                                  type: string
 *                          courses:
 *                                type: array
 *                                items:
 *                                  type: string
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
 * /api/uniDetails?{institute}&{department}:
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
 *      responses:
 *          200:
 *              description: all the details according to parameters.
 *          204:
 *              description: No entry Found, no department in institute exist. (nothing is returned in the response)
 *          500:
 *              description: Some Error Occured (server error).
 */
router.get('/uniDetails', getUniversity)
module.exports = router