const express = require('express')
const router = express.Router()
const { updateUser, deleteUser } = require('../controllers/user')

// TODO: update route for user
router.put('/user', updateUser)

/**
 * @swagger
 * /api/user?{id}:
 *  delete:
 *      summary: Delete the user.
 *      description: AIP endpoint for deleting the user.
 *      responses:
 *          200:
 *              description: list of faculties.
 *          204:
 *              description: No entry Found
 *          500:
 *              description: Some Error Occured (server error).
 */
// TODO: delete route for user
router.delete('/user', deleteUser)

module.exports = router