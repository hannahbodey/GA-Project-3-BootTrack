import mongoose from "mongoose"
import 'dotenv/config'

import Day from '../models/days.js'
import User from '../models/users.js'
import Report from '../models/weeklyReports.js'

import userData from './data/user.js'
import dayData from './data/days.js'
import reportData from './data/reports.js'

// Declaring a variable to contain the URI within the .env file
const mongoURI = process.env.MONGO_URI

const seedDatabase = async () => {

  try {
    // Initial database connection
    await mongoose.connect(mongoURI)
    console.log('Database connected ✅')
    // Drop database
    await mongoose.connection.db.dropDatabase()
    console.log('Database dropped 🫳')
    //Create users
    const createdUsers = await User.create(userData)
    const daysWithUser = dayData.map(day => {
      if (day.classworkNotes) {
        day = {
          ...day, classworkNotes: [{ ...day.classworkNotes[0], owner: createdUsers[0]._id }]
        }
      }
      if (day.homeworkUploads) {
        day = {
          ...day, homeworkUploads: [{ ...day.homeworkUploads[0], owner: createdUsers[0]._id }]
        }
      }
      if (day.progress) {
        day = {
          ...day, progress: [{ ...day.progress[0], owner: createdUsers[0]._id }, { ...day.progress[1], completed: false, confidenceRating: 0, bookmarked: false, owner: createdUsers[1]._id }]
        }
      }
      return { ...day }
    })

    const reportsWithUser = reportData.map(report => {
      if (report.responses) {
        report = {
          ...report, responses: [{ ...report.responses[0], owner: createdUsers[0]._id }]
        }
      }
      return { ...report }
    })


    // Create course content (days)
    const createDays = await Day.create(daysWithUser)
    console.log(`${createDays.length} days worth of data added 📆`)

    const createdReports = await Report.create(reportsWithUser)
    console.log(`${createdReports.length} reports added 📑`)
    // Close connection
    await mongoose.connection.close()
    console.log('Connection closed 👋')
  } catch (error) {
    console.log(error)
  }
}

seedDatabase()