
import Container from 'react-bootstrap/Container'
import test from '../images/test.png'
import { Link } from 'react-router-dom'


const Home = () => {

  return (

    <main className="home">
      <Container>
        <div className="title">
          <h4>Your Dashboard Overview</h4>
        </div>
        <div className="hero">Call to action! <span>Sign Up to Join</span>
          <>
          
            <Link to='/register' className={location.pathname === '/register' ? 'active btn-register' : 'btn-register'}>Register</Link>
            <h5>If you are already registered</h5>
            <Link to='/login' className={location.pathname === '/login' ? 'active btn-login' : 'btn-login'}>Login</Link>
        
          </>
        </div>
        <div className="overView">
          <img src={test} alt="All days overview" />
        </div>
      </Container >

    </main >


  )
}

export default Home