const universityModel = require('../models/university')

const addUniversity = (req, res) => {
  const { institute, department, faculties, students, courses } = req.body
  if (!institute || !department || !faculties || !students || !courses) {
    return res.status(422).json({ message: "Please add all the fields!" })
  }

  universityModel.findOne({ institute }).then(found => {
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
        console.log(saved)
        return res.json({ message: "Added successfully" })
      }).catch(err => {
        return res.status(500).json({ message: "Some Error Occured" })
      })
    }
  })


}

module.exports = { addUniversity }