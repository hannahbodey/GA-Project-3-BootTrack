import { useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { userTokenFunction } from '../../helpers/auth'

const HomeworkUpload = ({ day, demoAccount }) => {

  const { dayId } = useParams()

  const [homeworkForm, setHomeworkForm] = useState({
    homeworkLink: '',
  })
  const [error, setError] = useState('')

  const handleUpload = async (e) => {
    const image = e.target.files[0]
    console.log(image)
    const dataPic = new FormData()
    dataPic.append('file', image)
    console.log('file', dataPic)
    dataPic.append('upload_preset', process.env.REACT_APP_UPLOAD_PRESET)
    console.log(dataPic)
    try {
      const { data } = await axios.post(`https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUDNAME}/image/upload`, dataPic)
      console.log('secure URL for cloud', data.secure_url)
      setHomeworkForm({ ...homeworkForm, homeworkLink: data.secure_url })
    } catch (error) {
      console.log(error)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const userToken = userTokenFunction()
      const { data } = await axios.put(`/api/days/${dayId}/homework`, homeworkForm, userToken)
    } catch (error) {
      console.log(error)
      setError(error.response.data.message)
    }
  }
  return (
    <form className='image-field' onSubmit={handleSubmit}>
      <h4>Homework Uploads:</h4>
      {/* { homeworkForm.homeworkLink ? <img src={homeworkForm.homeworkLink} /> : <input type="file" onChange={handleUpload}/> } */}
      {homeworkForm.homeworkLink ? <img src={homeworkForm.homeworkLink} /> : (day.homeworkUploads[0] ? <img src={day.homeworkUploads[0].homeworkLink} /> : <input className='image-input' type="file" onChange={handleUpload} disabled={demoAccount} />)}
      {homeworkForm.homeworkLink && <button className='red-button'>Submit Homework</button>}
    </form>
  )
}

export default HomeworkUpload