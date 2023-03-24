import { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'

import { userTokenFunction } from '../../helpers/auth'

const NotesSubmission = () => {

  const [ submission, setSubmission ] = useState({
    notesTitle: '',
    notesDescription: '',
  })
  const [ error, setError ] = useState('')

  const { dayId } = useParams()

  const handleChange = (e) => {
    const newNotes = { ...submission, [e.target.name]: e.target.value }
    setSubmission(newNotes)
    setError('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const userToken = userTokenFunction()
      const { data } = await axios.put(`/api/days/${dayId}/notes`, submission, userToken)
    } catch (error) {
      console.log(error)
      setError(error.response.data.message)
    }
  }

  return (
    <section>
      <form onSubmit={handleSubmit}>
        <input type='text' name='notesTitle' id='notesTitle' placeholder='Name your notes' onChange={handleChange} value={submission.notesTitle}/>
        <input type='text' name='notesDescription' id='notesDescription' placeholder='Drop your notes here!' onChange={handleChange} value={submission.notesDescription}/>
        <button className='button'>Submit your notes!</button>
      </form>
    </section>
  )

}

export default NotesSubmission