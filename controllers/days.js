import { filterDayByUser } from '../helper/filterDays.js'
import { assessError, NotFound } from '../config/errors.js'
import Day from '../models/days.js'

export const getAllDays = async (req, res) => {
  try {
    const days = await Day.find().lean().populate('progress.owner')
    // const daysPopulated = days.map(day => {
    //   dayOwner = await Day.populate()
    //   return day.populate('owner')
    // })
    if (req.loggedInUser.teacher === true) {
      console.log('days', days[0].progress)
      return res.json(days)
    }

    const filteredDays = days.map(day => {
      day.progress = day.progress.filter(progress => progress.owner._id?.toString() === req.loggedInUser._id.toString())
      day.homeworkUploads = day.homeworkUploads.filter(homework => homework.owner._id?.toString() === req.loggedInUser._id.toString())
      day.classworkNotes = day.classworkNotes.filter(notes => notes.owner._id?.toString() === req.loggedInUser._id.toString())
      return day
    })

    return res.json(filteredDays)
  } catch (err) {
    return assessError(err, res)
  }
}

export const getTeacherDays = async (req, res) => {
  try {
    const days = await Day.find().lean().populate('progress.owner')
    return res.json(days)

  } catch (err) {
    return assessError(err, res)
  }
}

export const getSingleDay = async (req, res) => {
  try {
    const { dayId } = req.params
    const day = await Day.findById(dayId).lean()
    console.log('getting single day')
    if (!day) {
      throw new NotFound('Day not found')
    }
    filterDayByUser(day, req.loggedInUser._id)
    return res.json(day)
  } catch (err) {
    return assessError(err, res)
  }
}