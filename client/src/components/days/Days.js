import axios from 'axios'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { icon } from '@fortawesome/fontawesome-svg-core/import.macro'
import Error from '../common/Error'
import { userTokenFunction } from '../../helpers/auth'
import Card from 'react-bootstrap/Card'

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
      <h1 className={location.pathname !== '/days/:dayID' ? 'main-header' : ''}>Course Overview</h1>
      <div className='days-container'>
        {days.length > 0 ?
          days.map(item => {
            const { _id, day, week, topicTitle, progress } = item
            return (
              <div key={_id} className='day'>
                <Link to={`/days/${_id}`}>
                  <Card>
                    {progress[0].bookmarked ? (
                      <FontAwesomeIcon icon={icon({ name: 'bookmark' })} className='bookmark-icon' />
                    ) : null}
                    <Card.Body >
                      <Card.Text className='day-week'>WEEK {week} - DAY {day}</Card.Text>
                      <Card.Text className='topic'>{topicTitle}</Card.Text>
                      {progress && progress.length > 0 && progress[0].completed === false ? <Card.Text><FontAwesomeIcon icon={icon({ name: 'circle-xmark' })} className='red-circle' /></Card.Text> : <Card.Text><FontAwesomeIcon icon={icon({ name: 'circle-check' })} className='green-circle' /></Card.Text>}
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
    </main>
  )
}

export default Days