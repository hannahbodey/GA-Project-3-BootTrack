import express from 'express'
import { loginUser, registerUser } from '../controllers/auth.js'
import { addClassNotes } from '../controllers/days.js'
import { secureRoute } from './secureRoute.js'
const router = express.Router()

import { getAllDays, getSingleDay, createProgress, createHomework, 
  updateHomework, deleteHomework, updateNotes, deleteNotes } from '../controllers/days.js'
router.route('/api/days/:dayId/notes')
  .post(secureRoute, addClassNotes)

router.route('/api/register')
  .post(registerUser)

router.route('api/days')
  .get(getAllDays)
router.route('/api/login')
  .post(loginUser)

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