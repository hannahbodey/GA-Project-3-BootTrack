import Day from '../models/days.js'

export const getAllDays = async (req, res) => {
  try {
    const days = await Day.find()
    //res.status(200).json({ message: 'Get all days' })
    return res.json(days)
  } catch (err) {
    console.log(err)
  }
}

export const getSingleDay = async (req, res) => {
  try {
    const { dayId } = req.params
    const day = await Day.findById(dayId)
    console.log('getting single day')

    if (!day) {
      throw new Error('Day not found')
    }

    return res.json(day)
  } catch (err) {
    console.log(err)
  }
}