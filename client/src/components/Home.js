import axios from 'axios'
import { useState, useEffect } from 'react'
import Container from 'react-bootstrap/Container'
import test from '../images/test.png'
import { useNavigate } from 'react-router-dom'

const Home = () => {
  const navigate = useNavigate()

  //const [error, setError] = useState('')

  const onClickLogin = async (e) => {
    try {
      const { data } = await axios.post('/api/login')
      localStorage.setItem('PROJECT-3-TOKEN', data.token)
      navigate('/login')
    } catch (error) {
      console.log(error)
      //setError(error.response.data.message)
    }
  }
  const onClickRegister = async (e) => {
    try {
      const { data } = await axios.post('/api/register')
      localStorage.setItem('PROJECT-3-TOKEN', data.token)
      navigate('/register')
    } catch (error) {
      console.log(error)
      //setError(error.response.data.message)
    }
  }

  return (

    <main className="home">
      <Container>
        <div className="title">
          <h4>Your Dashboard Overview</h4>
        </div>
        <div className="hero">Call to action! <span>Sign Up to Join</span>
          <button onClick={onClickLogin} className='btn-register'>Register</button>
          <h5>If you are already registered</h5>
          <button onClick={onClickRegister} className='btn-login'>Login</button>
        </div>
        <div className="overView">
          <img src={test} alt="All days overview" />
        </div>
      </Container>

    </main >


  )
}

export default Home