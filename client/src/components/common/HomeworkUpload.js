import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { userTokenFunction } from '../../helpers/auth'

const HomeworkUpload = ({ day, demoAccount }) => {

  const { dayId } = useParams()
  const [homeworkForm, setHomeworkForm] = useState({
    homeworkLink: '',
  })
  const [error, setError] = useState('')
  const [showRemoveButton, setShowRemoveButton] = useState(!!day.homeworkUploads[0])
  const [isDeleted, setIsDeleted] = useState(false)

  useEffect(() => {
    setIsDeleted(false)
  }, [day])

  const handleUpload = async (e) => {
    const image = e.target.files[0]
    const dataPic = new FormData()
    dataPic.append('file', image)
    dataPic.append('upload_preset', process.env.REACT_APP_UPLOAD_PRESET)
    try {
      const { data } = await axios.post(`https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUDNAME}/image/upload`, dataPic)
      setHomeworkForm({ ...homeworkForm, homeworkLink: data.secure_url })
    } catch (error) {
      console.log(error)
      setError(error)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const userToken = userTokenFunction()
      const { data } = await axios.put(`/api/days/${dayId}/homework`, homeworkForm, userToken)
      setShowRemoveButton(true)
    } catch (error) {
      console.log(error)
      setError(error.response.data.message)
    }
  }

  const handleClear = async () => {
    setHomeworkForm({ homeworkLink: '' })
  }

  const handleDelete = async () => {
    try {
      const userToken = userTokenFunction()
      await axios.delete(`/api/days/${dayId}/homework`, userToken)
      setHomeworkForm({ homeworkLink: '' })
      setShowRemoveButton(false)
      setIsDeleted(true)
    } catch (error) {
      console.log(error)
      setError(error.response.data.message)
    }
  }

  return (
    <section>
      <form className='image-field' onSubmit={handleSubmit}>
        <h4>Homework Uploads:</h4>
        {homeworkForm.homeworkLink ? <img src={homeworkForm.homeworkLink} className={'homework-image'} /> : !isDeleted && day.homeworkUploads[0] ? <img src={day.homeworkUploads[0].homeworkLink} className={'homework-image'} /> : <input className='image-input' type="file" onChange={handleUpload} disabled={demoAccount} />}
        {homeworkForm.homeworkLink && !showRemoveButton && (
          <>
            <button className='green-button save-button'>Upload Image</button>
            <button className='orange-button edit-button' onClick={handleClear} type="button">Discard Image</button>
          </>
        )}
        {showRemoveButton && <button className='red-button-homework delete-button' onClick={handleDelete} type="button" disabled={demoAccount}>Remove Image</button>}
      </form>
    </section>
  )
}

export default HomeworkUpload