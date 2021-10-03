const express = require('express')
const router = express.Router()
const { addUniversity } = require('../controllers/university')

/**
 * @swagger
 * /api/addUniversity:
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

router.post('/addUniversity', addUniversity)

module.exports = router