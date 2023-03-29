import { assessError, NotFound } from '../config/errors.js'
import Report from '../models/weeklyReports.js'

export const getAllReports = async (req, res) => {
  try {
    const reports = await Report.find()
    return res.json(reports)
  } catch (err) {
    return assessError(err, res)
  }
}