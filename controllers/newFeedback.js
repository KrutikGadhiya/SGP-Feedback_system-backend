const NewFeedback = require('../models/newFeedback')

const newfeed = async (req, res) => {
  // console.log(req.body)
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

module.exports = { newfeed }