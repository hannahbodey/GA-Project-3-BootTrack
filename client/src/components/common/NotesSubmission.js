import { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'

import { userTokenFunction } from '../../helpers/auth'

const NotesSubmission = ({ notes, demoAccount }) => {

  const [submission, setSubmission] = useState({
    notesDescription: '',
  })
  const [error, setError] = useState('')
  const [editMode, setEditMode] = useState(false)

  useEffect(() => {
    console.log(notes[0])
    if (notes && notes.length > 0) {
      setSubmission(notes[0])
    }
  }, [notes])

  console.log(demoAccount)
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
      setEditMode(false)
    } catch (error) {
      console.log(error)
      setError(error.response.data.message)
    }
  }

  const handleEditClick = () => {
    setEditMode(!editMode)
  }

  return (
    <section>
      <h4>Notes:</h4>
      {editMode ? (
        <form onSubmit={handleSubmit} className='notesSection'>
          <textarea cols="50" rows="15" style={{ resize: 'none', display: 'block' }} name='notesDescription' id='notesDescription' placeholder='Type your notes here!' onChange={handleChange} value={submission.notesDescription}></textarea>
          <button className='button' disabled={demoAccount}>Save</button>
        </form>
      )
        :
        (
          <>
            <div>
              <textarea className='viewText' cols="50" rows="15" readOnly name='notesDescription' id='notesDescription' placeholder="Click 'Edit' to add a note!" onChange={handleChange} value={submission.notesDescription}></textarea>
              <button className='button' onClick={handleEditClick} disabled={demoAccount}>Edit</button>
            </div>
          </>
        )
      }
    </section >
  )
}

export default NotesSubmission