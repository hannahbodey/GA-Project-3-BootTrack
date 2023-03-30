import { useLocation, useNavigate } from 'react-router-dom'

const BackButton = () => {
  const location = useLocation()
  const navigate = useNavigate()

  const handleClick = () => {
    if (location.pathname === '/report/:week'){
      navigate('/profile')
    } else {
      navigate('/days')
    }

  }

  return (
    <button className={(location.pathname === '/profile' || location.pathname === '/teacher' || location.pathname === '/report/:week') ? 'back-button back-button-profile' : 'back-button'} onClick={handleClick}>⬅Back</button>
  )
}

export default BackButton