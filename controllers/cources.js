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
    let finalLst

    if (institute && department) { finalLst = courseList.filter((dtl) => dtl.institute.toUpperCase() == institute.toUpperCase() && dtl.department.toUpperCase() == department.toUpperCase()) }
    else if (!institute && department) { finalLst = courseList.filter((dtl) => dtl.department.toUpperCase() == department.toUpperCase()) }
    else if (institute && !department) { finalLst = courseList.filter((dtl) => dtl.institute.toUpperCase() == institute.toUpperCase()) }
    else if (!institute && !department) { finalLst = courseList }

    // console.log("a:", finalLst)
    // console.log("a:", finalLst.length)

    if (finalLst.length == 0 || !finalLst.length) {
      // console.log("a:", finalLst.length)
      // return res.status(204).json({ message: "No record Found" })
      return res.json([])
    }

    if (sem && year) return res.json(finalLst.filter((detail) => detail.sem == sem && detail.year == year))
    else if (sem && !year) return res.json(finalLst.filter((detail) => detail.sem == sem))
    else if (!sem && year) return res.json(finalLst.filter((detail) => detail.year == year))
    else if (!sem && !year) return res.json(finalLst)

  } catch (err) {
    console.log(err)
    return res.status(500).json({ message: "Some Error Occured!" })
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