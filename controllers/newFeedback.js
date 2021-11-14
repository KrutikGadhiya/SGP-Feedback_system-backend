const { newFeedbackModal, newCourseFeedbackModal } = require('../models/newFeedback')
const { feedbackAnsModel } = require('../models/feedbackAns')

const newfeed = async (req, res) => {
  // console.log(req.body)
  const { name, feedbackFor, feedbackQuestions, createdBy, description, dueFrom, dueTo, feedbackOf } = req.body
  if (!name ||
    !feedbackFor ||         // who will be giving the feedback
    !feedbackOf ||          // for whom feedback is created
    !feedbackQuestions ||
    !createdBy ||
    !description ||
    !dueFrom ||
    !dueTo) {
    return res.status(422).json({ message: "Please Add all the Fields!" })
  }
  try {
    let feed = await newFeedbackModal.findOne({ name })
    if (feed) {
      return res.status(422).json({ message: "feedback already exist's with the same name" })
    }

    const newFeed = new newFeedbackModal({
      name,
      description,
      feedbackFor,
      feedbackOf,
      feedbackQuestions,
      createdBy,
      dueFrom,
      dueTo
    })
    const savedFeedback = await newFeed.save()
    console.log(savedFeedback)
    res.json({ message: "added new feedback" })
  } catch (err) {
    console.log(err)
    return res.status(500).json({ message: "Some error Occured" })
  }
}
const newCoursefeed = async (req, res) => {
  // console.log(req.body)
  const { name, feedbackFor, feedbackQuestions, createdBy, description, dueFrom, dueTo, feedbackOf } = req.body
  if (!name ||
    !feedbackFor ||         // who will be giving the feedback
    !feedbackOf ||          // for whom feedback is created
    !feedbackQuestions ||
    !createdBy ||
    !description ||
    !dueFrom ||
    !dueTo) {
    return res.status(422).json({ message: "Please Add all the Fields!" })
  }
  try {
    let feed = await newCourseFeedbackModal.findOne({ name })
    if (feed) {
      return res.status(422).json({ message: "feedback already exist's with the same name" })
    }

    const newFeed = new newCourseFeedbackModal({
      name,
      description,
      feedbackFor,
      feedbackOf,
      feedbackQuestions,
      createdBy,
      dueFrom,
      dueTo
    })
    const savedFeedback = await newFeed.save()
    console.log(savedFeedback)
    res.json({ message: "added new feedback" })
  } catch (err) {
    console.log(err)
    return res.status(500).json({ message: "Some error Occured" })
  }
}

const notGivenFeed = (feedlist, givenList) => {
  let notgiven = []
  for (let i = 0; i < feedlist.length; i++) {
    const { _id } = feedlist[i]
    if (!givenList.includes(String(_id))) notgiven.push(feedlist[i])
  }
  return notgiven
}

const getFeedbackList = async (req, res) => {
  const { institute, department, sem, year } = req.query
  // console.log(req.user)
  try {
    const feedbackList = await newFeedbackModal.find().populate("createdBy", ['userName', 'email']).populate("feedbackQuestions", 'name').populate("feedbackOf")
    let givenFeedbacks = await feedbackAnsModel.find()
    givenFeedbacks = givenFeedbacks.map((ans) => ({ fid: ans.feedbackId, uid: ans.userId })).filter((i) => String(i.uid) == String(req.user._id))
    // console.log(givenFeedbacks)
    // console.log(givenFeedbacks.filter((i) => String(i.uid) == String(req.user._id)))
    let finalLst

    if (institute && department) { finalLst = feedbackList.filter((dtl) => dtl.feedbackFor.institute.toUpperCase() == institute.toUpperCase() && dtl.feedbackFor.department.toUpperCase() == department.toUpperCase()) }
    else if (!institute && department) { finalLst = feedbackList.filter((dtl) => dtl.feedbackFor.department.toUpperCase() == department.toUpperCase()) }
    else if (institute && !department) { finalLst = feedbackList.filter((dtl) => dtl.feedbackFor.institute.toUpperCase() == institute.toUpperCase()) }
    else if (!institute && !department) { finalLst = feedbackList }

    if (!finalLst.length) {
      return res.status(204).json({ message: "No record Found" })
    }

    // console.log(givenFeedbacks.map((itm) => (String(itm.fid))))
    let notGiven = notGivenFeed(finalLst, givenFeedbacks.map((itm) => (String(itm.fid))))
    // console.log(notGiven)
    // console.log(notGiven.length)

    if (sem && year) return res.json(notGiven.filter((detail) => detail.feedbackFor.sem == sem && detail.feedbackFor.year == year))
    else if (sem && !year) return res.json(notGiven.filter((detail) => detail.feedbackFor.sem == sem))
    else if (!sem && year) return res.json(notGiven.filter((detail) => detail.feedbackFor.year == year))
    else if (!sem && !year) return res.json(notGiven)

  } catch (err) {
    console.log(err)
  }

}
const getCourseFeedbackList = async (req, res) => {
  const { institute, department, sem, year } = req.query
  // console.log(req.user)
  try {
    const feedbackList = await newCourseFeedbackModal.find().populate("createdBy", ['userName', 'email']).populate("feedbackQuestions", 'name').populate("feedbackOf")
    let givenFeedbacks = await feedbackAnsModel.find()
    givenFeedbacks = givenFeedbacks.map((ans) => ({ fid: ans.feedbackId, uid: ans.userId })).filter((i) => String(i.uid) == String(req.user._id))
    // console.log(givenFeedbacks)
    // console.log(givenFeedbacks.filter((i) => String(i.uid) == String(req.user._id)))
    let finalLst

    if (institute && department) { finalLst = feedbackList.filter((dtl) => dtl.feedbackFor.institute.toUpperCase() == institute.toUpperCase() && dtl.feedbackFor.department.toUpperCase() == department.toUpperCase()) }
    else if (!institute && department) { finalLst = feedbackList.filter((dtl) => dtl.feedbackFor.department.toUpperCase() == department.toUpperCase()) }
    else if (institute && !department) { finalLst = feedbackList.filter((dtl) => dtl.feedbackFor.institute.toUpperCase() == institute.toUpperCase()) }
    else if (!institute && !department) { finalLst = feedbackList }

    if (!finalLst.length) {
      return res.status(204).json({ message: "No record Found" })
    }

    // console.log(givenFeedbacks.map((itm) => (String(itm.fid))))
    let notGiven = notGivenFeed(finalLst, givenFeedbacks.map((itm) => (String(itm.fid))))
    // console.log(notGiven)
    // console.log(notGiven.length)

    if (sem && year) return res.json(notGiven.filter((detail) => detail.feedbackFor.sem == sem && detail.feedbackFor.year == year))
    else if (sem && !year) return res.json(notGiven.filter((detail) => detail.feedbackFor.sem == sem))
    else if (!sem && year) return res.json(notGiven.filter((detail) => detail.feedbackFor.year == year))
    else if (!sem && !year) return res.json(notGiven)

  } catch (err) {
    console.log(err)
  }

}

// ! delete user
const deleteFeedback = async (req, res) => {
  const { id } = req.query
  try {
    const deleted = await newFeedbackModal.findByIdAndDelete(id)
    // console.log(deleted)
    if (!deleted) return res.status(422).json({ message: "Feedback does not exist!" })
    res.json({ message: `Feedback with name : ${deleted.name} deleted Successfully` })
  } catch (err) {
    console.log(err)
    return res.status(500).json({ message: "Some Error Occured" })
  }
}

module.exports = { newfeed, getFeedbackList, deleteFeedback, newCoursefeed, getCourseFeedbackList }