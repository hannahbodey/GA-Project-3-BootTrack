import Card from 'react-bootstrap/Card'
import { v4 as uuid } from 'uuid'

const TeacherReportView = ({ weeklyData }) => {
  return (
    <div className='days-container'>
      {weeklyData.length ?
        weeklyData.map((day) => {
          const index = uuid()
          return (
            <div key={index} className='progress-card'>
              <Card>
                <Card.Body >
                  {day.week && <Card.Text className='owner'>Week {day.week}</Card.Text>}
                  {day.responses.length > 0 &&
                    <>
                      <Card.Text className='progress-class'>Student comfort rating: {day.responses[0].overallComfort}</Card.Text>
                      <Card.Text className='progress-class'>Student support rating: {day.responses[0].supportRating}</Card.Text>
                      <Card.Text className='progress-class'>Student meeting request: {day.responses[0].contactPerson.length > 0 ? 'Yes' : 'No'}</Card.Text>
                    </>
                  }
                  {!day.responses.length > 0  && <p>Student has not yet completed this report</p>}
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