const feedbackQuestions = require('../models/feedbackQuestions')

const feedbackQue = async (req, res) => {
  // console.log(req.body)
  if (!req.body.createdBy || !req.body.name || !req.body.questions) {
    return res.status(422).json({ message: "Please Add all the Fields!" })
  }
  try {
    let feedback = await feedbackQuestions.findOne({ name: req.body.name })
    if (feedback) {
      // console.log("FEEDBACK: ", feedback)
      return res.status(422).json({ message: "feedback Question already exist's with the same name" })
    }

    const newFeedbackQues = new feedbackQuestions(req.body)
    const savedfeedbackQues = await newFeedbackQues.save()
    // console.log(savedfeedbackQues)
    res.json({ savedfeedbackQues })
  } catch (err) {
    console.log(err)
    res.status(500).json({ message: "Some error Occured" })
  }

}

const getFeedbackQue = async (req, res) => {
  const queList = await feedbackQuestions.find()
  if (!queList.length) {
    return res.status(204) //.json({ message: "No record Found" })
  }
  res.json({ data: queList })
}

module.exports = { feedbackQue, getFeedbackQue }