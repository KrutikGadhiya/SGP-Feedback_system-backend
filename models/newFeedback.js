const mongoose = require('mongoose')
const { ObjectId } = mongoose.Schema.Types

const newFeedbackSchema = mongoose.Schema({
  name: {
    type: String
  },
  // feedbackFor: {
  //   type: []
  // },
  feedbackFor: {
    type: {
      sem: Number,
      year: Number
    }
  },
  feedbackQuestions: {
    type: ObjectId,
    ref: "FeedbackQuestions",
    default: "613da2c057719d0f0055c8e0"
  },
  createdBy: {
    type: ObjectId,
    ref: "User"
  },
  description: {
    type: String
  },
  dueFrom: {
    type: Date
  },
  dueTo: {
    type: Date
  }
}, { timestamps: true })

const newFeedbackModal = mongoose.model('NewFeedback', newFeedbackSchema)
module.exports = newFeedbackModal