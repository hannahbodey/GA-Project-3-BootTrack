import Day from '../models/days.js'
import { filterDayByUser } from '../helper/filterDays.js'
import { assessError, NotFound, DemoCaught } from '../config/errors.js'

export const modifyHomework = async (req, res) => {
  try {
    if (req.loggedInUser.isDemo === true) {
      throw new DemoCaught()
    }
    const stringLoggedInUserId = req.loggedInUser._id.toString()
    const { dayId } = req.params
    const { homeworkLink } = req.body
    const day = await Day.findById(dayId)
    if (!day) {
      throw new NotFound('Day not found')
    }
    const userHomework = day.homeworkUploads.find(note => note.owner.toString() === stringLoggedInUserId)
    if (!userHomework) {
      if (!homeworkLink) throw new Error('Missing field')
      const newUserHomework = {
        //homeworkTitle,
        homeworkLink,
        owner: stringLoggedInUserId
      }
      day.homeworkUploads.push(newUserHomework)
    } else {
      userHomework.homeworkTitle = homeworkTitle || userHomework.homeworkTitle
      userHomework.homeworkLink = homeworkLink || userHomework.homeworkLink
    }
    await day.save()
    const filteredDay = filterDayByUser(day, req.loggedInUser._id)
    return res.status(200).json(filteredDay)
  } catch (err) {
    return assessError(err, res)
  }
}

export const deleteHomework = async (req, res) => {
  try {
    if (req.loggedInUser.isDemo === true) {
      throw new DemoCaught()
    }
    const { dayId } = req.params
    const stringLoggedInUserId = req.loggedInUser._id.toString()

    const day = await Day.findById(dayId)
    if (!day) throw new NotFound('Day not found')

    const homeworkToDelete = day.homeworkUploads.find(hw => hw.owner.toString() === stringLoggedInUserId)
    if (!homeworkToDelete) throw new NotFound('Homework not found')

    await homeworkToDelete.deleteOne()

    await day.save()
    return res.sendStatus(204)
  } catch (err) {
    console.log(err)
    // if (err.kind === 'ObjectId') return res.status(422).json(err)
    return assessError(err, res)
  }
}