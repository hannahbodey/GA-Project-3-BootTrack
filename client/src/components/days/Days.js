import axios from 'axios'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import Error from '../common/Error'

import { userTokenFunction } from '../../helpers/auth'

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'

const Days = () => {

  const [ days, setDays ] = useState([])
  const [ error, setError ] = useState('')

  useEffect(() => {
    const getDays = async () => {
      try {
        const userToken = userTokenFunction()
        const { data } = await axios.get('/api/days', userToken)
        setDays(data)
      } catch (error) {
        console.log(error)
        setError(error.response.data.message)
      }
    }
    getDays()
  }, [])

  return (
    <main>
      <Container>
        <Row>
          <Col xs='12'>
            <h1>Welcome to Days</h1>
          </Col>
          {days.length > 0 ?
            days.map(item => {
              const { _id, day, week, topicTitle } = item
              return (
                <Col key={_id} lg='5' sm='1' className='day'>
                  <Link to={`/days/${_id}`}>
                    <Card>
                      <Card.Body>
                        <Card.Text>Week: {week} - Day: {day} - Topic: {topicTitle}</Card.Text>
                      </Card.Body>
                    </Card>
                  </Link>
                </Col>
              )
            })
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

export default Days