import Card from 'react-bootstrap/Card'
import { v4 as uuid } from 'uuid'

const TeacherReportView = ({ weeklyData }) => {
  return (
    <div className='days-container'>
      {weeklyData.length ?
        weeklyData.map((day) => {
          const weekIndex = uuid()
          const index = uuid()
          return (
            <div key={index} className='progress-card'>
              <Card>
                <Card.Body >
                  {day.week && <Card.Text className='owner' key={weekIndex}>{day.week}</Card.Text>}
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