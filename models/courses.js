const mongoose = require('mongoose')

const coursesSchema = mongoose.Schema({
  name: {
    type: String
  },
  courseId: {
    type: String
  },
  sem: {
    type: Number,
  },
  year: {
    type: Number,
  },
  institute: {
    type: String,
  },
  department: {
    type: String,
  }
}, { timestamps: true })

const coursesModel = mongoose.model('Courses', coursesSchema)
module.exports = coursesModel