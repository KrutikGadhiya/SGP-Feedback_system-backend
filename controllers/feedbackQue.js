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

// ? check for the findById() and findOne()

const getFeedbackQue = async (req, res) => {
  const { id } = req.query
  let queList
  try {
    if (!id) queList = await feedbackQuestions.find().populate('createdBy', ['userName', 'email'])
    else queList = await feedbackQuestions.find({ _id: id })
    if (!queList || !queList.length) {
      return res.status(204) //.json({ message: "No record Found" })
    }
    res.json(queList)
  } catch (err) {
    console.log(err)
    return res.status(500).json({ message: "Some Error Occured" })
  }
}

// ! delete user
const deleteFeedbackQue = async (req, res) => {
  const { id } = req.query
  try {
    const deleted = await feedbackQuestions.findByIdAndDelete(id)
    // console.log(deleted)
    if (!deleted) return res.status(422).json({ message: "Template does not exist!" })
    res.json({ message: `Feedback with name : ${deleted.name} deleted Successfully` })
  } catch (err) {
    console.log(err)
    return res.status(500).json({ message: "Some Error Occured" })
  }
}


module.exports = { feedbackQue, getFeedbackQue, deleteFeedbackQue }