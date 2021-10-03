const mongoose = require('mongoose')

const universitySchema = mongoose.Schema({
  institute: { type: String },
  department: { type: String },
  faculties: { type: [] },
  students: { type: [] },
  courses: { type: [] }
})

const universityModel = mongoose.model('University', universitySchema)

module.exports = universityModel