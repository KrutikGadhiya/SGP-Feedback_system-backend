const mongoose = require('mongoose')
const { ObjectId } = mongoose.Schema.Types

const feedbackAnsSchema = mongoose.Schema({
  feedbackId: {
    type: ObjectId,
    ref: 'NewFeedback'
  },
  userId: {
    type: ObjectId,
    ref: 'User'
  },
  ans: {
    type: []
  }
}, { timestamps: true })

const courseFeedbackAnsSchema = mongoose.Schema({
  feedbackId: {
    type: ObjectId,
    ref: 'CourseFeedback'
  },
  userId: {
    type: ObjectId,
    ref: 'User'
  },
  ans: {
    type: []
  }
}, { timestamps: true })

const feedbackAnsModel = mongoose.model('FeedbackAns', feedbackAnsSchema)
const courseFeedbackAnsModel = mongoose.model('CourseFeedbackAns', courseFeedbackAnsSchema)

module.exports = { feedbackAnsModel, courseFeedbackAnsModel }