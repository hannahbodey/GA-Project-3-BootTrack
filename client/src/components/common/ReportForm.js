import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { userTokenFunction } from '../../helpers/auth'
import { useNavigate } from 'react-router-dom'
import BackButton from './BackButton'

const ReportForm = () => {

  const [demoAccount, setDemoAccount] = useState(false)

  useEffect(() => {
    const checkDemo = async () => {
      try {
        const userToken = userTokenFunction()
        const { data } = await axios.get('/api/user', userToken)
        setDemoAccount(data.isDemo)
      } catch (error) {
        console.log(error)
      }
    }
    checkDemo()
  }, [])

  const navigate = useNavigate()


  const { week } = useParams()

  const [formData, setFormData] = useState({
    highlights: '',
    challenges: '',
    goals: '',
    overallComfort: 1,
    questions: '',
    supportRating: 1,
    supportAdvice: '',
    contactPerson: [],
    contactRequest: '',
    completed: false,
  })

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormData({ ...formData, [name]: value })
  }

  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target
    if (checked) {
      setFormData({ ...formData, contactPerson: [...formData.contactPerson, name] })
    } else {
      setFormData({ ...formData, contactPerson: formData.contactPerson.filter((person) => person !== name) })
    }
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      const userToken = userTokenFunction()
      await axios.put(`/api/reports/${week}`, formData, userToken)
      navigate('/profile')
    } catch (error) {
      console.log(error)
      alert('An error occurred while submitting the report')
    }
  }

  return (
    <>
      {/* <BackButton /> */}
      <div className="report-form-container">
        <h1>Weekly Report for Week {week}</h1>
        <form onSubmit={handleSubmit} className="report-form">

          <label htmlFor="highlights" className="form-label">What went well this week?<span className='asterisk'>*</span></label>
          <textarea
            id="highlights"
            name="highlights"
            value={formData.highlights}
            onChange={handleChange}
            className="form-input"
            required
          />

          <label htmlFor="challenges" className="form-label">What didn&apos;t go so well this week?<span className='asterisk'>*</span></label>
          <textarea
            id="challenges"
            name="challenges"
            value={formData.challenges}
            onChange={handleChange}
            className="form-input"
            required
          />

          <label htmlFor="goals" className="form-label">What&apos;s your goal for next week?<span className='asterisk'>*</span></label>
          <textarea
            id="goals"
            name="goals"
            value={formData.goals}
            onChange={handleChange}
            className="form-input"
            required
          />

          <label htmlFor="overallComfort" className="form-label">How comfortable do you feel with this week&apos;s material? (1 being the lowest - 5 being the highest)<span className='asterisk'>*</span></label>
          <input
            type="number"
            id="overallComfort"
            name="overallComfort"
            value={formData.overallComfort}
            onChange={handleChange}
            min="1"
            max="5"
            className="form-input"
            required
          />

          <label htmlFor="questions" className="form-label">What questions do you still have after this week&apos;s lessons?<span className='asterisk'>*</span></label>
          <textarea
            id="questions"
            name="questions"
            value={formData.questions}
            onChange={handleChange}
            className="form-input"
            required
          />

          <label htmlFor="supportRating" className="form-label">Do you feel supported by all members of the instructional team? (1 being &apos;Very Low&apos; -  5 being &apos;Very High&apos;)<span className='asterisk'>*</span></label>
          <input
            type="number"
            id="supportRating"
            name="supportRating"
            value={formData.supportRating}
            onChange={handleChange}
            min="1"
            max="5"
            className="form-input"
            required
          />

          <label htmlFor="supportAdvice" className="form-label">How can the instructional team better support you?<span className='asterisk'>*</span></label>
          <textarea
            id="supportAdvice"
            name="supportAdvice"
            value={formData.supportAdvice}
            onChange={handleChange}
            className="form-input"
            required
          />

          <label className="form-label">OPTIONAL: Would you like to speak about anything with a member of the team? If yes, please select the person and please leave your name on your survey.</label>
          <div >
            {['Lead Instructor', 'Instructional Associate', 'Student Success', 'Career Coach'].map((person) => (
              <div key={person} className="contact-persons">
                <input type='checkbox' id={person} name={person} onChange={handleCheckboxChange} />
                <label htmlFor={person}>{person}</label>
              </div>
            ))}
          </div>

          <label htmlFor="contactRequest" className="form-label">What would you like to chat about?</label>
          <textarea
            id="contactRequest"
            name="contactRequest"
            value={formData.contactRequest}
            onChange={handleChange}
            className="form-input"
          />

          <div className="button-container">
            <button type="submit" className="green-button" disabled={demoAccount}>Submit Report</button>
          </div>

        </form>
      </div>
    </>
  )
}

export default ReportForm