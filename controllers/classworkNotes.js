import Day from '../models/days.js'

export const addClassNotes = async (req, res) => {
  console.log('🗒️ post classwork notes route hit')
  console.log('req.loggedInUser', req.loggedInUser)
  try {
    //req.body.note = req.loggedInUser._id
    console.log('req.body', req.body)
    console.log('req.params', req.params)
    // const notesToAdd = { ...req.body, owner: req.loggedInUser._id }
    // console.log(notesToAdd)
    const loggedInUserId = req.loggedInUser._id
    console.log('user id object', loggedInUserId)
    const stringLoggedInUserId = loggedInUserId.toString()
    console.log('string user id', stringLoggedInUserId)
    const { dayId } = req.params
    console.log('id', dayId)
    const { notesTitle, notesDescription } = req.body
    console.log('body', notesTitle, notesDescription)

    const day = await Day.findById(dayId)
    // console.log('day', day)

    const userClassNotes = day.classworkNotes.find(note => note.owner === stringLoggedInUserId)
    console.log('CHECK', userClassNotes)

    if (!userClassNotes) {
      if (!notesTitle || !notesDescription) throw new Error('Missing fields')
      const newUserClassNotes = {
        notesTitle,
        notesDescription,
        owner: stringLoggedInUserId,
      }
      day.classworkNotes.push(newUserClassNotes)
    } else {
      userClassNotes.notesTitle = notesTitle || userClassNotes.notesTitle
      userClassNotes.notesDescription = notesDescription || userClassNotes.notesDescription
    }

    await day.save()

    // day.classworkNotes.push(notesToAdd)
    return res.status(201).json(day)
  } catch (err) {
    console.log(err)
    return res.status(422).json(err)
  }
}

export const updateClassNotes = async (req, res) => {
  try {
    const { dayId } = req.params
    const day = await Day.findById(dayId)

    if (!day) throw new Error('Day not found')

    const noteToAdd = { ...req.body, user: req.loggedInUser._id }
    day.notes.push(noteToAdd)

    await day.save()

    return res.status(201).json(day)

  } catch (err) {
    console.log(err)
    return res.status(422).json(err)
  }
}

export const deleteClassNotes = async (req, res) => {
  try {
    const { dayId, noteId } = req.params
    const loggedInUserId = req.loggedInUser._id

    const day = await Day.findById(dayId)

    if (!day) throw new Error('Day not found')


    const noteToDelete = day.notes.id(noteId)
    if (!noteToDelete) throw new Error('Notes not found')

    if (!noteToDelete.owner.equals(loggedInUserId)) {
      console.log('Owner not found')
      throw new Error('Unauthorized')
    }
    await noteToDelete.deleteOne()

    await day.save()

    return res.sendStatus(204)
  } catch (err) {
    console.log(err)
    return res.status(404).json(err)
  }
}