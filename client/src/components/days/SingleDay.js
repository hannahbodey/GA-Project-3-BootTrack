import axios from 'axios'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import Error from '../common/Error'

import { userTokenFunction } from '../../helpers/auth'

import HomeworkSubmission from '../common/HomeworkSubmission'

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import NotesSubmission from '../common/NotesSubmission'


const SingleDay = () => {

  const [day, setDay] = useState(null)
  const [error, setError] = useState('')
  const [demoAccount, setDemoAccount] = useState(false)
  const [homeworkForm, setHomeworkForm] = useState({
    homeworkLink: '',
  })
  const { dayId } = useParams()
  console.log(dayId)

  useEffect(() => {
    const getDay = async () => {
      try {
        const userToken = userTokenFunction()
        const { data } = await axios.get(`/api/days/${dayId}`, userToken)
        setDay(data)
      } catch (error) {
        console.log(error)
        setError(error.response.data.message)
      }
    }
    const checkDemo = async () => {
      try {
        const userToken = userTokenFunction()
        const { data } = await axios.get('/api/user', userToken)
        setDemoAccount(data.isDemo)
      } catch (error) {
        console.log(error)
      }
    }
    getDay()
    checkDemo()
  }, [dayId])

  const handleUpload = async (e) => {
    const image = e.target.files[0]
    console.log(image)
    const dataPic = new FormData()
    dataPic.append('file', image)
    console.log('file', dataPic)
    dataPic.append('upload_preset', process.env.REACT_APP_UPLOAD_PRESET)
    console.log(dataPic)
    try {
      const { data } = await axios.post(`https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUDNAME}/image/upload`, dataPic)
      console.log('secure URL for cloud', data.secure_url)
      setHomeworkForm({ ...homeworkForm, homeworkLink: data.secure_url })
    } catch (error) {
      console.log(error)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const userToken = userTokenFunction()
      const { data } = await axios.put(`/api/days/${dayId}/homework`, homeworkForm, userToken)
    } catch (error) {
      console.log(error)
      setError(error.response.data.message)
    }
  }

  return (
    <main className='main-container'>
      <Container>
        <Row>
          {day ?
            <>
              <Col xs='12'>
                <h1>Week {day.week} Day {day.day}</h1>
                <h2>{day.topicTitle}</h2>
              </Col>
              <Col lg='6' md='6' sm='12'>
                <form className='image-field' onSubmit={handleSubmit}>
                  <label>Homework Uploads</label>
                  { homeworkForm.homeworkLink ? <img src={homeworkForm.homeworkLink} /> : <input type="file" onChange={handleUpload}/> }
                  <button className='red-button'>Submit Homework</button>
                </form>
                {day.progress &&
                  day.progress.map((p, index) => {
                    const { completed, confidenceRating, bookmarked } = p
                    return (
                      <div key={index}>
                        <h4>Progress:</h4>
                        <div>
                          Completed: {completed.toString()}
                        </div>
                        <div>
                          Confidence Rating: {confidenceRating}
                        </div>
                        <div>
                          Bookmarked: {bookmarked.toString()}
                        </div>
                      </div>
                    )
                  })}
              </Col>
              <Col lg='6' md= '6' sm='12'>
                <h4>Class Notes</h4>
                {day.classworkDescription.length > 1 ?
                  day.classworkDescription.map(day => {
                    return (
                      <p key={day}>{day}</p>
                    )
                  })
                  :
                  <>
                    <p>{day.classworkDescription}</p>
                  </>
                }
                <h4>Homework Instructions</h4>
                {day.homeworkDescription.length > 1 ?
                  day.homeworkDescription.map(day => {
                    return (
                      <p key={day}>{day}</p>
                    )
                  })
                  :
                  <>
                    <p>{day.homeworkDescription}</p>
                  </>
                }
                {day.homeworkUploads ?
                  day.homeworkUploads.map(homework => {
                    return (
                      <>
                        <p>Homework Image:</p>
                        <p key={homework.homeworkLink}>{homework.homeworkLink}</p>
                      </>
                    )
                  })
                  : <p>Please submit your homework!</p>
                }
                <HomeworkSubmission />
                {/* {day.classworkNotes ?
                  day.classworkNotes.map(note => {
                    return (
                      <>
                        <p>Notes:</p>
                        <p key={note}>{note.notesDescription}</p>
                      </>
                    )
                  })
                  : <p>Please submit your notes!</p>
                } */}
                <NotesSubmission notes={day.classworkNotes} demoAccount={demoAccount}/>
                {day.progress &&
                  day.progress.map((p, index) => {
                    const { completed, confidenceRating, bookmarked } = p
                    return (
                      <div key={index}>
                        <h4>Progress:</h4>
                        <div>
                          Completed: {completed ? '🟢' : '🔴'}
                        </div>
                        <div>
                          Confidence Rating: {confidenceRating}
                        </div>
                        <div>
                          Bookmarked: {bookmarked ? '🟢' : '🔴'}
                        </div>
                      </div>
                    )
                  })}
              </Col>
            </>
            :
            <>
              <Error error={error} />
            </>
          }
        </Row>
      </Container>
    </main>
  )
}

export default SingleDay