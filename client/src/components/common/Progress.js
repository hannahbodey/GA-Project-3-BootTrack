import { useEffect, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import Form from 'react-bootstrap/Form'


const Progress = ({ progress, demoAccount }) => {

  console.log(progress)

  const [progressValues, setProgressValues] = useState(progress)

  const handleProgressChange = (field, value) => {
    const updatedProgressValues = [...progressValues]
    updatedProgressValues[field] = value
    setProgressValues(updatedProgressValues)
  }


  //   return (
  //     <section>
  //       {progress &&
  //         progress.map((p, index) => {
  //           const { completed, confidenceRating, bookmarked } = p
  //           return (
  //             <div key={index}>
  //               <h4>Progress:</h4>
  //               <div className='progress-value'>
  //                 Completed:
  //                 <Form className='completed-switch'>
  //                   <Form.Check
  //                     // label="Completed"
  //                     type="switch"
  //                     id={`completed-switch-${index}`}
  //                     checked={completed}
  //                     onChange={(e) => handleProgressChange(index, 'completed', e.target.checked)}
  //                   />
  //                 </Form>
  //               </div>
  //               <div className='progress-value'>
  //                 Confidence Rating: {confidenceRating}
  //               </div>
  //               <div className='progress-value'>
  //                 Bookmarked:
  //                 <Form className='completed-switch'>
  //                   <Form.Check
  //                     // label="Completed"
  //                     type="switch"
  //                     id={`completed-switch-${index}`}
  //                     checked={bookmarked}
  //                     onChange={(e) => handleProgressChange(index, 'bookmarked', e.target.checked)}
  //                   />
  //                 </Form>
  //               </div>
  //             </div>
  //           )
  //         })}
  //     </section>
  //   )
  // }

  const { completed, confidenceRating, bookmarked } = progress

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
                checked={completed}
                onChange={(e) => handleProgressChange('completed', e.target.checked)}
              />
            </Form>
          </div>
          <div className='progress-value'>
            Confidence Rating: {confidenceRating}
          </div>
          <div className='progress-value'>
            Bookmarked:
            <Form>
              <Form.Check
                // label="Completed"
                className='--bs-red'
                type='switch'
                id='bookmarked-switch'
                checked={bookmarked}
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



