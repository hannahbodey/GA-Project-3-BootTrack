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

  return (
    <main className='main-container'>
      <BackButton />
      <h1 className={location.pathname !== '/days/:dayID' ? 'main-header' : ''}>Weekly Pulse</h1>
      <h1 className={location.pathname !== '/days/:dayID' ? 'main-header' : ''}>My Stats</h1>
      <h1 className={location.pathname !== '/days/:dayID' ? 'main-header' : ''}>My Uploads</h1>
      <div className='cards-container'>
        {studentWork.map((day, index) => {
          console.log(day)
          return (
            // <div key={index} className='card-div'>
            // <Card key={index} className='uploads-card'>
            // {/* <Card.Body> */}
            <>
              {day.homeworkUploads.length > 0 && <img key={index} src={day.homeworkUploads[0].homeworkLink} className='homework-image' onClick={handleFocus}/>}
              {day.classworkNotes.length > 0 && <p key={index} className='homework-image text-box overflow-auto' onClick={handleFocus} onTouchEnd={handleTouch} onScroll={handleScroll}>{day.classworkNotes[0].notesDescription}</p>}
            </>
            
          // {/* </Card.Body> */}
          // {/* <Card.Text> */}
          // {/* {day.classworkNotes && <p>{day.classworkNotes}</p>} */}
          // {/* </Card.Text> */}
          // </Card>
          // {/* </div> */}
          )


        })}
      </div>
    </main>
  )
}

export default ProfileView