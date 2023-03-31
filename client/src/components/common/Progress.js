import { useState } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { userTokenFunction } from '../../helpers/auth'
import Form from 'react-bootstrap/Form'


const Progress = ({ progress, demoAccount }) => {
  const { dayId } = useParams()
  const [progressValues, setProgressValues] = useState(progress)
  const [error, setError] = useState('')

  const handleProgressChange = async (field, value) => {
    const updatedProgressValues = [...progressValues]
    updatedProgressValues[0][field] = value
    setProgressValues(updatedProgressValues)
    try {
      const userToken = userTokenFunction()
      const { data } = await axios.put(`/api/days/${dayId}/progress`, progress, userToken)
    } catch (error) {
      console.log(error)
      setError(error)
    }
  }

  return (
    <section>
      {progress &&
        <>
          <h4>Progress:</h4>
          <div className='progress-value'>
            Completed:
            <Form>
              <Form.Check
                className='progress-switch'
                type='switch'
                id='completed-switch'
                checked={progress[0] && progress[0].completed}
                onChange={(e) => handleProgressChange('completed', e.target.checked)}
                disabled={demoAccount}
              />
            </Form>
          </div>
          <div className='progress-value'>
            Confidence:
            <Form>
              <Form.Select
                className={'progress-confidence'}
                value={progress[0] && progress[0].confidenceRating}
                onChange={(e) => handleProgressChange('confidenceRating', e.target.value)}
                disabled={demoAccount}
              >
                <option value="0">Select a rating</option>
                <option value="1">1 - Very Low</option>
                <option value="2">2 - Low</option>
                <option value="3">3 - Medium</option>
                <option value="4">4 - High</option>
                <option value="5">5 - Very High</option>
              </Form.Select>
            </Form>
          </div>
          <div className='progress-value'>
            Bookmarked:
            <Form>
              <Form.Check
                className='progress-bookmarked'
                type='switch'
                id='bookmarked-switch'
                checked={progress[0] && progress[0].bookmarked}
                onChange={(e) => handleProgressChange('bookmarked', e.target.checked)}
                disabled={demoAccount}
              />
            </Form>
          </div>
        </>
      }
    </section >
  )
}

export default Progress



