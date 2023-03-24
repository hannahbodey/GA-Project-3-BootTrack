import axios from 'axios'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import { userTokenFunction } from '../../helpers/auth'

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

const SingleDay = () => {

  const [ day, setDay ] = useState(null)
  const [ error, setError ] = useState('')
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
        setError(error)
      }
    }
    getDay()
  }, [dayId])

  return (
    <main>
      <Container>
        <Row>
          {day && 
            <>
              <Col xs='12'>
                <h1>Week {day.week} Day {day.day}</h1>
                <h2>{day.topicTitle}</h2>
              </Col>
              <Col md='6'>
                <h4>Your image will go here</h4>
                <h4>Class Notes</h4>
                { day.classworkDescription.length > 1 ? 
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
                { day.homeworkDescription.length > 1 ? 
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
              </Col>
            </>
          }
        </Row>
      </Container>
    </main>
  )
}

export default SingleDay