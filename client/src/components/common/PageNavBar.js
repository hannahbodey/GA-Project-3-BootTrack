import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const PageNavBar = () => {
  return (
    <section className='container' id='navbarcontainer'>
      <nav>
        <Link to='/'>Home</Link>
        <Link to='/days'>All Days</Link>
        <Link to='/days/:dayId'>Single Day</Link>
        <Link to='/register'>Register</Link>
        <Link to='/login'>Login</Link>
      </nav>
    </section>
  )
}

export default PageNavBar