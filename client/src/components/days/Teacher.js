import axios from 'axios'
import { v4 as uuid } from 'uuid'
import { useEffect, useState } from 'react'
import { userTokenFunction, teacherCheck } from '../../helpers/auth'
import { useLocation } from 'react-router-dom'
import BackButton from '../common/BackButton'
import Card from 'react-bootstrap/Card'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { icon } from '@fortawesome/fontawesome-svg-core/import.macro'

const Teacher = () => {
  const [studentWork, setStudentWork] = useState([])
  const location = useLocation()
  const [studentList, setStudentList] = useState([])

  useEffect(() => {
    const getWork = async () => {
      try {
        const userToken = userTokenFunction()
        const { data } = await axios.get('api/days', userToken)
        //console.log({ ...data, id: uuid() } )
        setStudentWork(data)
      } catch (error) {
        console.log(error)
      }
    }
    getWork()
    identifyStudent()
  }, [])

  const identifyStudent = () => {
    setStudentList([ ...new Set(studentWork.map(day => day.progress[0].owner))].sort())
    // .map(owner => {
    //   return <option key={owner} value={owner}>{owner}</option>
    // })
  }

  return (
    <main className='main-container'>
      <BackButton />
      {teacherCheck() ?
        <>
          <h1 className={location.pathname !== '/days/:dayID' ? 'main-header' : ''}>Student Progress</h1>
          <div className='filter'>
            <select name='filter-daily' id='filter-daily'>
              <option key='all' value='all'>All</option>
              {studentList.map(student => {
                return <option key={student} value={student}>{student}</option>
              })}
            </select>
          </div>
          <div className='days-container'>
            {studentWork.map((day) => {
              console.log(day.progress[0].owner)
              const completedIndex = uuid()
              const confidenceIndex = uuid()
              const bookmarkedIndex = uuid()
              const ownerIndex = uuid()
              const overallIndex = uuid()
              return (
                <div key={overallIndex} className='day'>
                  <Card>
                    {/* <FontAwesomeIcon icon={icon({ name: 'bookmark' })} className='bookmark-icon' />
                    ) : null} */}
                    <Card.Body >
                      {day.progress && <Card.Text className='owner' key={ownerIndex}>{day.progress[0].owner}</Card.Text>}
                      {/* {day.progress && <Card.Text className='progress-class' key={completedIndex}>Work Completed? {day.progress[0].completed.toString()}</Card.Text>} */}
                      {day.progress && day.progress.length > 0 && day.progress[0].completed === false ? <Card.Text>Work completed? <FontAwesomeIcon icon={icon({ name: 'circle-xmark' })} className='red-circle' /></Card.Text> : <Card.Text>Work completed? <FontAwesomeIcon icon={icon({ name: 'circle-check' })} className='green-circle' /></Card.Text>}
                      {day.progress && <Card.Text className='progress-class' key={confidenceIndex}>Confidence rating: {day.progress[0].confidenceRating}</Card.Text>}
                      {/* {day.progress && <Card.Text className='progress-class' key={bookmarkedIndex}>{day.progress[0].bookmarked.toString()}</Card.Text>} */}
                      {day.progress && day.progress.length > 0 && day.progress[0].bookmarked === false ? <Card.Text>Needs help? <FontAwesomeIcon icon={icon({ name: 'circle-xmark' })} className='red-circle' /></Card.Text> : <Card.Text>Needs help? <FontAwesomeIcon icon={icon({ name: 'circle-check' })} className='green-circle' /></Card.Text>}

                      {/* <Card.Text className='day-week'>STUDENT {week} - DAY {day}</Card.Text>
                    <Card.Text className='topic'>{topicTitle}</Card.Text>
                    {progress && progress.length > 0 && progress[0].completed === false ? <Card.Text><FontAwesomeIcon icon={icon({ name: 'circle-xmark' })} className='red-circle' /></Card.Text> : <Card.Text><FontAwesomeIcon icon={icon({ name: 'circle-check' })} className='green-circle' /></Card.Text>} */}
                    </Card.Body>


                  </Card>

                  {/* {day.progress && <p key={index}>{day.progress._id}</p>} */}
                </div>
              )
            })}
          </div>
        </>
        :
        <p>no access</p>
      }
    </main>

  )
}

export default Teacher