const mongoose = require('mongoose')
const { ObjectId } = mongoose.Schema.Types

const newFeedbackSchema = mongoose.Schema({
  name: {
    type: String
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

const newFeedbackModal = mongoose.model('newFeedback', newFeedbackSchema)
module.exports = newFeedbackModal