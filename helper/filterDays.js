export const filterDayByUser = (day, userId) => {
  day.progress = day.progress.filter(progress => progress.owner?.toString() === userId.toString())
  day.homeworkUploads = day.homeworkUploads.filter(homework => homework.owner?.toString() === userId.toString())
  day.classworkNotes = day.classworkNotes.filter(notes => notes.owner?.toString() === userId.toString())
  return day
}