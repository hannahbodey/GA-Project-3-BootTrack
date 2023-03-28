import axios from 'axios'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { userTokenFunction } from '../../helpers/auth'

const ProfileView = () => {

  const [studentWork, setStudentWork] = useState([])

  useEffect(() => {
    const getWork = async () => {
      try {
        const userToken = userTokenFunction()
        const { data } = await axios.get('api/days', userToken)
        console.log(data)
        setStudentWork(data)
      } catch (error) {
        console.log(error)
      }
    }
    getWork()
  }, [])

  return (
    <>
      <h1>My Uploads</h1>
      {/* {studentWork.map(day => {
        console.log(day)
        console.log(day.homeworkUploads[0])
        {day.homeworkUploads[0] ? <img src={day.homeworkUploads[0].homeworkLink}/> : <Link to='/days/:dayId' /> }
        {day.classworkNotes && <p>{day.classworkNotes}</p>}
      })} */}
    </>
  )
}

export default ProfileView