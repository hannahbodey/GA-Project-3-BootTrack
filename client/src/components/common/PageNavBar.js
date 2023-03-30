import { Link, useLocation, useNavigate } from 'react-router-dom'

import { authenticatedUser, removeToken, teacherCheck } from '../../helpers/auth'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { icon } from '@fortawesome/fontawesome-svg-core/import.macro'

import Navbar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'

const PageNavBar = () => {
  const navigate = useNavigate()
  const location = useLocation()

  const handleLogOut = () => {
    removeToken()
    navigate('/login')
  }

  return (
    <Navbar expand='md' className='navbarcontainer'>
      <Navbar.Brand className='brand' to={teacherCheck() ? ('/teacher') : (authenticatedUser() ? ('/days') : ('/'))} as={Link}><FontAwesomeIcon icon={icon({ name: 'house-user' })} /></Navbar.Brand>
      <Navbar.Toggle className='narrow-menu' />
      <Navbar.Collapse className='justify-content-end narrow-style'>
        <Nav>
          {/* <Link to='/days/:dayId'>Single Day</Link> */}
          {teacherCheck() ? (
            <>
              <Link to='/teacher' className={location.pathname === '/teacher' ? 'active' : ''}>Student Overview</Link>
              <span className='nav-link' onClick={handleLogOut}>Log Out</span>
            </>
          ) : (
            authenticatedUser() ? (
              <>
                <Link to='/days' className={location.pathname === '/days' ? 'active' : ''}>Course Overview</Link>
                <Link to='/profile' className={location.pathname === '/profile' ? 'active' : ''}>My Dashboard</Link>
                <span className='nav-link' onClick={handleLogOut}>Log Out</span>
              </>
            ) : (
              <>
                <Link to='/' className={location.pathname === '/' ? 'active' : ''}>Home</Link>
                <Link to='/register' className={location.pathname === '/register' ? 'active' : ''}>Register</Link>
                <Link to='/login' className={location.pathname === '/login' ? 'active' : ''}>Login</Link>
              </>
            )
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}

export default PageNavBar