const universityModel = require('../models/university')

const addUniversity = async (req, res) => {
  const { institute, department, faculties, students, courses } = req.body
  if (!institute || !department || !faculties || !students || !courses) {
    return res.status(422).json({ message: "Please add all the fields!" })
  }

  try {
    const found = await universityModel.findOne({ institute, department })
    if (found) return res.status(422).json({ message: "Already Exist!" })
    else {
      const newUniversity = new universityModel({
        institute,
        department,
        faculties,
        students,
        courses
      })

      newUniversity.save().then(saved => {
        // console.log(saved)
        return res.json({ message: "Added successfully" })
      })
    }
  }
  catch (err) {
    console.log(err)
    return res.status(500).json({ message: "Some Error Occured" })
  }
}

const getUniversity = async (req, res) => {
  const { institute, department } = req.query
  let uniList
  try {
    if (institute && department) { uniList = await universityModel.find({ institute: institute.toUpperCase(), department: department.toUpperCase() }) }
    else if (!institute && !department) { uniList = await universityModel.find() }
    else if (!institute) { uniList = await universityModel.find({ department: department.toUpperCase() }) }
    else if (!department) { uniList = await universityModel.find({ institute: institute.toUpperCase() }) }

    if (!uniList.length) return res.status(204) //No content: .json({ message: "No entry Found" })

    return res.json(uniList)

  } catch (error) {
    console.log(err)
    return res.status(500).json({ message: "Some Error Occured" })
  }
}

module.exports = { addUniversity, getUniversity }