import 'dotenv/config'
import jwt from 'jsonwebtoken'
import User from '../models/users.js'
import { Unauthorized, assessError } from './errors.js'

const secret = process.env.SECRET 

export const secureRoute = async (req, res, next) => {
  console.log('Hitting')
  try {
    const authHeader = req.headers.authorization
    if (!authHeader) throw new Unauthorized()
    const token = authHeader.replace('Bearer ', '')
    const payload = jwt.verify(token, secret)
    const loggedInUser = await User.findById(payload.sub)
    req.loggedInUser = loggedInUser
    console.log('req.body', req.loggedInUser)
    if (!loggedInUser) throw new Unauthorized()
  } catch (error) {
    console.log(error)
    return assessError(error, res)
  }
  next()
}