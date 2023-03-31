import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { authenticatedUser, removeToken, teacherCheck, userTokenFunction } from '../../helpers/auth'
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { icon } from '@fortawesome/fontawesome-svg-core/import.macro'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'

const PageNavBar = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const [demoAccount, setDemoAccount] = useState(false)
  const [error, setError] = useState('')

  const handleLogOut = () => {
    removeToken()
    navigate('/')
  }

  const handleRegister = () => {
    removeToken()
    navigate('/register')
  }

  const checkDemo = async () => {
    try {
      const userToken = userTokenFunction()
      const { data } = await axios.get('/api/user', userToken)
      setDemoAccount(data.isDemo)
    } catch (error) {
      console.log(error)
      setError(error.response.data.message)
    }
  }
  checkDemo()

  return (
    <Navbar expand='md' className='navbarcontainer'>
      <Navbar.Brand className='brand' to={teacherCheck() ? ('/teacher') : (authenticatedUser() ? ('/days') : ('/'))} as={Link}><FontAwesomeIcon icon={icon({ name: 'house-user' })} /></Navbar.Brand>
      <Navbar.Toggle className='narrow-menu' />
      <Navbar.Collapse className='justify-content-end narrow-style'>
        <Nav>
          {teacherCheck() ? (
            <>
              <Link to='/teacher' className={location.pathname === '/teacher' ? 'active' : ''}>Student Overview</Link>
              {demoAccount ? <span className='nav-link register-demo' onClick={handleRegister}>Register</span> : <span className='nav-link' onClick={handleLogOut}>Log Out</span>}
            </>
          ) : (
            authenticatedUser() ? (
              <>
                <Link to='/days' className={location.pathname === '/days' ? 'active' : ''}>Course Overview</Link>
                <Link to='/profile' className={location.pathname === '/profile' ? 'active' : ''}>My Dashboard</Link>
                {demoAccount ? <span className='nav-link register-demo' onClick={handleRegister}>Register</span> : <span className='nav-link' onClick={handleLogOut}>Log Out</span>}
              </>
            ) : (
              <>
                <Link to='/' className={location.pathname === '/' ? 'active' : ''}>Home</Link>
                <Link to='/register' className={location.pathname === '/register' ? 'active' : ''}>Register</Link>
                <Link to='/login' className={location.pathname === '/login' ? 'active' : ''}>Log In</Link>
              </>
            )
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}

export default PageNavBar