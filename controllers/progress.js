import Day from '../models/days.js'

export const putProgress = async (req,res) =>{
  try {
    const { dayId } = req.params

    const day = await Day.findById(dayId)
    if (!day) throw new Error('Day not found')

    const createdProgress = { ...req.body, user: req.loggedInUser._id }

    day.progress.push(createdProgress)
    console.log('DAY -->', day)

    await day.save()

    return res.status(201).json(day)
  
  } catch (err) {
    console.log(err)
    return res.status(422).json(err)
  }
}