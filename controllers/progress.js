import Day from '../models/days.js'
import { filterDayByUser } from '../helper/filterDays.js'
import { assessError, NotFound, DemoCaught } from '../config/errors.js'

export const modifyProgress = async (req, res) => {
  try {
    if (req.loggedInUser.isDemo === true) {
      throw new DemoCaught()
    }
    const stringLoggedInUserId = req.loggedInUser._id.toString()
    const { dayId } = req.params
    const { completed, confidenceRating, bookmarked } = req.body[0]
    const day = await Day.findById(dayId)
    if (!day) {
      throw new NotFound('Day not found')
    }
    const userProgress = day.progress.find(p => p.owner.toString() === stringLoggedInUserId)
    if (!userProgress) {
      if ( completed === undefined || confidenceRating === undefined || bookmarked === undefined ) throw new Error('Missing fields')
      const newUserProgress = {
        completed,
        confidenceRating,
        bookmarked,
        owner: stringLoggedInUserId,
      }
      day.progress.push(newUserProgress)
    } else {
      userProgress.completed = (completed === undefined) ? userProgress.completed : completed
      userProgress.confidenceRating = confidenceRating || userProgress.confidenceRating
      userProgress.bookmarked = (bookmarked === undefined) ? userProgress.bookmarked : bookmarked      
    }
    await day.save()
    const filteredDay = filterDayByUser(day, req.loggedInUser._id)
    return res.status(200).json(filteredDay)
  } catch (err) {
    console.log(err)
    return assessError(err, res)
  }
}