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

const categorize = (list) => {
  let categorizedList = {}
  for (let i = 0; i < list.length; i++) {
    let sem = list[i].feedbackId.feedbackFor.sem
    let depart = list[i].feedbackId.feedbackFor.department
    // console.log(sem, depart)
    // console.log(list[i].feedbackId.feedbackFor)
    if (`${sem}${depart}` in categorizedList)
      categorizedList = { ...categorizedList, [`${sem}${depart}`]: [...categorizedList[`${sem}${depart}`], list[i]] }
    else
      categorizedList = { ...categorizedList, [`${sem}${depart}`]: [list[i]] }
  }
  // console.log(categorizedList)
  return categorizedList
}
const categorizedAns = (list) => {
  let finalList = []
  Object.entries(list).forEach(([k, v]) => {
    let entry = { feedFor: k, questions: v[0].feedbackId.feedbackQuestions.questions, analytics: [] }
    let feedAnsList = []
    // console.log(k, v, v.length)
    for (let i = 0; i < v.length; i++) {
      feedAnsList.push(v[i].ans)
    }
    // console.log(feedAnsList)
    entry.analytics = countFeedback(feedAnsList)
    finalList.push(entry)
  })
  // console.dir(finalList,{depth:null})
  return finalList
}

const countFeedback = (list) => {
  // let output = {}
  let output = []
  for (let j = 0; j < list[0].length; j++) {
    let maped = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 }
    for (let i = 0; i < list.length; i++) {
      maped = { ...maped, [list[i][j]]: ++maped[list[i][j]] }
    }
    // output.push(maped)
    //   output = { ...output, [queList[j]]: maped }
    output.push(maped)
  }
  return output
}

// TODO: for get route
const getFeedbackAns = async (req, res) => {
  const { id } = req.query
  // console.log(req.headers.authorization)
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
    // console.log(feedAns)
    let filtered = feedAns.filter((ans) => ans.feedbackId.feedbackOf == id)
    // return res.json(filtered)
    // filtered.forEach(ans => feedAnsList.push(ans.ans))
    // console.log(feedAnsList)
    // console.log(filtered[0].feedbackId.feedbackQuestions.questions)
    // const mapedAns = countFeedback(feedAnsList, filtered[0].feedbackId.feedbackQuestions.questions)
    const mapedAns = categorizedAns(categorize(filtered))
    // console.log(mapedAns)
    // res.json(feedAns)
    res.json(mapedAns)
  } catch (err) {
    console.log(err)
    return res.status(500).json({ message: "Some Error Occured!!!" })
  }
}

module.exports = { addFeedbackAns, getFeedbackAns }