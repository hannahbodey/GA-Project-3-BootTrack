import Card from 'react-bootstrap/Card'
import { v4 as uuid } from 'uuid'

const TeacherReportView = ({ weeklyData }) => {
  return (
    <div className='days-container'>
      {weeklyData.length ?
        weeklyData.map((day) => {
          console.log(day)
          const weekIndex = uuid()
          const index = uuid()
          return (
            <div key={index} className='progress-card'>
              <Card>
                <Card.Body >
                  {day.week && <Card.Text className='owner'>{day.week}</Card.Text>}
                  {day.responses.length > 0 &&
                    <>
                      <Card.Text className='progress-class'>Student comfort levels: {day.responses[0].overallComfort}</Card.Text>
                      <Card.Text className='progress-class'>Student support levels: {day.responses[0].supportRating}</Card.Text>
                      <Card.Text className='progress-class'>Student marked completed: {day.responses[0].completed}</Card.Text>
                    </>
                  }
                  {!day.responses.length > 0  && <p>Student has not yet completed this day.</p>}
                </Card.Body>
              </Card>
            </div>
          )
        })
        :
        <p>No student data.</p>
      }
    </div>
  )
}

export default TeacherReportView