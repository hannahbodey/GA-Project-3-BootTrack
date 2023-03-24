import Day from '../models/days.js'

export const modifyHomework = async (req, res)=>{
  try {
    const { dayId } = req.params

    const day = await Day.findById(dayId)
    if (!day) throw new Error('Day not found')

    const createdHomeWork = { ...req.body, user: req.loggedInUser._id }

    day.homework.push(createdHomeWork)
    console.log('DAY -->', day)

    await day.save()

    return res.status(201).json(day)

  } catch (err) {
    console.log(err)
    return res.status(422).json(err)
  }
}

// export const updateHomework = async (req,res)=>{
//   try {
//     const { dayId, homeworkId } = req.params
//     const loggedInUser = req.loggedInUser._id

//     const day = await Day.findById(dayId)
//     if (!day) throw new Error('Day not found')

//     const homeworkToUpdate = day.homework.id(homeworkId)
//     if (!homeworkToUpdate) throw new Error('Homework not found')

//     if (!homeworkToUpdate.user.equals(loggedInUser)){
//       console.log('NOT your HOMEWORK')
//       throw new Error('Unauthorized')

//     } 
//   } catch (err){
//     console.log(err)
//     return res.status(422).json(err)
//   }
  
// }

export const deleteHomework = async (req,res)=>{
  try {
    const { dayId, homeworkId } = req.params
    const loggedInUser = req.loggedInUser._id

    const day = await Day.findById(dayId)
    if (!day) throw new Error('Day not found')

    const homeworkToDelete = day.homework.id(homeworkId)
    if (!homeworkToDelete) throw new Error('Homework not found')

    if (!homeworkToDelete.user.equals(loggedInUser)){
      console.log('NOT your HOMEWORK')
      throw new Error('Unauthorized')
    }

    await homeworkToDelete.deleteOne()
    console.log(day)

    await day.save()
    return res.sendStatus(204)

  } catch (err){
    console.log(err)
    if (err.kind === 'ObjectId') return res.status(422).json(err)
    return res.status(404).json(err)
  }
}