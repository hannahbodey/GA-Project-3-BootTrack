import { useLocation, useNavigate } from 'react-router-dom'

const BackButton = () => {
  const location = useLocation()
  const navigate = useNavigate()

  const handleClick = () => {
    navigate('/days')
  }

  return (
    <button className={location.pathname === '/profile' ? 'back-button back-button-profile' : 'back-button'} onClick={handleClick}>⬅️ Back</button>
  )
}

export default BackButton