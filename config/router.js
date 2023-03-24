import express from 'express'

import { getAllDays, getSingleDay } from '../controllers/days.js'
import { modifyHomework, deleteHomework } from '../controllers/homeworkNotes.js'
import { modifyClassNotes, deleteClassNotes } from '../controllers/classworkNotes.js'
import { registerUser, loginUser  } from '../controllers/auth.js'
import { modifyProgress } from '../controllers/progress.js'
import { secureRoute } from '../config/secureRoute.js'


const router = express.Router()

router.route('/api/register') // ✅
  .post(registerUser)

router.route('/api/login') // ✅
  .post(loginUser)

router.route('/api/days') // ✅
  .get(getAllDays)

router.route('/api/days/:dayId') // ✅
  .get(secureRoute, getSingleDay)

router.route('/api/days/:dayId/progress') // ?
  .put(secureRoute, modifyProgress)

router.route('/api/days/:dayId/homework')
  .put(secureRoute, modifyHomework)
  .delete(secureRoute, deleteHomework)

// router.route('/api/days/:dayId/homework/:homework')
//   .put(secureRoute, updateHomework)
//   .delete(secureRoute, deleteHomework)

router.route('/api/days/:dayId/notes') // ✅
  .put(secureRoute, modifyClassNotes)
  .delete(secureRoute, deleteClassNotes)

export default router 