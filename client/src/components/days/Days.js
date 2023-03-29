import axios from 'axios'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useLocation } from 'react-router-dom'

import Error from '../common/Error'

import { userTokenFunction } from '../../helpers/auth'

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import { trusted } from 'mongoose'

const Days = () => {

  const [days, setDays] = useState([])
  const [error, setError] = useState('')

  const location = useLocation()

  useEffect(() => {
    const getDays = async () => {
      try {
        const userToken = userTokenFunction()
        const { data } = await axios.get('/api/days', userToken)
        const sortedDays = data.sort((a, b) => {
          if (a.week !== b.week) {
            return a.week - b.week
          }
          return a.day - b.day
        })
        setDays(sortedDays)
      } catch (error) {
        console.log(error)
        setError(error.response.data.message)
      }
    }
    getDays()
  }, [])

  return (
    <main className='main-container'>
      {/* <Container>
        <Row columns='3'>
          <Col xs='12'> */}
      <h1 className={location.pathname !== '/days/:dayID' ? 'main-header' : ''}>Welcome to Days</h1>
      {/* </Col> */}
      <div className='days-container'>
        {days.length > 0 ?
          days.map(item => {
            const { _id, day, week, topicTitle, progress } = item
            return (
              <div key={_id} className='day'>
                <Link to={`/days/${_id}`}>
                  <Card>
                    <Card.Body>
                      <Card.Text>Week: {week} - Day: {day}</Card.Text>
                      <Card.Text>Topic: {topicTitle}</Card.Text>
                      {progress && progress.length > 0 && progress[0].completed === false ? <Card.Text>🔴</Card.Text> : <Card.Text>🟢</Card.Text>}
                    </Card.Body>
                  </Card>
                </Link>
              </div>
            )
          })
          :
          <>
            <Error error={error} />
          </>
        }
      </div>
      {/* </Row>
      </Container> */}
    </main>
  )
}

export default Days