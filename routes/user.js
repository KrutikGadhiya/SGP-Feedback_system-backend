const express = require('express')
const router = express.Router()
const auth = require('../middleware/requireLogin')
const { updateUser, deleteUser } = require('../controllers/user')

// TODO: update route for user
router.put('/user', auth, updateUser)

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
router.delete('/user', auth, deleteUser)

module.exports = router