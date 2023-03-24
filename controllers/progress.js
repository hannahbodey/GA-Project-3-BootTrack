import Day from '../models/days.js'
import { filterDayByUser } from '../helper/filterDays.js'
import { assessError, NotFound } from '../config/errors.js'

export const modifyProgress = async (req, res) => {
  try {
    const stringLoggedInUserId = req.loggedInUser._id.toString()
    const { dayId } = req.params
    const { completed, confidenceRating, bookmarked } = req.body
    const day = await Day.findById(dayId)
    if (!day) {
      throw new NotFound('Day not found')
    }
    const userProgress = day.progress.find(p => p.owner.toString() === stringLoggedInUserId)
    if (!userProgress) {
      if (!completed || !confidenceRating || !bookmarked) throw new Error('Missing fields')
      const newUserProgress = {
        completed,
        confidenceRating,
        bookmarked,
        owner: stringLoggedInUserId,
      }
      day.progress.push(newUserProgress)
    } else {
      userProgress.completed = completed || userProgress.completed
      userProgress.confidenceRating = confidenceRating || userProgress.confidenceRating
      userProgress.bookmarked = bookmarked || userProgress.bookmarked
    }
    await day.save()
    const filteredDay = filterDayByUser(day, req.loggedInUser._id)
    return res.status(200).json(filteredDay)
  } catch (err) {
    return assessError(err, res)
  }
}