import { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'

import { authenticatedUser, removeToken } from '../../helpers/auth'

const PageNavBar = () => {
  //*Location Variables
  const navigate = useNavigate()
  const location = useLocation()

  const handleLogOut = () => {
    removeToken()
    navigate('/login')
  }

  return (
    <section className='container' id='navbarcontainer'>
      <nav>
        <Link to='/' className={location.pathname === '/' ? 'active' : ''}>Home</Link>
        <Link to='/days' className={location.pathname === '/days' ? 'active' : ''}>All Days</Link>
        <Link to='/days/:dayId'>Single Day</Link>
        { !authenticatedUser() ? 
          <span className='nav-link' onClick={handleLogOut}>Log Out</span>
          :
          <>
            <Link to='/register' className={location.pathname === '/register' ? 'active' : ''}>Register</Link>
            <Link to='/login' className={location.pathname === '/login' ? 'active' : ''}>Login</Link>
          </>
        }
      </nav>
    </section>
  )
}

export default PageNavBar