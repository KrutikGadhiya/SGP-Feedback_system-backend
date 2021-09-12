const feedbackQuestions = require('../models/feedbackQuestions')

const feedbackQue = async (req, res) => {
  // console.log(req.body)
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
    res.status(500).json({ msg: "Some error Occured" })
  }

}

module.exports = { feedbackQue }