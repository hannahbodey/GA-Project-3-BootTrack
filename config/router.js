import express from 'express'
import { loginUser, registerUser } from '../controllers/auth.js'
import { addClassNotes } from '../controllers/days.js'
import { secureRoute } from './secureRoute.js'
const router = express.Router()

router.route('/api/days/:dayId/notes')
  .post(secureRoute, addClassNotes)

router.route('/api/register')
  .post(registerUser)

router.route('/api/login')
  .post(loginUser)

export default router









// export default router 