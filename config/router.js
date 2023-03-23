import express from 'express'
import mongoose from 'mongoose'
import Day from './models/days.js'

import { getAllDays, getSingleDay, createProgress, createHomework, 
  updateHomework, deleteHomework, updateNotes, deleteNotes } from '../controllers/days.js'

const router = express.Router()

router.route('api/days')
  .get(getAllDays)

router.route('api/days/:dayId')
  .get(getSingleDay)

router.route('/api/days/:dayId/progress')
  .post(createProgress)

router.route('/api/days/:dayId/homework')
  .post(createHomework)

router.route('/api/days/:dayId/homework/:homework')
  .put(updateHomework)
  .delete(deleteHomework)

router.route('/api/days/:dayId/notes/:notesId')
  .put(updateNotes)
  .delete(deleteNotes)




export default router 