const mongoose = require('mongoose')

const yearCourseSchema = mongoose.Schema({
  year: {
    type: Number
  },
  courses: {
    type: []
  },
  sem: {
    type: Number
  }
})

const yearCourseModel = mongoose.model('yearCourse', yearCourseSchema)
module.exports = yearCourseModel