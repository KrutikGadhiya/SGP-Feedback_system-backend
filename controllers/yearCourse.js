const yearCourseModel = require('../models/yearCourse')

// const addYearCourse = async (req, res) => {
const addYearCourse = async (req, res) => {
  // const { year, courses } = req.body
  const { year, courses, sem } = req
  // if (!year || !courses) return res.status(422).json({ message: "Please add all the fields!" })
  if (!year || !courses) return { message: "Please add all the fields!", status: 422 }
  try {
    const found = await yearCourseModel.findOne({ year, sem })
    // if (found) return res.status(422).json({ message: "Already Exist!"})
    if (found) return { message: "Already Exist!", status: 422 }
    else {
      const newYearCourse = new yearCourseModel({
        year,
        courses,
        sem
      })
      const saved = await newYearCourse.save()
      // if (saved) return res.json({ message: "Added successfully" })
      if (saved) return { message: "Added successfully", status: 200, _id: saved._id }
      // else return res.status(500).json({ message: "Some Error Occures" })
      else return { message: "Some Error Occures", status: 500 }
    }

  } catch (err) {
    console.log(err)
    // res.status(500).json({ message: "Some Error Occures" })
    return { message: "Some Error Occures", status: 500 }
  }

}

const getYearCourse = (req, res) => {

}

module.exports = { addYearCourse, getYearCourse }