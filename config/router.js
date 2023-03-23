import express from 'express'

import { getAllDays, getSingleDay } from '../controllers/days.js'
import { createHomework, updateHomework, deleteHomework } from '../controllers/homeworkNotes.js'
import { addClassNotes, deleteClassNotes } from '../controllers/classworkNotes.js'
import { registerUser, loginUser  } from '../controllers/auth.js'
import { putProgress } from '../controllers/progress.js'
import { secureRoute } from '../config/secureRout.js'


const router = express.Router()

router.route('/api/register')
  .post(registerUser)

router.route('/api/login')
  .post(secureRoute, loginUser)

router.route('/api/days')
  .get(getAllDays)

router.route('/api/days/:dayId')
  .get(getSingleDay)

router.route('/api/days/:dayId/progress')
  .post(secureRoute, putProgress)

router.route('/api/days/:dayId/homework')
  .post(secureRoute, createHomework)

router.route('/api/days/:dayId/homework/:homework')
  .put(secureRoute, updateHomework)
  .delete(secureRoute, deleteHomework)

router.route('/api/days/:dayId/notes')
  .post(secureRoute, addClassNotes)

router.route('/api/days/:dayId/notes/:notesId')
  .put(secureRoute, addClassNotes )
  .delete(secureRoute, deleteClassNotes)




export default router 