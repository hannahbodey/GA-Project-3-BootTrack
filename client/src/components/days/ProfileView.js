import axios from 'axios'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { userTokenFunction } from '../../helpers/auth'
import { useLocation } from 'react-router-dom'
import Card from 'react-bootstrap/Card'
import Container from 'react-bootstrap/Container'
import BackButton from '../common/BackButton'

const ProfileView = () => {

  const [studentWork, setStudentWork] = useState([])
  const [activeTitle, setActiveTitle] = useState('weeklyPulse')

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

  const handleClickMyStats = () => {
    setActiveTitle('myStats')
  }

  const handleClickMyUploads = () => {
    setActiveTitle('myUploads')
  }

  return (
    <main className='main-container'>
      <BackButton />
      <div className='profile-headers'>
        <h1 onClick={handleClickWeeklyPulse} className={activeTitle === 'weeklyPulse' ? 'main-header active' : 'main-header'}>Weekly Pulse</h1>
        <h1 onClick={handleClickMyStats} className={activeTitle === 'myStats' ? 'main-header active' : 'main-header'}>My Stats</h1>
        <h1 onClick={handleClickMyUploads} className={activeTitle === 'myUploads' ? 'main-header active' : 'main-header'}>My Uploads</h1>
      </div>
      <div className='cards-container'>
        {activeTitle === 'weeklyPulse' && (
          <h1>Testing Pulse</h1>
        )}

        {activeTitle === 'myStats' && (
          <h1>Testing Stats</h1>
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