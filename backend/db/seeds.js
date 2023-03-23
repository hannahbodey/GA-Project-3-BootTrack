import mongoose from "mongoose"
import 'dotenv/config'

import Day from '../models/days.js'

import dayData from './data/days.js'

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

    // Create course content (days)
    const createDays = await Day.create(dayData)
    console.log(`${createDays.length} days worth of data added 📆`)

    // Close connection
    await mongoose.connection.close()
    console.log('Connection closed 👋')

  } catch (error) {

    console.log(error)
    
  }

}

seedDatabase()