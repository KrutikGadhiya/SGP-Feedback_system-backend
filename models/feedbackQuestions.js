const mongoose = require('mongoose')
const { ObjectId } = mongoose.Schema.Types

const feedbackQuestionsSchema = mongoose.Schema({
  name: {
    type: String
  },
  questions: {
    type: []
  },
  createdBy: {
    type: ObjectId,
    ref: "User"
  }
}, { timestamps: true })

const feedbackQuestionsModel = mongoose.model('FeedbackQuestions', feedbackQuestionsSchema)
module.exports = feedbackQuestionsModel