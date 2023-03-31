import Day from '../models/days.js'
import { filterDayByUser } from '../helper/filterDays.js'
import { assessError, NotFound, DemoCaught } from '../config/errors.js'

export const modifyClassNotes = async (req, res) => {
  try {
    if (req.loggedInUser.isDemo === true) {
      throw new DemoCaught()
    }
    const stringLoggedInUserId = req.loggedInUser._id.toString()
    const { dayId } = req.params
    const { notesDescription } = req.body
    const day = await Day.findById(dayId)
    if (!day) {
      throw new NotFound('Day not found')
    }
    const userClassNotes = day.classworkNotes.find(note => note.owner.toString() === stringLoggedInUserId)
    if (!userClassNotes) {
      if (notesDescription === undefined) throw new Error('Missing field')
      const newUserClassNotes = {
        notesDescription,
        owner: stringLoggedInUserId
      }
      day.classworkNotes.push(newUserClassNotes)
    } else {
      if (notesDescription !== undefined) {
        userClassNotes.notesDescription = notesDescription
      }
    }
    await day.save()
    const filteredDay = filterDayByUser(day, req.loggedInUser._id)
    return res.status(200).json(filteredDay)
  } catch (err) {
    return assessError(err, res)
  }
}

export const deleteClassNotes = async (req, res) => {
  try {
    if (req.loggedInUser.isDemo === true) {
      throw new DemoCaught()
    }
    const { dayId } = req.params
    const stringLoggedInUserId = req.loggedInUser._id.toString()
    const day = await Day.findById(dayId)
    if (!day) throw new NotFound('Day not found')
    const userClassNotes = day.classworkNotes.find(note => note.owner.toString() === stringLoggedInUserId)
    if (!userClassNotes) throw new NotFound('No note found')
    await userClassNotes.deleteOne()
    await day.save()
    return res.sendStatus(204)
  } catch (err) {
    console.log(err)
    return assessError(err, res)
  }
}