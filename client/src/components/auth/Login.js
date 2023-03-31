import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { teacherCheck } from '../../helpers/auth'

const Login = () => {
  //*Location Variable
  const navigate = useNavigate()

  //*State
  const [formFields, setFormFields] = useState({
    email: '',
    password: '',
  })
  const [error, setError] = useState('')

  //*Executions
  const handleChange = (e) => {
    setFormFields({ ...formFields, [e.target.name]: e.target.value })
    setError('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const { data } = await axios.post('/api/login', formFields)
      localStorage.setItem('PROJECT-3-TOKEN', data.token)
      {teacherCheck() ? navigate('/teacher') : navigate('/days')}
    } catch (error) {
      console.log(error)
      setError(error.response.data.message)
    }
  }

  return (
    <main className='register-form-container'>
      <form className='register-form' onSubmit={handleSubmit}>
        <h1>Log In Now!</h1>
        {/* Email */}
        <input type='email' name='email' placeholder='Email' onChange={handleChange} value={formFields.email} />
        {/* Password */}
        <input type='password' name='password' placeholder='Password' onChange={handleChange} value={formFields.password} />
        <button className='red-button'>Log In</button>
        {error && <p className='text-danger text-center'>{error}</p>}
      </form>
    </main>
  )
}

export default Login