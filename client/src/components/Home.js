import Container from 'react-bootstrap/Container'
import { Link } from 'react-router-dom'
import Button from 'react-bootstrap/Button'

import test from '../images/test.png'




const Home = () => {
  return (

    <main className="home">
      <Container>
        <div className="title">
          <h4>Your Dashboard Overview</h4>
        </div>
        <div className="hero">Call to action! <span>Sign Up to Join</span>
          <button onClick= '/register' className='btn-register'>Register</button>
          <h5>If you are already registered</h5>
          <button onClick='/login' className='btn-login'>Login</button>
        </div>
        <div className="overView">
          <img src={test} alt="All days overview" />
        </div>
      </Container>

    </main >

 
  )
}

export default Home