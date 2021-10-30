const { newFeedbackModal, newCourseFeedbackModal } = require('../models/newFeedback')

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

    const newFeed = new newFeedbackModal(req.body)
    const savedFeedback = await newFeed.save()
    // console.log(savedFeedback)
    res.json({ message: "added new feedback" })
  } catch (err) {
    console.log(err)
    return res.status(500).json({ message: "Some error Occured" })
  }
}

const getFeedbackList = async (req, res) => {
  const { institute, department, sem, year } = req.query

  try {
    const feedbackList = await newFeedbackModal.find().populate("createdBy", ['userName', 'email']).populate("feedbackQuestions", 'name').populate("feedbackOf")
    let finalLst

    if (institute && department) { finalLst = feedbackList.filter((dtl) => dtl.feedbackFor.institute == institute && dtl.feedbackFor.department == department) }
    else if (!institute && department) { finalLst = feedbackList.filter((dtl) => dtl.feedbackFor.department == department) }
    else if (institute && !department) { finalLst = feedbackList.filter((dtl) => dtl.feedbackFor.institute == institute) }
    else if (!institute && !department) { finalLst = feedbackList }

    if (!finalLst.length) {
      return res.status(204) //.json({ message: "No record Found" })
    }

    if (sem && year) return res.json(finalLst.filter((detail) => detail.feedbackFor.sem == sem && detail.feedbackFor.year == year))
    else if (sem && !year) return res.json(finalLst.filter((detail) => detail.feedbackFor.sem == sem))
    else if (!sem && year) return res.json(finalLst.filter((detail) => detail.feedbackFor.year == year))
    else if (!sem && !year) return res.json(finalLst)

  } catch (err) {
    console.log(err)
  }

}

module.exports = { newfeed, getFeedbackList }