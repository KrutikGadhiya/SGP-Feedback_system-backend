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

// TODO: for get route
const getFeedbackAns = async (req, res) => {
  const { id } = req.query
  if (!id) return res.status(422).json({ message: "id not found" })
  try {
    let feedAns = await feedbackAnsModel.find().populate("feedbackId", ["name", "feedbackFor", "feedbackOf"]).populate("userId", ["email", "userName"])
    // if (!feedId && !userId) feedAns = await feedbackAnsModel.find().populate("feedbackId", ["name", "feedbackFor", "feedbackOf"]).populate("userId", ["email", "userName"])
    // else if (!feedId && userId) feedAns = await feedbackAnsModel.find({ userId }).populate("feedbackId", ["name", "feedbackFor", "feedbackOf"]).populate("userId", ["email", "userName"])
    // else if (feedId && !userId) feedAns = await feedbackAnsModel.find({ feedbackId: feedId }).populate("feedbackId", ["name", "feedbackFor", "feedbackOf"]).populate("userId", ["email", "userName"])
    // else feedAns = await feedbackAnsModel.find({ userId, feedbackId: feedId }).populate("feedbackId", ["name", "feedbackFor", "feedbackOf"]).populate("userId", ["email", "userName"])

    if (!feedAns.length) return res.status(204)
    let filtered = feedAns.filter((ans) => ans.feedbackId.feedbackOf == id)
    console.log(filtered)
    // res.json(feedAns)
    res.json(filtered)
  } catch (err) {
    console.log(err)
    return res.status(500).json({ message: "Some Error Occured!!!" })
  }
}

module.exports = { addFeedbackAns, getFeedbackAns }