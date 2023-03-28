import { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { userTokenFunction } from '../../helpers/auth'


import 'bootstrap/dist/css/bootstrap.min.css'
import Form from 'react-bootstrap/Form'


const Progress = ({ progress, demoAccount }) => {

  console.log(progress)

  const { dayId } = useParams()

  const [progressValues, setProgressValues] = useState(progress)

  const handleProgressChange = async (field, value) => {
    const updatedProgressValues = [...progressValues]
    updatedProgressValues[0][field] = value
    setProgressValues(updatedProgressValues)
    try {
      console.log('progress ->', progress)
      const userToken = userTokenFunction()
      const { data } = await axios.put(`/api/days/${dayId}/progress`, progress, userToken)
    } catch (error) {
      console.log(error)
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
              />
            </Form>
          </div>
          <div className='progress-value'>
            Confidence Rating: {progress[0] && progress[0].confidenceRating}
          </div>
          <div className='progress-value'>
            Bookmarked:
            <Form>
              <Form.Check
                className='--bs-red'
                type='switch'
                id='bookmarked-switch'
                checked={progress[0] && progress[0].bookmarked}
                onChange={(e) => handleProgressChange('bookmarked', e.target.checked)}
              />
            </Form>
          </div>
        </>
      }
    </section >
  )
}

export default Progress



