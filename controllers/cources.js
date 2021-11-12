const coursesModel = require('../models/courses')

const addCourses = async (req, res) => {
  const { name, courseId, sem, year, institute, department } = req.body
  if (!name || !courseId || !sem || !year || !institute || !department)
    return res.status(422).json({ message: "Please add all the Field's" })
  try {
    const found = await coursesModel.findOne({ courseId })
    if (found) return res.status(422).json({ message: "Course Already exist's with the same courseId" })
    const newCourse = new coursesModel({
      name,
      courseId,
      sem,
      year,
      institute,
      department
    })
    const saved = await newCourse.save()
    console.log(saved)
    res.json({ message: `Course: ${saved.name} (${saved.courseId}) added successfully` })
  } catch (err) {
    console.log(err)
    return res.status(500).json({ message: "Some Error Occured!" })
  }
}

const getCouses = async (req, res) => {
  const { institute, department, sem, year } = req.query
  try {
    let courseList = await coursesModel.find()
    // let finalLst

    if (institute && department) { courseList = courseList.filter((dtl) => dtl.institute == institute && dtl.department == department) }
    else if (!institute && department) { courseList = courseList.filter((dtl) => dtl.department == department) }
    else if (institute && !department) { courseList = courseList.filter((dtl) => dtl.institute == institute) }
    else if (!institute && !department) { courseList = await coursesModel.find() }

    if (!courseList.length) {
      return res.status(204) //.json({ message: "No record Found" })
    }

    if (sem && year) return res.json(courseList.filter((detail) => detail.sem == sem && detail.year == year))
    else if (sem && !year) return res.json(courseList.filter((detail) => detail.sem == sem))
    else if (!sem && year) return res.json(courseList.filter((detail) => detail.year == year))
    else if (!sem && !year) return res.json(courseList)

  } catch (err) {
    console.log(err)
  }
}

// ! delete course
const deleteCourses = async (req, res) => {
  const { id } = req.query
  try {
    const deleted = await coursesModel.findByIdAndDelete(id)
    // console.log(deleted)
    if (!deleted) return res.status(422).json({ message: "Course does not exist!" })
    res.json({ message: `Feedback with name : ${deleted.name} deleted Successfully` })
  } catch (err) {
    console.log(err)
    return res.status(500).json({ message: "Some Error Occured" })
  }
}

module.exports = { addCourses, getCouses, deleteCourses }