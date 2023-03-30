import Card from 'react-bootstrap/Card'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { icon } from '@fortawesome/fontawesome-svg-core/import.macro'

const TeacherProgressView = ({ filteredWork }) => {
  return (
    <div className='days-container'>
      {filteredWork.length > 0 && filteredWork.map((day) => {
        return (
          <div key={day._id} className='day'>
            <Card>
              <Card.Body >
                {day.progress && <Card.Text className='owner'>Week: {day.week} Day: {day.day}</Card.Text>}
                {day.progress && day.progress.length > 0 && day.progress[0].completed === false ? <Card.Text>Work completed? <FontAwesomeIcon icon={icon({ name: 'circle-xmark' })} className='red-circle' /></Card.Text> : <Card.Text>Work completed? <FontAwesomeIcon icon={icon({ name: 'circle-check' })} className='green-circle' /></Card.Text>}
                {day.progress && <Card.Text className='progress-class'>Confidence rating: {day.progress[0].confidenceRating}</Card.Text>}
                {day.progress && day.progress.length > 0 && day.progress[0].bookmarked === false ? <Card.Text>Needs help? <FontAwesomeIcon icon={icon({ name: 'circle-xmark' })} className='red-circle' /></Card.Text> : <Card.Text>Needs help? <FontAwesomeIcon icon={icon({ name: 'circle-check' })} className='green-circle' /></Card.Text>}
              </Card.Body>
            </Card>
          </div>
        )
      })}
      {!filteredWork.length > 0 && <p>Student has not yet completed work.</p>}
    </div>
  )
}

export default TeacherProgressView