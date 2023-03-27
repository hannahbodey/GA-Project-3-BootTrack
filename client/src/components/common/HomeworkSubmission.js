import { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'

import { userTokenFunction } from '../../helpers/auth'

const HomeworkSubmission = () => {

  const [ submission, setSubmission ] = useState({
    homeworkLink: '',
  })
  
  const [ error, setError ] = useState('')

  const { dayId } = useParams()

  const handleChange = (e) => {
    const newHomework = { ...submission, [e.target.name]: e.target.value }
    setSubmission(newHomework)
    setError('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const userToken = userTokenFunction()
      const { data } = await axios.put(`/api/days/${dayId}/homework`, submission, userToken)
    } catch (error) {
      console.log(error)
      setError(error.response.data.message)
    }
  }

  return (
    <section>
      <form onSubmit={handleSubmit}>
        {/* <input type='text' name='homeworkTitle' id='homeworkTitle' placeholder='Name your homework' onChange={handleChange} value={submission.homeworkTitle}/> */}
        <input type='text' name='homeworkLink' id='homeworkLink' placeholder='Drop your homework here!' onChange={handleChange} value={submission.homeworkLink}/>
        <button className='button'>Submit your homework!</button>
      </form>
    </section>
  )

}

export default HomeworkSubmission