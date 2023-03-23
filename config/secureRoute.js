import 'dotenv/config'
import jwt from 'jsonwebtoken'
import User from '../models/users.js'
import { Unauthorized, NotFound, assessError } from './errors.js'

const secret = process.env.SECRET 

export const secureRoute = async (req, res, next) => {
  try {
    console.log('🔒 secure route hit')
    console.log('req.headers', req.headers)
    const authHeader = req.headers.authorization
    if (!authHeader) throw new Unauthorized()
    //console.log('Missing auth header')
    const token = authHeader.replace('Bearer ', '')
    console.log('token', token)
    const payload = jwt.verify(token, secret)
    console.log('payload', payload)
    const loggedInUser = await User.findById(payload.sub)
    console.log('logged in user', loggedInUser)
    req.loggedInUser = loggedInUser
    console.log(req.loggedInUser)
    if (!loggedInUser) throw new Unauthorized()
    //console.log('User not found')
  } catch (error) {
    console.log(error)
    return assessError(error, res)
  }
  next()
}