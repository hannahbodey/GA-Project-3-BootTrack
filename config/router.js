import express from 'express'
import { loginUser, registerUser } from '../controllers/auth.js'
import { addClassNotes, updateClassNotes, deleteClassNotes } from '../controllers/classworkNotes.js'
import { createHomework, updateHomework, deleteHomework } from '../controllers/homeworkNotes.js'
import { secureRoute } from './secureRoute.js'
import { getAllDays, getSingleDay } from '../controllers/days.js'
import { putProgress } from '../controllers/progress.js'
const router = express.Router()

router.route('/api/days/:dayId/notes')
  .post(secureRoute, addClassNotes)

router.route('/api/register')
  .post(registerUser)

router.route('/api/days')
  .get(getAllDays)

router.route('/api/login')
  .post(loginUser)

router.route('/api/days/:dayId')
  .get(getSingleDay)

router.route('/api/days/:dayId/progress')
  .post(putProgress)

router.route('/api/days/:dayId/homework')
  .post(createHomework)

router.route('/api/days/:dayId/homework/:homework')
  .put(updateHomework)
  .delete(deleteHomework)

router.route('/api/days/:dayId/notes/:notesId')
  .put(updateClassNotes)
  .delete(deleteClassNotes)

export default router 