import axios from 'axios'
import { useEffect, useState } from 'react'
import { userTokenFunction, teacherCheck } from '../../helpers/auth'
import { useLocation } from 'react-router-dom'
import BackButton from '../common/BackButton'

const Teacher = () => {
  const [studentWork, setStudentWork] = useState([])
  const location = useLocation()

  useEffect(() => {
    const getWork = async () => {
      try {
        const userToken = userTokenFunction()
        const { data } = await axios.get('api/days', userToken)
        setStudentWork(data)
      } catch (error) {
        console.log(error)
      }
    }
    getWork()
  }, [])

  return (
    <main className='main-container'>
      <BackButton />
      {teacherCheck() ? 
        <>
          <h1 className={location.pathname !== '/days/:dayID' ? 'main-header' : ''}>Student Progress</h1>
          {studentWork.map((day, index) => {
            console.log(day.progress[0].completed)
            return (
              <>
                {day.progress && <p key={index}>{day.progress[0].completed.toString()}</p>}
                {/* {day.progress && <p key={index}>{day.progress.confidenceRating}</p>}
                {day.progress && <p key={index}>{day.progress.bookmarked}</p>}
                {day.progress && <p key={index}>{day.progress.owner}</p>}
                {day.progress && <p key={index}>{day.progress._id}</p>} */}
              </>
            )
          })}
        </>
        :
        <p>no access</p>
      }
    </main>
    
  )
}

export default Teacher