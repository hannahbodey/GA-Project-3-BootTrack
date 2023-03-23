import express from 'express'
import mongoose from 'mongoose'
// import router from './config/router.js'
import 'dotenv/config'

import Day from './models/days.js'

const app = express()
const PORT = process.env.PORT
const MONGO_URI = process.env.MONGO_URI 

const startServer = async () => {
  try {
    // ? Connect to our mongodb database
    await mongoose.connect(MONGO_URI)
    console.log('🚨 Database connected')

    // ? Parse JSON to req.body
    app.use(express.json())

    // ? Middleware
    // Logger
    app.use((req, res, next) => {
      console.log(`🚨 Incoming request: ${req.method} ${req.url}`)
      next()
    })

    // ! Routes


    //? Day / singleDay Routes

    //GET Days
    //Endpoint : /api/days
    app.get('/api/days', async (req, res) => {
      try {
        const days = await Day.find()
        res.status(200).json({ message: 'Get all days' })
        return res.json(days)
      } catch (err) {
        console.log(err)
      }
    })

    //GET singleDay
    //Endpoint : /api/days/:dayId
    app.get('/api/days/:dayId', async (req, res) => {
      try {
        const { dayId } = req.params
        const day = await Day.findById(dayId)
        console.log('getting single day')

        if (!day) {
          throw new Error('Day not found')
        }

        return res.json(day)
      } catch (err) {
        console.log(err)
      }
    })


    //?Progress Routes     
    //!Embedded relationship
    //PUT Progress 
    //Endpoint : /api/days/:dayId/progress
    app.post('/api/days/:dayId/progress', async (req,res) =>{
      try {
        const { dayId } = req.params

        const day = await Day.findById(dayId)
        if (!day) throw new Error('Day not found')

        const createdProgress = { ...req.body, user: req.loggedInUser._id }

        day.progress.push(createdProgress)
        console.log('DAY -->', day)

        await day.save()

        return res.status(201).json(day)
      
      } catch (err) {
        console.log(err)
        return res.status(422).json(err)
      }
    })
    


    //? Homework Routes 
    //!Embedded relationship

    //POST Homework
    //Endpoing : /api/days/:dayId/homework
    app.post('/api/days/:dayId/homework', async (req, res)=>{
      try {
        const { dayId } = req.params

        const day = await Day.findById(dayId)
        if (!day) throw new Error('Day not found')

        const createdHomeWork = { ...req.body, user: req.loggedInUser._id }

        day.homework.push(createdHomeWork)
        console.log('DAY -->', day)

        await day.save()

        return res.status(201).json(day)

      } catch (err) {
        console.log(err)
        return res.status(422).json(err)
      }
    })

    //PUT Homework
    //Endpoint : /api/days/:dayId/homework/:homeworkId
    app.put('/api/days/:dayId/homework/:homeworkId', async (req,res)=>{
      try {
        const { dayId, homeworkId } = req.params
        const loggedInUser = req.loggedInUser._id

        const day = await Day.findById(dayId)
        if (!day) throw new Error('Day not found')

        const homeworkToUpdate = day.homework.id(homeworkId)
        if (!homeworkToUpdate) throw new Error('Homework not found')

        if (!homeworkToUpdate.user.equals(loggedInUser)){
          console.log('NOT your HOMEWORK')
          throw new Error('Unauthorized')

        } 
      } catch (err){
        console.log(err)
        return res.status(422).json(err)
      }
      
    })

    //DELETE Homework
    //Endpoint : /api/days/:dayId/homework/:homeworkId
    app.post('/api/days/:dayId/homework/:homeworkId', async (req,res)=>{
      try {
        const { dayId, homeworkId } = req.params
        const loggedInUser = req.loggedInUser._id

        const day = await Day.findById(dayId)
        if (!day) throw new Error('Day not found')

        const homeworkToDelete = day.homework.id(homeworkId)
        if (!homeworkToDelete) throw new Error('Homework not found')

        if (!homeworkToDelete.user.equals(loggedInUser)){
          console.log('NOT your HOMEWORK')
          throw new Error('Unauthorized')
        }

        await homeworkToDelete.deleteOne()
        console.log(day)

        await day.save()
        return res.sendStatus(204)

      } catch (err){
        console.log(err)
        if (err.kind === 'ObjectId') return res.status(422).json(err)
        return res.status(404).json(err)
      }
    })

    //? Notes Routes 
    //!Embedded relationship
    //POST Notes
    //Endpoing : /api/days/:dayId
    app.post('/api/days/:dayId', async (req, res)=>{
      try {
        req.body.note = req.loggedInUser._id
        const createdNote = await Day.create(req.boyd)
        return res.status(201).json(createdNote)

      } catch (err) {
        console.log(err)
        return res.status(422).json(err)
      }
    })
    
    //PUT Notes
    //Endpoint : /api/days/:dayId/notes/:notesId
    app.put('/api/days/:dayId/notes/:notesId', async (req,res)=>{
      try {
        const { dayId } = req.params
        const day = await Day.findById(dayId)

        if (!day) throw new Error('Day not found')

        const noteToAdd = { ...req.body, user: req.loggedInUser._id }
        day.notes.push(noteToAdd)
        
        await day.save()
        
        return res.status(201).json(day)
        
      } catch (err){
        console.log(err)
        return res.status(422).json(err)
      }
    })

    //DELETE Notes
    //Endpoint : /api/days/:dayId/notes/:notesId
    app.post('/api/days/:dayId/notes/:notesId', async (req,res)=>{
      try {
        const { dayId, noteId } = req.params
        const loggedInUserId = req.loggedInUser._id

        const day = await Day.findById(dayId)

        if (!day) throw new Error('Day not found')
      

        const noteToDelete = day.notes.id(noteId)
        if (!noteToDelete) throw new Error('Notes not found')

        if (!noteToDelete.owner.equals(loggedInUserId)){
          console.log('Owner not found')
          throw new Error('Unauthorized')
        }
        await noteToDelete.deleteOne()

        await day.save()

        return res.sendStatus(204)
      } catch (err){
        console.log(err)
        return res.status(404).json(err)
      }
    })

    // ? 404 catch all middleware
    app.use((req, res) => {
      return res.status(404).json({ message: 'Route not found' })
    })

    // ? Starting our node server after we've connected to our database
    app.listen(PORT, () => console.log(`🚀 Server up and running and listening on port ${PORT}`))
  } catch (err) {
    console.log('🆘 Something went wrong starting the app')
    console.log(err)
  }
}

startServer()

