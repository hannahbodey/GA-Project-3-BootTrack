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
  const [studentList, setStudentList] = useState([])
  const [filters, setFilters] = useState({
    student: '',
  })
  const [filteredWork, setFilteredWork] = useState([])
  const location = useLocation()
  const [weeklyData, setWeeklyData] = useState([])
  const [error, setError] = useState('')
  const [activeTitle, setActiveTitle] = useState('weeklyProgress')

  useEffect(() => {
    const getWork = async () => {
      try {
        const userToken = userTokenFunction()
        const { data } = await axios.get('api/days', userToken)
        const sortedDays = data.sort((a, b) => {
          if (a.week !== b.week) {
            return a.week - b.week
          }
          return a.day - b.day
        })
        console.log(sortedDays)
        setStudentWork(sortedDays)
      } catch (error) {
        console.log(error)
        setError(error)
      }
    }
    getWork()
  }, [])

  useEffect(() => {
    const getReports = async () => {
      try {
        const userToken = userTokenFunction()
        const { data } = await axios.get('api/reports', userToken)
        console.log('reports data', data)
        const sortedDays = data.sort((a, b) => {
          if (a.week !== b.week) {
            return a.week - b.week
          }
          return a.day - b.day
        })
        setWeeklyData(sortedDays)
      } catch (error) {
        console.log(error)
        setError(error)
      }
    }
    getReports()
  }, [])

  useEffect(() => {
    if (studentWork.length) {
      identifyStudent()
      setFilteredWork(studentWork.filter(work => {
        return filters.student === work.progress[0].owner.username || filters.work === 'All'
      }))
    }
  }, [filters, studentWork])

  const identifyStudent = () => {
    const newList = [...new Set(studentWork?.map(day => day.progress.map(progress => progress.owner.username)))].sort()
    console.log('new list', newList)
    setStudentList(newList)
  }

  const handleChange = (e) => {
    const studentName = e.target.value
    const newFilters = { ...filters, student: studentName }
    setFilters(newFilters)
  }

  const handleClickDailyProgress = () => {
    setActiveTitle('dailyProgress')
  }

  const handleClickWeeklyReport = () => {
    setActiveTitle('weeklyProgress')
  }
  return (
    <main className='main-container'>
      <BackButton />
      {teacherCheck() ?
        <>
          <div className='profile-headers'>
            <h1 onClick={handleClickDailyProgress} className={activeTitle === 'dailyProgress' ? 'main-header active' : 'main-header'}>Student Daily Progress</h1>
            <h1 onClick={handleClickWeeklyReport} className={activeTitle === 'weeklyProgress' ? 'main-header active' : 'main-header'}>Student Weekly Reports</h1>
          </div>
          <div className='filter'>
            <select name='filter-daily' id='filter-daily' value={filters.student} onChange={handleChange}>
              <option key='selectstudent' value='selectstudent'>Select a student</option>
              <option key='Lucy' value='Lucy'>Lucy</option>
              {studentList.length > 0 ?
                studentList.map((student) => {
                  console.log('student', student)
                  return <option key={student} value={student}>{student}</option>
                })
                :
                <option key='add' value='add'>Add your class</option>
              }
            </select>
          </div>
          <div className='cards-container'>
            {activeTitle === 'dailyProgress' &&
              <>
                <div className='days-container'>
                  {filteredWork.length > 0 && filteredWork.map((day) => {
                    return (
                      <div key={day._id} className='day'>
                        <Card>
                          <Card.Body >
                            {/* {day.progress && <Card.Text className='owner'>{day.progress[0].owner.username}</Card.Text>} */}
                            {day.progress && <Card.Text className='owner'>Week: {day.week} Day: {day.day}</Card.Text>}
                            {day.progress && day.progress.length > 0 && day.progress[0].completed === false ? <Card.Text>Work completed? <FontAwesomeIcon icon={icon({ name: 'circle-xmark' })} className='red-circle' /></Card.Text> : <Card.Text>Work completed? <FontAwesomeIcon icon={icon({ name: 'circle-check' })} className='green-circle' /></Card.Text>}
                            {day.progress && <Card.Text className='progress-class'>Confidence rating: {day.progress[0].confidenceRating}</Card.Text>}
                            {day.progress && day.progress.length > 0 && day.progress[0].bookmarked === false ? <Card.Text>Needs help? <FontAwesomeIcon icon={icon({ name: 'circle-xmark' })} className='red-circle' /></Card.Text> : <Card.Text>Needs help? <FontAwesomeIcon icon={icon({ name: 'circle-check' })} className='green-circle' /></Card.Text>}
                          </Card.Body>
                        </Card>
                      </div>
                    )
                  })}
                  {!filteredWork.length > 0 && <p>Student has not yet completed work.</p>}
                </div>
              </>
            }
            {activeTitle === 'weeklyProgress' &&
              <>

                <div className='days-container'>
                  {weeklyData.length ?
                    weeklyData.map((day) => {
                      const weekIndex = uuid()
                      const index = uuid()
                      return (
                        <div key={index} className='day'>
                          <Card>
                            <Card.Body >
                              {day.week && <Card.Text className='owner' key={weekIndex}>{day.week}</Card.Text>}
                            </Card.Body>
                          </Card>
                        </div>
                      )
                    })
                    :
                    <p>No student data.</p>
                  }
                </div>
              </>
            }
          </div>
        </>
        :
        <p>no access</p>
      }
    </main>
  )
}

export default Teacher