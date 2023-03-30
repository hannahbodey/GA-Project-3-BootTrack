import express from 'express'

import { getAllDays, getSingleDay, getTeacherDays } from '../controllers/days.js'
import { getReports, submitReport } from '../controllers/reports.js'
import { modifyHomework, deleteHomework } from '../controllers/homeworkNotes.js'
import { modifyClassNotes, deleteClassNotes } from '../controllers/classworkNotes.js'
import { registerUser, loginUser, loginDemo, getUser } from '../controllers/auth.js'
import { modifyProgress } from '../controllers/progress.js'
import { secureRoute } from '../config/secureRoute.js'

const router = express.Router()

router.route('/api/register')
  .post(registerUser)

router.route('/api/login')
  .post(loginUser)

router.route('/api/demo-login')
  .post(loginDemo)

router.route('/api/user')
  .get(secureRoute, getUser)

router.route('/api/days')
  .get(secureRoute, getAllDays)

router.route('/api/days/:dayId')
  .get(secureRoute, getSingleDay)

router.route('/api/days/:dayId/progress')
  .put(secureRoute, modifyProgress)

router.route('/api/days/:dayId/homework')
  .put(secureRoute, modifyHomework)
  .delete(secureRoute, deleteHomework)

router.route('/api/days/:dayId/notes')
  .put(secureRoute, modifyClassNotes)
  .delete(secureRoute, deleteClassNotes)

router.route('/api/reports')
  .get(secureRoute, getReports)

router.route('/api/reports/:weekId')
  .put(secureRoute, submitReport)

// router.route('/api/teacherDays')
//   .get(secureRoute, getTeacherDays)

export default router 