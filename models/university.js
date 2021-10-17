const mongoose = require('mongoose')
const { ObjectId } = mongoose.Schema.Types

const universitySchema = mongoose.Schema({
  institute: { type: String },
  department: { type: String },
  faculties: { type: [] },
  // students: { type: [] },
  // courses: { type: [] }
  courses: { type: ObjectId, ref: 'yearCourse' },
  year: { type: Number },
  sem: { type: Number }
})

const universityModel = mongoose.model('University', universitySchema)

module.exports = universityModel