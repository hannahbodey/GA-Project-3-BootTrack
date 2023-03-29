import axios from 'axios'
import { useEffect, useState } from 'react'
import { useParams, useLocation } from 'react-router-dom'

import Error from '../common/Error'

import { userTokenFunction } from '../../helpers/auth'

import HomeworkUpload from '../common/HomeworkUpload'
import Progress from '../common/Progress'
import BackButton from '../common/BackButton'

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import NotesSubmission from '../common/NotesSubmission'


const SingleDay = () => {

  const [day, setDay] = useState(null)
  const [error, setError] = useState('')
  const [demoAccount, setDemoAccount] = useState(false)

  const location = useLocation()

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

  return (
    <main className='main-container'>
      <Container>
        <BackButton />
        <Row>
          {day ?
            <>
              <Col xs='12'>
                <h1 className={(location.pathname === '/days' || location.pathname === '/profile') ? 'main-header' : 'single-day-header'}>Week {day.week} Day {day.day}</h1>
                <h2>{day.topicTitle}</h2>
              </Col>
              <Col lg='6' md='6' sm='12'>
                <HomeworkUpload day={day} demoAccount={demoAccount}/>
                <Progress progress={day.progress} demoAccount={demoAccount}/>
              </Col>
              <Col lg='6' md= '6' sm='12'>
                <h4>Class Notes:</h4>
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
                <h4>Homework Instructions:</h4>
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
                {/* <HomeworkSubmission /> */}
                <NotesSubmission notes={day.classworkNotes} demoAccount={demoAccount}/>
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