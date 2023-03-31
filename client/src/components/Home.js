import { Link, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import axios from 'axios'

import completedDay from '../pictures/completed-day.png'
import dayOneOverview from '../pictures/day-3-overview.png'
import dailyProgressViewOne from '../pictures/demo-daily-progress-teacher-view.png'
import dailyProgressViewTwo from '../pictures/newuser-daily-progress-teacher-view.png'
import studentInitialView from '../pictures/student-initial-view.png'
import studentUploadsView from '../pictures/upload-overview.png'

const Home = () => {

  const [isActive, setIsActive] = useState('completed-view')
  const [error, setError] = useState('')
  const navigate = useNavigate()
  const delay = 5000
  let i = 0

  useEffect(() => {
    console.log('timeout hit')
    const interval = setInterval(() => {
      { i < 5 ? i++ : (i === 5 ? i = i - 5 : i) }
      setClass()
    }, delay)
    return () => clearInterval(interval)
  }, [])

  const setClass = () => {
    const classArray = ['completed-view', 'upload-view', 'progress-one-view', 'progress-two-view', 'student-view', 'uploads-overview']
    const activeClass = classArray[i]
    setIsActive(activeClass)
  }

  const loginDemo = async () => {
    try {
      const { data } = await axios.post('/api/demo-login')
      localStorage.setItem('PROJECT-3-TOKEN', data.token)
      navigate('/days')
    } catch (error) {
      console.log(error)
      setError(error.response.data.message)
    }
  }

  const loginJane = async () => {
    try {
      const { data } = await axios.post('/api/login', { email: 'jane@example.com', password: 'pass' })
      localStorage.setItem('PROJECT-3-TOKEN', data.token)
      navigate('/teacher')
    } catch (error) {
      console.log(error)
      setError(error.response.data.message)
    }
  }

  return (
    <main className='home'>
      <div className='overall-container'>
        <div className='slideshow'>
          <div className='home-title'>
            <h4>Choose BootTrack for all your student support services:</h4>
          </div>
          <div className={isActive === 'completed-view' ? 'image-display fade completed-view' : 'no-display'}>
            <div className='pic-container'>
              <img src={completedDay} className='home-image' />
              <h6 className='banner'>Allow students to mark days as completed</h6>
            </div>
          </div>
          <div className={isActive === 'upload-view' ? 'image-display fade upload-view' : 'no-display'}>
            <div className='pic-container'>
              <img src={dayOneOverview} className='home-image' />
              <h6 className='banner'>Students can upload their work and notes, and mark their progress on any day</h6>
            </div>
          </div>
          <div className={isActive === 'progress-one-view' ? 'image-display fade progress-one-view' : 'no-display'}>
            <div className='pic-container'>
              <img src={dailyProgressViewOne} className='home-image' />
              <h6 className='banner'>Teachers can view student progress and weekly updates</h6>
            </div>
          </div>
          <div className={isActive === 'progress-two-view' ? 'image-display fade progress-two-view' : 'no-display'}>
            <div className='pic-container'>
              <img src={dailyProgressViewTwo} className='home-image' />
              <h6 className='banner'>Teachers can view student progress and weekly updates</h6>
            </div>
          </div>
          <div className={isActive === 'student-view' ? 'image-display fade student-view' : 'no-display'}>
            <div className='pic-container'>
              <img src={studentInitialView} className='home-image' />
              <h6 className='banner'>Students can view and access all days on their course, ready for interaction</h6>
            </div>
          </div>
          <div className={isActive === 'uploads-overview' ? 'image-display fade uploads-overview' : 'no-display'}>
            <div className='pic-container'>
              <img src={studentUploadsView} className='home-image' />
              <h6 className='banner'>Students can view all homework and classwork uploads</h6>
            </div>
          </div>
        </div>
        <div className='hero home-form-container'>
          <h2>Sign up now!</h2>
          <Link to='/register' className={location.pathname === '/register' ? 'active red-button' : 'red-button'}>Register</Link>
          <Link to='/login' className={location.pathname === '/login' ? 'active red-button' : 'red-button'}>Login</Link>
          <h3>Trial teacher mode!</h3>
          <button className='red-button' onClick={loginJane}>Teacher Demo</button>
          <h3>Check out student view!</h3>
          <button className='red-button' onClick={loginDemo}>Student Demo</button>
        </div>
      </div >
    </main >
  )
}

export default Home