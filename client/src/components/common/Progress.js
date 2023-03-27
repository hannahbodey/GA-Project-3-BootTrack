import { useEffect, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import Form from 'react-bootstrap/Form'


const Progress = ({ progress, demoAccount }) => {

  console.log(progress)

  const [progressValues, setProgressValues] = useState(progress)

  const handleProgressChange = (field, value) => {
    const updatedProgressValues = [...progressValues]
    updatedProgressValues[0][field] = value
    setProgressValues(updatedProgressValues)
  }

  const { completed, confidenceRating, bookmarked } = progress

  console.log(progress[0])
  console.log(progress[0].completed)
  console.log(progress[0].confidenceRating)

  return (
    <section>
      {progress &&
        <>
          <h4>Progress:</h4>
          <div className='progress-value'>
            Completed:
            <Form>
              <Form.Check
                // label="Completed"
                className='progress-switch'
                type='switch'
                id='completed-switch'
                checked={progress[0].completed}
                onChange={(e) => handleProgressChange('completed', e.target.checked)}
              />
            </Form>
          </div>
          <div className='progress-value'>
            Confidence Rating: {progress[0].confidenceRating}
          </div>
          <div className='progress-value'>
            Bookmarked:
            <Form>
              <Form.Check
                // label="Completed"
                className='--bs-red'
                type='switch'
                id='bookmarked-switch'
                checked={progress[0].bookmarked}
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



