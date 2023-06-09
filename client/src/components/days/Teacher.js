import axios from 'axios'
import { useEffect, useState } from 'react'
import { userTokenFunction, teacherCheck } from '../../helpers/auth'
import TeacherProgressView from '../common/TeacherProgressView'
import TeacherReportView from '../common/TeacherReportView'

const Teacher = () => {
  const [studentWork, setStudentWork] = useState([])
  const [studentList, setStudentList] = useState([])
  const [filters, setFilters] = useState({
    student: '',
  })
  const [filteredWork, setFilteredWork] = useState([])
  const [filteredReports, setFilteredReports] = useState([])
  const [weeklyData, setWeeklyData] = useState([])
  const [error, setError] = useState('')
  const [activeTitle, setActiveTitle] = useState('dailyProgress')

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
      const newWork = studentWork.map((day) => {
        return { ...day, progress: day.progress.filter(item => item.owner.username === filters.student) }
      })
      setFilteredWork(newWork)
    }
  }, [filters, studentWork])

  useEffect(() => {
    if (weeklyData.length) {
      identifyStudent()
      const newReports = weeklyData.map((data) => {
        return { ...data, responses: data.responses.filter(item => item.owner.username === filters.student) }
      })
      setFilteredReports(newReports)
    }
  }, [filters, studentWork])

  const identifyStudent = () => {
    const newList = [...new Set(studentWork.reduce((acc, day) => {
      return [...acc, ...day.progress.map(day => day.owner.username)]
    }, []))]
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
      {teacherCheck() ?
        <>
          <div className='profile-headers'>
            <h1 onClick={handleClickDailyProgress} className={activeTitle === 'dailyProgress' ? 'main-header active' : 'main-header'}>Student Daily Progress</h1>
            <h1 onClick={handleClickWeeklyReport} className={activeTitle === 'weeklyProgress' ? 'main-header active' : 'main-header'}>Student Weekly Reports</h1>
          </div>
          <div className='filter'>
            <select name='filter-daily' id='filter-daily' value={filters.student} onChange={handleChange}>
              <option key='selectstudent' value='selectstudent'>Select a student</option>
              {studentList.length > 0 ?
                studentList.map((student) => {
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
                <TeacherProgressView filteredWork={filteredWork} />
              </>
            }
            {activeTitle === 'weeklyProgress' &&
              <>
                <TeacherReportView weeklyData={filteredReports} />
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