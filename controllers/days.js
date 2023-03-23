import Day from '../models/days.js'

export const addClassNotes = async (req, res, next)=>{
  // secureRoute(req, res, next)
  console.log('🗒️ post classwork notes route hit')
  console.log('req.loggedInUser', req.loggedInUser)
  try {
    //req.body.note = req.loggedInUser._id
    console.log('req.body', req.body)
    console.log('req.params', req.params)
    const notesToAdd = { ...req.body, owner: req.loggedInUser._id }
    console.log(notesToAdd)
    const { dayId } = req.params
    console.log('id', dayId)
    const day = await Day.findById(dayId)
    console.log('day', day)
    day.classworkNotes.push(notesToAdd)
    return res.status(201).json(day)
  } catch (err) {
    console.log(err)
    return res.status(422).json(err)
  }
}
