import { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

import Container from 'react-bootstrap/esm/Container'
import Row from 'react-bootstrap/esm/Row'
import Col from 'react-bootstrap/esm/Col'
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

  const loginDemo = async () => {
    try {
      const { data } = await axios.post('/api/demo-login')
      localStorage.setItem('PROJECT-3-TOKEN', data.token)
      navigate('/days')
    } catch (error) {
      console.log(error)
      setError(error.response.data.message)
    }
  }

  // ! TO BE DELETED!
  const loginJane = async () => {
    try {
      const { data } = await axios.post('/api/login', { email: 'jane@example.com', password: 'pass' })
      localStorage.setItem('PROJECT-3-TOKEN', data.token)
      navigate('/days')
    } catch (error) {
      console.log(error)
      setError(error.response.data.message)
    }
  }

  return (
    <main className='form-page main-container'>
      <form className='form-submission' onSubmit={handleSubmit}>
        <h1>Login In Now!</h1>
        {/* Email */}
        <label htmlFor='email'>Email</label>
        <input type='email' name='email' placeholder='Email' onChange={handleChange} value={formFields.email} />
        {/* Password */}
        <label htmlFor='password'>Password</label>
        <input type='password' name='password' placeholder='Password' onChange={handleChange} value={formFields.password} />
        <button className='red-button'>Login</button>
        {error && <p className='text-danger text-center'>{error}</p>}
        {/*  ! Demo Button would need to sit outside the form, to prevent it being caught within the form submit */}
        <button className='red-button' onClick={loginDemo}>Try Demo Account!</button>
        <button className='red-button' onClick={loginJane}>Log in as Jane</button>
      </form>
    </main>
  )
}

export default Login