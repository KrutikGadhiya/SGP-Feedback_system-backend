const express = require('express')
const router = express.Router()
const { addYearCourse, getYearCourse } = require('../controllers/yearCourse')

router.post('/yearCourse', addYearCourse)
router.get('/yearCourse', getYearCourse)

module.exports = router