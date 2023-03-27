import Day from '../models/days.js'
import { filterDayByUser } from '../helper/filterDays.js'
import { assessError, NotFound, DemoCaught } from '../config/errors.js'

export const modifyClassNotes = async (req, res) => {
  try {
    if (req.loggedInUser.isDemo === true) {
      throw new DemoCaught()
    }
    // LoggedInUserId, but represented as a string instead of an object so it can be compared later on
    const stringLoggedInUserId = req.loggedInUser._id.toString()
    // Destruct the params
    const { dayId } = req.params
    // Destruct the body
    const { notesDescription } = req.body
    // Retrieve the correct day, and throw an error if this does not exist
    const day = await Day.findById(dayId)
    if (!day) {
      throw new NotFound('Day not found')
    }
    // Retrieve the correct note, using 'find' method as notes are represented as an array
    const userClassNotes = day.classworkNotes.find(note => note.owner.toString() === stringLoggedInUserId)
    // If a note is not found with the users ID, we will create one
    if (!userClassNotes) {
      // If both fields are not being submitted in the request, then we error as both are required for creation
      if (notesDescription === undefined) throw new Error('Missing field')
      // If both fields are submitted, we create the note and assign the users ID as the 'owner'
      const newUserClassNotes = {
        notesDescription,// : notesDescription === '' ? null : notesDescription,
        owner: stringLoggedInUserId,
      }
      // We push the note into the notes array on completion
      day.classworkNotes.push(newUserClassNotes)
      // If a note is found, we simply update the field(s) submitted as per 'else'
    } else {
      // userClassNotes.notesDescription = notesDescription || userClassNotes.notesDescription
      if (notesDescription !== undefined) {
        userClassNotes.notesDescription = notesDescription// === '' ? null : notesDescription
      }
    }
    // We save all our updates on the day
    await day.save()
    // Finally, we filter in only the progress/classwork/homework belonging to that user
    const filteredDay = filterDayByUser(day, req.loggedInUser._id)
    // 200 returned as depending on the starting state, we are either creating (typically 201), or amending (typically 200/202)
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