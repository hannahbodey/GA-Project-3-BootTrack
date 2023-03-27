import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

const Register = () => {
  //* Location Variable
  const navigate = useNavigate()

  //*State
  const [ formFields, setFormFields ] = useState({
    username: '',
    email: '',
    password: '',
    passwordConfirmation: '',
  })
  const [ error, setError ] = useState('')

  //*Executions
  const handleChange = (e) => {
    setFormFields({ ...formFields, [e.target.name]: e.target.value })
    setError('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await axios.post('/api/register', formFields)
      navigate('/login')
    } catch (error) {
      console.log(error)
      setError(error.response.data.message)
    }
  }

  return (
    <main className='form-page main-container'>
      {/* <Col as='form' onSubmit={handleSubmit}> */}
      <form className='form-submission' onSubmit={handleSubmit}>
        <h1>Register below!</h1>
        {/* Username */}
        <label htmlFor='username'>Username</label>
        <input type='text' name='username' placeholder='Username' onChange={handleChange} value={formFields.username}/>
        {/* Email */}
        <label htmlFor='email'>Email</label>
        <input type='email' name='email' placeholder='Email' onChange={handleChange} value={formFields.email}/>
        {/* Password */}
        <label htmlFor='password'>Password</label>
        <input type='password' name='password' placeholder='Password' onChange={handleChange} value={formFields.password}/>
        {/* Password Confirmation */}
        <label htmlFor='passwordConfirmation'>Password Confirmation</label>
        <input type='password' name='passwordConfirmation' placeholder='Password Confirmation' onChange={handleChange} value={formFields.passwordConfirmation}/>
        <button className='red-button'>Register</button>
        {error && <p className='text-danger text-center'>{error}</p>}
      </form>
      {/* </Col> */}
    </main>
  )
}

export default Register