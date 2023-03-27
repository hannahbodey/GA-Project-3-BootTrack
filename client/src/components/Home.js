import Container from 'react-bootstrap/Container'
import { Stack } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Button from 'react-bootstrap/Button'





const Home = () => {
  return (

    <main className="home">
      <Container>
        <div className="hero">
          <h1 className='display-4'>🏠Home page</h1>
        </div>
        <Container className= "hero">
          <div className= "vstack gap-2">
            <div className="bg-light border">Call to action - Sign Up to Join</div>
            <Button to="#" as={Link} className='btn-register'>Register</Button>
          </div>
        </Container>
      </Container>
    </main>

 
  )
}

export default Home