import mongoose from 'mongoose'

const responseSchema = new mongoose.Schema({
  owner: { type: mongoose.Schema.ObjectId, ref: 'User', required: true },
  highlights: { type: String, required: true },
  challenges: { type: String, required: false },
  goals: { type: String, required: true },
  overallComfort: { type: Number, required: true, min: 1, max: 3 },
  questions: { type: String, required: true },
  supportRating: { type: Number, required: true, min: 1, max: 3 },
  supportAdvice: { type: String, required: true },
  contactPerson: { type: [String] },
  contactRequest: { type: String }
})

const weeklyReportSchema = new mongoose.Schema({
  week: { type: Number, required: true, min: 1, max: 12 },
  responses: [responseSchema]
})

export default mongoose.model('Report', weeklyReportSchema)