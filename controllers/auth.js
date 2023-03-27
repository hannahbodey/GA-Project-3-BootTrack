import User from '../models/users.js'
import Day from '../models/days.js'
import jwt from 'jsonwebtoken'
import 'dotenv/config'
import { assessError, Unauthorized, NotFound } from '../config/errors.js'

const secret = process.env.SECRET

export const registerUser = async (req,res) =>{
  try {
    const newUser = await User.create(req.body)

    const days = await Day.find()

    for (const day of days) {

      const progressData = {
        completed: false,
        confidenceRating: 0,
        bookmarked: false,
        owner: newUser._id,
      }

      day.progress.push(progressData)

      await day.save()

    }

    return res.status(201).json({ message: `Welcome ${newUser.username}` })
  } catch (err) {
    return assessError(err, res)
  }
}

export const loginUser = async (req, res) =>{
  try {
    const { email, password } = req.body
    const userToLogin = await User.findOne({ email: email })
    if (!userToLogin) {
      throw new Unauthorized('Invalid credentials')
    }
    const userIsValidated = await userToLogin.validatePassword(password)
    if (!userIsValidated) {
      throw new Unauthorized('Invalid credentials')
    }
    const token = jwt.sign({ sub: userToLogin._id }, secret, { expiresIn: '7d' })
    return res.json({ message: `Welcome, ${userToLogin.username}`, token: token })
  } catch (err) {
    return assessError(err, res)
  }
}

export const loginDemo = async (req, res) => {
  try {
    const demoUser = await User.findOne({ email: 'demo@demo.com' })
    if (!demoUser) {
      throw new NotFound('Demo user not found')
    }
    const token = jwt.sign({ sub: demoUser._id }, secret, { expiresIn: '7d' })
    return res.json({ message: `Welcome, ${demoUser.username}`, token: token })
  } catch (err) {
    return assessError(err, res)
  }
}

export const getUser = async (req, res) => {
  try {
    const user = req.loggedInUser
    delete user.password
    return res.json(user)
  } catch (err) {
    return assessError(err, res)
  }
}