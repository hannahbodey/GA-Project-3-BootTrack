import Day from '../models/days.js'
import { filterDayByUser } from '../helper/filterDays.js'
import { assessError, NotFound } from '../config/errors.js'

export const modifyClassNotes = async (req, res) => {
  try {
    // LoggedInUserId, but represented as a string instead of an object so it can be compared later on
    const stringLoggedInUserId = req.loggedInUser._id.toString()
    // Destruct the params
    const { dayId } = req.params
    // Destruct the body
    const { notesTitle, notesDescription } = req.body
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
      if (!notesTitle || !notesDescription) throw new Error('Missing fields')
      // If both fields are submitted, we create the note and assign the users ID as the 'owner'
      const newUserClassNotes = {
        notesTitle,
        notesDescription,
        owner: stringLoggedInUserId,
      }
      // We push the note into the notes array on completion
      day.classworkNotes.push(newUserClassNotes)
      // If a note is found, we simply update the field(s) submitted as per 'else'
    } else {
      userClassNotes.notesTitle = notesTitle || userClassNotes.notesTitle
      userClassNotes.notesDescription = notesDescription || userClassNotes.notesDescription
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
    const { dayId } = req.params
    const loggedInUserId = req.loggedInUser._id
    const stringLoggedInUserId = loggedInUserId.toString()

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