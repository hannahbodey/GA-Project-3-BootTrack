import { assessError, NotFound } from '../config/errors.js'
import WeeklyReport from '../models/weeklyReports.js'

export const getReports = async (req, res) => {
  try {
    const reports = await WeeklyReport.find().lean().populate('responses.owner')
    if (req.loggedInUser.teacher === true){
      return res.json(reports)
    }
    const filteredReports = reports.map(report => {
      report.responses = report.responses.filter(response => response.owner._id.toString() === req.loggedInUser._id.toString())
      return report
    })
    return res.json(filteredReports)
  } catch (err) {
    return assessError(err, res)
  }
}

export const submitReport = async (req, res) => {
  try {
    if (req.loggedInUser.isDemo === true) {
      throw new DemoCaught()
    }
    const { weekId } = req.params
    const stringLoggedInUserId = req.loggedInUser._id.toString()
    const existingReport = await WeeklyReport.findOne({ week: weekId })
    if (!existingReport) {
      throw new NotFound('Report not found')
    }
    const userReport = existingReport.responses.find(report => report.owner.toString() === stringLoggedInUserId)
    if (!userReport) {
      const newReport = { ...req.body, completed: true, owner: stringLoggedInUserId }
      existingReport.responses.push(newReport)
    } else {
      throw new Error('Report already submitted')
    }
    await existingReport.save()
    const filteredReports = existingReport.responses.filter(report => report.owner?.toString() === stringLoggedInUserId)
    return res.status(201).json(filteredReports)
  } catch (err) {
    return assessError(err, res);
  }
}
