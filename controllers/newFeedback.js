const NewFeedback = require('../models/newFeedback')

const newfeed = async (req, res) => {
  // console.log(req.body)
  if (!req.body.name ||
    !req.body.feedbackFor ||
    !req.body.feedbackQuestions ||
    !req.body.createdBy ||
    !req.body.description ||
    !req.body.dueFrom ||
    !req.body.dueTo) {
    return res.status(422).json({ message: "Please Add all the Fields!" })
  }
  try {
    let feed = await NewFeedback.findOne({ name: req.body.name })
    if (feed) {
      return res.status(422).json({ message: "feedback already exist's with the same name" })
    }

    const newFeed = new NewFeedback(req.body)
    const savedFeedback = await newFeed.save()
    // console.log(savedFeedback)
    res.json({ message: "added new feedback" })
  } catch (err) {
    console.log(err)
    return res.status(500).json({ message: "Some error Occured" })
  }
}

const getFeedbackList = async (req, res) => {
  const feedbackList = await NewFeedback.find().populate("createdBy", ['userName', 'email']).populate("feedbackQuestions", 'name')
  if (!feedbackList.length) {
    return res.status(204) //.json({ message: "No record Found" })
  }
  res.json({ data: feedbackList })
}

module.exports = { newfeed, getFeedbackList }