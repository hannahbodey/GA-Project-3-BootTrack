import express from 'express'

import { getAllDays, getSingleDay, createProgress } from '../controllers/days.js'
import { createHomework, updateHomework, deleteHomework } from '../controllers/homework.js'
import { addClassNotes, deleteClassNotes } from '../controllers/classworkNotes.js'
import { registerUser, loginUser  } from '../controllers/auth.js'


const router = express.Router()

router.route('/api/register')
  .post(registerUser)

router.route('/api/login')
  .post(loginUser)

router.route('/api/days')
  .get(getAllDays)

router.route('/api/days/:dayId')
  .get(getSingleDay)

router.route('/api/days/:dayId/progress')
  .post(createProgress)

router.route('/api/days/:dayId/homework')
  .post(createHomework)

router.route('/api/days/:dayId/homework/:homework')
  .put(updateHomework)
  .delete(deleteHomework)

router.route('/api/days/:dayId/notes/:notesId')
  .put(addClassNotes )
  .delete(deleteClassNotes)




export default router 