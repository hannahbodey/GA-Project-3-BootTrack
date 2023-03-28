import { Link } from 'react-router-dom'

const PageNotFound = () => {
  return (
    <main className='main-container'>
      <h3>Oops! This page no longer exists. Click the link to go back to home:</h3>
      <Link to='/'>Home</Link>
    </main>
    
  )
}

export default PageNotFound