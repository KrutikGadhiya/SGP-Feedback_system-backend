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
 *      parameters:
 *         - in: query
 *           name: id
 *           schema:
 *             type: string
 *           description: id of user
 *      responses:
 *          200:
 *              description: User with {userName} and {email} deleted Successfully.
 *          500:
 *              description: Some Error Occured (server error).
 */
// TODO: delete route for user
router.delete('/user', deleteUser)

module.exports = router