import axios from 'axios'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { userTokenFunction, getPayload } from '../../helpers/auth'
import { useLocation } from 'react-router-dom'
import Card from 'react-bootstrap/Card'
import BackButton from '../common/BackButton'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { icon } from '@fortawesome/fontawesome-svg-core/import.macro'


const ProfileView = () => {

  const [studentWork, setStudentWork] = useState([])
  const [activeTitle, setActiveTitle] = useState('weeklyPulse')
  const [weeklyReports, setWeeklyReports] = useState([])

  const location = useLocation()
  const loggedInUserId = getPayload().sub


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
        const { data: reportsData } = await axios.get('api/reports', userToken)
        setWeeklyReports(reportsData)
      } catch (error) {
        console.log(error)
      }
    }
    getWork()
  }, [])

  const handleFocus = (e) => {
    e.target.classList.toggle('focus')
  }

  const handleTouch = (touch) => {
    touch.target.classList.toggle('focus')
  }

  const handleScroll = (e) => {
    e.target.classList.toggle('scroll')
  }

  const handleClickWeeklyPulse = () => {
    setActiveTitle('weeklyPulse')
  }

  const handleClickMyUploads = () => {
    setActiveTitle('myUploads')
  }

  const isWeekCompleted = (week) => {
    const weekDays = studentWork.filter(day => day.week === week)
    return weekDays.every(day => day.progress.some(progress => progress.completed))
  }

  const isReportSubmitted = (week) => {
    const report = weeklyReports.find(report => report.week === week)
    return report && report.responses.some(response => response.owner._id === loggedInUserId)
  }

  const renderWeekCard = (week) => {
    const weekCompleted = isWeekCompleted(week)
    const reportSubmitted = isReportSubmitted(week)
    const clickable = weekCompleted && !reportSubmitted

    const cardContent = (
      <Card key={week} className={`day ${clickable ? '' : 'non-clickable'} `}>
        <Card.Body>
          <Card.Text className='day-week'>Week {week}</Card.Text>
          {reportSubmitted && <Card.Text className='topic'>Report submitted</Card.Text>}
          {weekCompleted && !reportSubmitted && <Card.Text className='topic'>Ready to submit</Card.Text>}
          {!weekCompleted && !reportSubmitted && <Card.Text className='topic'>Week Incomplete</Card.Text>}
          {reportSubmitted && <Card.Text><FontAwesomeIcon icon={icon({ name: 'circle-check' })} className='green-circle' /></Card.Text>}
          {weekCompleted && !reportSubmitted && <Card.Text className='topic'><FontAwesomeIcon icon={icon({ name: 'circle-question' })} className='question-circle'/></Card.Text>}
          {!weekCompleted && !reportSubmitted && <Card.Text className='topic'><FontAwesomeIcon icon={icon({ name: 'lock' })} className='lock-icon'/></Card.Text>}
        </Card.Body>
      </Card>
    )

    if (clickable) {
      return <Link to={`/report/${week}`}>{cardContent}</Link>
    } else {
      return cardContent
    }
  }

  return (
    <main className='main-container'>
      <BackButton />
      <div className='profile-headers'>
        <h1 onClick={handleClickWeeklyPulse} className={activeTitle === 'weeklyPulse' ? 'main-header active' : 'main-header'}>Weekly Pulse</h1>
        <h1 onClick={handleClickMyUploads} className={activeTitle === 'myUploads' ? 'main-header active' : 'main-header'}>My Content</h1>
      </div>
      <div className='cards-container'>
        {activeTitle === 'weeklyPulse' && (
          <div className='progress-card'>
            {Array.from({ length: 12 }, (_, i) => i + 1).map(week => renderWeekCard(week))}
          </div>
        )}
        {activeTitle === 'myUploads' && studentWork.map((day, index) => (
          <>
            {day.homeworkUploads.length > 0 && <img key={index} src={day.homeworkUploads[0].homeworkLink} className='homework-image' onClick={handleFocus} />}
            {day.classworkNotes.length > 0 && <p key={index} className='homework-image text-box overflow-auto' onClick={handleFocus} onTouchEnd={handleTouch} onScroll={handleScroll}>{day.classworkNotes[0].notesDescription}</p>}
          </>
        ))}
      </div>
    </main>
  )
}

export default ProfileView