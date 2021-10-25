const universityModel = require('../models/university')
const { addYearCourse } = require('./yearCourse')

const addUniversity = async (req, res) => {
  const { institute, department, faculties, sem, courses, year } = req.body
  if (!institute || !department || !faculties || !sem || !courses || !year) {
    return res.status(422).json({ message: "Please add all the fields!" })
  }

  try {
    const found = await universityModel.findOne({ institute, department, sem, year })
    if (found) return res.status(422).json({ message: "Already Exist!" })
    else {
      const savedYearCourse = await addYearCourse({ year, courses, sem })
      if (savedYearCourse.status === 200) {
        const newUniversity = new universityModel({
          institute,
          department,
          faculties,
          sem,
          courses: savedYearCourse._id,
          year
        })

        newUniversity.save().then(saved => {
          // console.log(saved)
          return res.json({ message: "Added successfully" })

        })
      } else {
        return res.status(500).json({ message: "Some Error Occured" })
      }
    }
  }
  catch (err) {
    console.log(err)
    return res.status(500).json({ message: "Some Error Occured" })
  }
}

const getUniversity = async (req, res) => {
  const { institute, department, sem, year } = req.query
  let uniList
  try {
    if (institute && department) { uniList = await universityModel.find({ institute: institute.toUpperCase(), department: department.toUpperCase() }).populate("courses") }
    else if (!institute && !department) { uniList = await universityModel.find().populate("courses") }
    else if (!institute) { uniList = await universityModel.find({ department: department.toUpperCase() }).populate("courses") }
    else if (!department) { uniList = await universityModel.find({ institute: institute.toUpperCase() }).populate("courses") }

    if (!uniList.length) return res.status(204) //No content: .json({ message: "No entry Found" })

    if (sem && year) return res.json(uniList.filter((detail) => detail.sem == sem && detail.year == year))
    else if (sem && !year) return res.json(uniList.filter((detail) => detail.sem == sem))
    else if (!sem && year) return res.json(uniList.filter((detail) => detail.year == year))
    else if (!sem && !year) return res.json(uniList)

  } catch (err) {
    console.log(err)
    return res.status(500).json({ message: "Some Error Occured" })
  }
}

module.exports = { addUniversity, getUniversity }