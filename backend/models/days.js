import mongoose from 'mongoose'

//? Homework Schema - embedded in daysSchema
const homeworkSchema = new mongoose.Schema({
  homeworkTitle: { type: String, required: true, maxlength: 30 },
  homeworkLink: { type: String, required: true },
  owner: { type: mongoose.Schema.ObjectId, ref: 'User', required: true }
},
{timestamps: true}
)

//? Classwork Schema - embedded in daysSchema
const notesSchema = new mongoose.Schema({
  notesTitle: { type: String, required: true, maxlength: 30 },
  notesDescription: { type: String, required: true },
  owner: { type: mongoose.Schema.ObjectId, ref: 'User', required: true }
},
{timestamps: true}
)

//? Progress Schema - embedded in daysSchema
const progressSchema = new mongoose.Schema({
  completed: { type: Boolean, required: true },
  confidenceRating: { type: Number, required: true, min: 1, max: 5 },
  bookmarked: { type: Boolean, required: true },
  owner: { type: mongoose.Schema.ObjectId, ref: 'User', required: true }
},
{timestamps: true}
)

//? Days Schema - for data for each day 
const daysSchema = new mongoose.Schema({
  courseName: { type: String, required: true },
  day: { type: Number, required: true },
  week: { type: Number, required: true },
  topicTitle: { type: String, required: true, maxlength: 20 },
  classworkDescription: [{ type: String, required: true, maxlength: 250 }],
  homeworkDescription: [{ type: String, required: false, maxlength: 250 }],
  classworkNotes: [notesSchema],
  homeworkUploads: [homeworkSchema],
  progress: [progressSchema]
})

export default mongoose.model('Day', daysSchema)