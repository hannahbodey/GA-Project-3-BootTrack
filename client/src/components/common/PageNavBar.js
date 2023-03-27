import { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'

import { authenticatedUser, removeToken } from '../../helpers/auth'

import Navbar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'

const PageNavBar = () => {
  //*Location Variables
  const navigate = useNavigate()
  const location = useLocation()

  const handleLogOut = () => {
    removeToken()
    navigate('/login')
  }

  return (
    <Navbar expand='md'>
      <Container id='navbarcontainer'>
        <Navbar.Brand className='brand' to='/' as={Link}>🖲️</Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className='justify-content-end'>
          <Nav>
            <Link to='/' className={location.pathname === '/' ? 'active' : ''}>Home</Link>
            <Link to='/days' className={location.pathname === '/days' ? 'active' : ''}>All Days</Link>
            {/* <Link to='/days/:dayId'>Single Day</Link> */}
            {authenticatedUser() ?
              <span className='nav-link' onClick={handleLogOut}>Log Out</span>
              :
              <>
                <Link to='/register' className={location.pathname === '/register' ? 'active' : ''}>Register</Link>
                <Link to='/login' className={location.pathname === '/login' ? 'active' : ''}>Login</Link>
              </>
            }
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default PageNavBar