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
  const [formFields, setFormFields] = useState({
    email: '',
    password: '',
  })
  const navigate = useNavigate()
  const delay = 5000
  let i = 0

  const handleChange = (e) => {
    console.log(e.target.name)
    setFormFields({ ...formFields, [e.target.name]: e.target.value })
    setError('')
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const { data } = await axios.post('/api/login', formFields)
      localStorage.setItem('PROJECT-3-TOKEN', data.token)
      navigate('/days')
    } catch (error) {
      console.log(error)
      setError(error.response.data.message)
    }
  }

  useEffect(() => {
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

  const loginTeacherDemo = async () => {
    try {
      const { data } = await axios.post('/api/login', { email: 'demo2@demo.com', password: 'demo456' })
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
            <h3>Choose BootTrack for all your student support services:</h3>
          </div>
          <div className={isActive === 'completed-view' ? 'image-display fade completed-view' : 'no-display'}>
            <div className='pic-container'>
              <img src={completedDay} className='home-image' />
              <h6 className='banner'>Allow students to mark days as completed</h6>
            </div>
          </div>
          <div className={isActive === 'upload-view' ? 'image-display fade upload-view pic-overall' : 'no-display'}>
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
          <h2>Log In</h2>
          <form onSubmit={handleLogin} className='home-form'>
            <input
              type='email'
              name='email'
              placeholder='Email'
              onChange={handleChange}
              value={formFields.email}
              required
            />
            <input
              type='password'
              name='password'
              placeholder='Password'
              onChange={handleChange}
              value={formFields.password}
              required
            />
            <button type='submit' className='red-button'>
              Log In
            </button>
            {error && <p className='text-danger text-center'>{error}</p>}
          </form>
          <p>
            Don&apos;t have an account? <Link to='/register'><span className='register-text'>Register</span></Link>
          </p>
          <h3>Try our demos</h3>
          <button className='red-button demo-button' onClick={loginDemo}>
            Student Demo
          </button>
          <button className='red-button demo-button' onClick={loginTeacherDemo}>
            Teacher Demo
          </button>
        </div>
      </div >
    </main >
  )
}

export default Home