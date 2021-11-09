const { feedbackAnsModel } = require('../models/feedbackAns')

// TODO: for post route
const addFeedbackAns = async (req, res) => {
  const { feedbackId, userId, ans } = req.body
  if (!feedbackId || !userId || !ans) return res.status(422).json({ message: "Please add all the fields" })

  try {
    const alreadyGiven = await feedbackAnsModel.findOne({ feedbackId, userId })
    if (alreadyGiven) return res.status(422).json({ message: "Feedback Already Given" })

    const newAns = new feedbackAnsModel({
      feedbackId, userId, ans
    })
    const savedAns = await newAns.save()
    res.json({ message: "Feedback Submitted Successfully" })
  } catch (err) {
    console.log(err)
    return res.status(500).json({ message: "Some Error Occured!!!" })
  }
}

const countFeedback = (list, queList) => {
  let output = {}
  for (let j = 0; j < list[0].length; j++) {
    let maped = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 }
    for (let i = 0; i < list.length; i++) {
      maped = { ...maped, [list[i][j]]: ++maped[list[i][j]] }
    }
    // output.push(maped)
    output = { ...output, [queList[j]]: maped }
  }
  return output
}

// TODO: for get route
const getFeedbackAns = async (req, res) => {
  const { id } = req.query
  let feedAnsList = []
  if (!id) return res.status(422).json({ message: "id not found" })
  try {
    // let feedAns = await feedbackAnsModel.find().lean().populate("feedbackId", ["name", "feedbackFor", "feedbackOf", "feedbackQuestions"]).populate("userId", ["email", "userName"])
    let feedAns = await feedbackAnsModel.find().populate({
      path: 'feedbackId',
      populate: {
        path: 'feedbackQuestions',
        model: 'FeedbackQuestions'
      }
    }).populate("userId", ["email", "userName"])
    // console.log(temp)

    if (!feedAns.length) return res.status(204)
    let filtered = feedAns.filter((ans) => ans.feedbackId.feedbackOf == id)
    filtered.forEach(ans => feedAnsList.push(ans.ans))
    // console.log(feedAnsList)
    // console.log(filtered[0].feedbackId.feedbackQuestions.questions)
    const mapedAns = countFeedback(feedAnsList, filtered[0].feedbackId.feedbackQuestions.questions)
    // console.log(mapedAns)
    // res.json(feedAns)
    res.json(mapedAns)
  } catch (err) {
    console.log(err)
    return res.status(500).json({ message: "Some Error Occured!!!" })
  }
}

module.exports = { addFeedbackAns, getFeedbackAns }